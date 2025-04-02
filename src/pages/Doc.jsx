import React, { useState, useEffect } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import axios from "axios";
import "./styles.css";

const Doc = () => {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileContent, setFileContent] = useState("");
      const [fileName, setFileName] = useState("");

    // Fetch Files
    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/files");
                setFiles(res.data);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch files!", error);
                setError("Failed to load files. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, []);

    // Generate Word Document
    const generateWordDocument = () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [new TextRun(text || "Hello, this is a Word document!")],
                        }),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "document.docx");
        });
    };

    // Generate PDF Document
    const generatePDFDocument = () => {
        const pdf = new jsPDF();
        pdf.text(text || "Hello, this is a PDF document!", 10, 20);
        pdf.save("document.pdf");
    };

    // Handle File Upload
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadStatus(null);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setUploadStatus(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus({ type: "error", message: "Please select a file first" });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setUploading(true);
        setUploadProgress(0);
        setUploadStatus(null);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });

            setUploadStatus({ type: "success", message: res.data.message || "File uploaded successfully!" });
        } catch (error) {
            console.error("Upload failed!", error);
            setUploadStatus({ type: "error", message: error.response?.data?.error || "Upload failed!" });
        } finally {
            setUploading(false);
        }
    };
// Handle file selection
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Handle saving the edited content
  const handleSave = () => {
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName || "edited_file.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    return (
        <div className="doc-container">
            {/* Document Editor */}
            <div className="document-editor-container">
                <h2 className="editor-title">Create with Brigades</h2>
                <textarea
                    className="document-textarea"
                    rows="5"
                    placeholder="Type something..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="button-container">
                    <button className="download-button" onClick={generateWordDocument}>
                        Download Word
                    </button>
                    <button className="download-button" onClick={generatePDFDocument}>
                        Download PDF
                    </button>
                </div>
            </div>

            {/* File Uploader */}
            <div className="file-uploader-container">
               
                <div className="editor-title">Collaborate & Conquer with Brigades</div>
               

                <div
                    className={`drop-zone ${dragActive ? "active-drag" : ""} ${file ? "has-file" : ""}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input type="file" id="file-input" className="file-input" onChange={handleFileChange} />

                    <label htmlFor="file-input" className="file-label">
                        {!file ? (
                            <>
                                <div className="upload-icon">📤</div>
                                <p className="primary-text">Drag & drop your file here</p>
                                <p className="secondary-text">or click to browse files</p>
                            </>
                        ) : (
                            <div className="file-preview">
                                <p className="file-name">{file.name}</p>
                                <button className="remove-file" onClick={() => setFile(null)}>✕</button>
                            </div>
                        )}
                    </label>
                </div>

                {uploading && (
                    <div className="upload-progress">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <p className="progress-text">{uploadProgress}% Uploaded</p>
                    </div>
                )}

                {uploadStatus && (
                    <div className={`upload-status ${uploadStatus.type}`}>
                        <p>{uploadStatus.message}</p>
                    </div>
                )}

                <button className="upload-button" onClick={handleUpload} disabled={!file || uploading}>
                    {uploading ? "Uploading..." : "Upload File"}
                </button>
            </div>
            <div className="doc-container">
            {/* Document Editor */}
            <div className="document-editor-container">
                <h2 className="editor-title">File Editor</h2>
            <div className="p-4 max-w-2xl mx-auto">
      
      <input type="file" accept=".txt,.md,.json" onChange={handleFileUpload} className="mb-2" />
      {fileContent && (
        <>
          <textarea
            className="w-full h-60 border p-2 rounded-md"
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
            onClick={handleSave}
          >
            Save File
          </button>
        </>
      )}
    </div>
    </div>
    </div>
            {/* File Viewer */}
            <div className="doc-container">
            {/* Document Editor */}
            <div className="document-editor-container">
                <h2 className="editor-title">Upload and View</h2>
                <header className="file-manager-header">
                    <span className="file-count">{files.length} Files</span>
                </header>

                {loading ? (
                    <p>Loading files...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : files.length === 0 ? (
                    <p>No files uploaded yet.</p>
                ) : (
                    <ul className="file-grid">
                        {files.map((file) => (
                            <li key={file._id} className="file-card">
                                <p className="file-name">{file.name}</p>
                                <a
                                    href={`http://localhost:5000/${file.filePath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            </div>
        </div>
    );
};

export default Doc;
