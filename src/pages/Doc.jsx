import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const Doc = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recentFiles, setRecentFiles] = useState([
    { id: 1, name: 'Annual Report 2024.pdf', date: '2024-02-20' },
    { id: 2, name: 'Project Proposal.pdf', date: '2024-02-15' },
    { id: 3, name: 'Financial Statement.pdf', date: '2024-02-10' }
  ]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  // Handle file selection from dropdown
  const handleFileSelect = (fileName) => {
    setSearchQuery(fileName);
    setSelectedFile(fileName);
    setShowDropdown(false);
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    // Voice recognition implementation would go here
    alert('Voice search activated');
  };

  // Handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploading: ${selectedFile}`);
      // Upload logic would go here
    } else {
      alert('Please select a file first');
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-sidebar">
        <div className="app-logo">
          <h2>PDF Manager</h2>
        </div>
        <div className="app-nav">
          <ul>
            <li>
              <Link to="/" className="app-nav-item">
                <span className="app-nav-symbol">🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/search" className="app-nav-item app-nav-active">
                <span className="app-nav-symbol">🔍</span>
                <span>Search & Upload</span>
              </Link>
            </li>
            <li>
              <Link to="/recent" className="app-nav-item">
                <span className="app-nav-symbol">🕒</span>
                <span>Recent Files</span>
              </Link>
            </li>
            <li>
              <Link to="/share" className="app-nav-item">
                <span className="app-nav-symbol">📤</span>
                <span>Share</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="app-content">
        <div className="app-header">
          <h1>Search & Upload PDF Documents</h1>
          <p>Find and manage your PDF files efficiently</p>
        </div>

        <div className="app-search-block">
          <div className="app-search-wrap">
            <input
              type="text"
              className="app-search-field"
              placeholder="Search PDF documents..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="app-voice-btn" onClick={handleVoiceSearch}>
              🎤
            </button>
          </div>

          {showDropdown && (
            <div className="app-dropdown">
              <div className="app-dropdown-item" onClick={() => handleFileSelect('Business Report 2024.pdf')}>
                Business Report 2024.pdf
              </div>
              <div className="app-dropdown-item" onClick={() => handleFileSelect('Marketing Strategy.pdf')}>
                Marketing Strategy.pdf
              </div>
              <div className="app-dropdown-item" onClick={() => handleFileSelect('Technical Documentation.pdf')}>
                Technical Documentation.pdf
              </div>
            </div>
          )}

          <button 
            className={`app-upload-btn ${selectedFile ? 'app-btn-active' : ''}`}
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            <span className="app-upload-symbol">📤</span>
            <span>{selectedFile ? `Upload ${selectedFile}` : 'Select a file to upload'}</span>
          </button>
        </div>

        <div className="app-recent-block">
          <h2>Recent Files</h2>
          <div className="app-files-grid">
            {recentFiles.map(file => (
              <div className="app-file-item" key={file.id}>
                <div className="app-file-symbol">PDF</div>
                <div className="app-file-info">
                  <h3>{file.name}</h3>
                  <p>Last opened: {file.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doc;
