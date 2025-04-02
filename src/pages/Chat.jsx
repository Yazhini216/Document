import React from 'react';
import './Chat.css';

const Chat = () => {
  return (
    <div className="chat-container">
      <header className="main-header">
        <div className="header-content">
          <h1>Connect & Collaborate</h1>
          <nav className="main-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/price">Pricing</a></li>
              <li><a href="/about">Features</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="content-wrapper">
        <section className="welcome-section">
          <div className="welcome-content">
            <h2>Welcome to our Communication Platform</h2>
            <p>
              Experience enhanced communication tools designed to help you connect,
              collaborate, and engage more effectively with your team and friends.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>Real-time Chat</h3>
                <p>Connect instantly with friends</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Mobile Friendly</h3>
                <p>Chat on any device, anywhere</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure</h3>
                <p>End-to-end encrypted messages</p>
              </div>
            </div>
          </div>
          <div className="illustration">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/chatting-illustration-download-in-svg-png-gif-file-formats--messenger-logo-like-online-communication-meetup-pack-people-illustrations-4912113.png?f=webp"
              alt="Chat Illustration"
            />
          </div>
        </section>
      </div>
      
      <footer className="main-footer">
        <div className="footer-content">
          <p>&copy; 2025 Communication Platform. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chat;