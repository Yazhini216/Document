import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const ViewFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDownload = async (filePath, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/${filePath}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed!", error);
      alert("Failed to download the file.");
    }
  };

  return (
    <div className="file-manager-container">
      <header className="file-manager-header">
        <h2>Document Library</h2>
        <span className="file-count">{files.length} Files</span>
      </header>

      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading files...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <i className="error-icon">!</i>
          <p>{error}</p>
        </div>
      ) : files.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <p>No files uploaded yet.</p>
          <p className="empty-subtitle">Upload files to see them listed here.</p>
        </div>
      ) : (
        <ul className="file-grid">
          {files.map((file) => (
            <li key={file._id} className="file-card">
              <div className="file-icon">{getFileIcon(file.name)}</div>
              <div className="file-details">
                <h4 className="file-name" title={file.name}>
                  {file.name}
                </h4>
                {file.uploadDate && (
                  <span className="file-date">
                    {new Date(file.uploadDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="file-actions">
                <a
                  href={`http://localhost:5000/${file.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-button"
                >
                  View
                </a>
                <button
                  className="download-button"
                  onClick={() => handleDownload(file.filePath, file.name)}
                >
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Helper function to display different icons based on file type
const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();

  switch (extension) {
    case "pdf":
      return "📄";
    case "doc":
    case "docx":
      return "📝";
    case "xls":
    case "xlsx":
      return "📊";
    case "jpg":
    case "png":
    case "gif":
      return "🖼";
    default:
      return "📁";
  }
};

export default ViewFiles;
