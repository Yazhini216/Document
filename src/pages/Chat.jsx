import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState({
    sending: false,
    sent: false,
    error: null
  });
  
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onlineFriends, setOnlineFriends] = useState([
    { id: 1, name: "Alex", status: "online" },
    { id: 2, name: "Jamie", status: "online" },
    { id: 3, name: "Taylor", status: "away" }
  ]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  
  const messageEndRef = useRef(null);
  const socketRef = useRef(null);
  
  // API base URL - adjust based on your environment
  const API_BASE_URL = 'http://localhost:5000';
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        text: "Welcome to our chat platform! Choose a friend to start chatting.",
        sender: 'system',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(initialMessages);
  }, []);

  // WebSocket connection simulation (unchanged)
  useEffect(() => {
    const simulateIncomingMessage = () => {
      if (selectedFriend && Math.random() > 0.7) {
        const randomResponses = [
          "Hey, how's it going?",
          "Did you see that new movie?",
          "I was just thinking about our project.",
          "Can we meet up later?",
          "Check out this cool website I found!"
        ];
        
        setTimeout(() => {
          const newMessage = {
            id: Date.now(),
            text: randomResponses[Math.floor(Math.random() * randomResponses.length)],
            sender: 'friend',
            friendId: selectedFriend.id,
            friendName: selectedFriend.name,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          
          setMessages(prev => [...prev, newMessage]);
        }, Math.random() * 10000 + 5000);
      }
    };
    
    const intervalId = setInterval(simulateIncomingMessage, 15000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedFriend]);

  // Login handler (unchanged)
  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
      
      const loginMessage = {
        id: Date.now(),
        text: `Welcome, ${username}! You are now connected. Select a friend to start chatting.`,
        sender: 'system',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([loginMessage]);
      
      if (onlineFriends.length > 0) {
        handleFriendSelect(onlineFriends[0]);
      }
    }
  };

  // Friend selection handler (unchanged)
  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    
    const newChatMessage = {
      id: Date.now(),
      text: `You are now chatting with ${friend.name}.`,
      sender: 'system',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([newChatMessage]);
  };

  // Message sending handler (unchanged)
  const handleSendMessage = () => {
    if (inputMessage.trim() !== "" && isLoggedIn) {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        username: username,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  // ✅ Updated form submission handler to actually send email
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailStatus({
        sending: false,
        sent: false,
        error: 'Please enter a valid email address'
      });
      setTimeout(() => setEmailStatus({ sending: false, sent: false, error: null }), 3000);
      return;
    }
    
    // Set sending state
    setEmailStatus({
      sending: true,
      sent: false,
      error: null
    });
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: email,
          messageText: "You're invited to join our Connect & Collaborate platform! Click here to join the conversation."
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success
        setEmailStatus({
          sending: false,
          sent: true,
          error: null
        });
        
        // Show success message temporarily
        setTimeout(() => {
          setEmailStatus({
            sending: false,
            sent: false,
            error: null
          });
        }, 3000);
        
        // Clear email input
        setEmail('');
      } else {
        // API returned an error
        setEmailStatus({
          sending: false,
          sent: false,
          error: data.message || 'Failed to send email'
        });
        
        setTimeout(() => {
          setEmailStatus({
            sending: false,
            sent: false,
            error: null
          });
        }, 5000);
      }
    } catch (error) {
      // Network or other error
      console.error('Error sending email:', error);
      setEmailStatus({
        sending: false,
        sent: false,
        error: 'Network error: Could not connect to server'
      });
      
      setTimeout(() => {
        setEmailStatus({
          sending: false,
          sent: false,
          error: null
        });
      }, 5000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <header className="main-header">
        <div className="header-content">
          <h1>Connect & Collaborate</h1>
          <nav className="main-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">Features</a></li>
              <li><a href="/price">Pricing</a></li>
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
            <p>
              Start a conversation using our real-time chat or share this platform
              with others via email.
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
        
        {/* ✅ Updated Email Section with better feedback */}
        <section className="email-section">
          <div className="email-form-container">
            <h3>Share via Email</h3>
            <p>Send an invitation link to your friends</p>
            
            <form className="email-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@company.com" 
                    required 
                    disabled={emailStatus.sending}
                  />
                  <button 
                    type="submit" 
                    className={`send-button ${emailStatus.sending ? 'sending' : ''}`}
                    disabled={emailStatus.sending}
                  >
                    {emailStatus.sending ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
              {emailStatus.sent && <div className="success-message">Email sent successfully!</div>}
              {emailStatus.error && <div className="error-message">{emailStatus.error}</div>}
            </form>
          </div>
        </section>
        
        {/* Chat Section (unchanged) */}
        <section className="fixed-chat-section">
          <div className="fixed-chat-container">
            {!isLoggedIn ? (
              <div className="login-panel">
                <div className="login-header">
                  <h3>Join the Chat</h3>
                </div>
                <div className="login-body">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="username-input"
                  />
                  <button 
                    className="login-btn"
                    onClick={handleLogin}
                    disabled={!username.trim()}
                  >
                    Start Chatting
                  </button>
                </div>
              </div>
            ) : (
              <div className="chat-panel">
                <div className="chat-panel-header">
                  <h3>
                    {selectedFriend 
                      ? `Chatting with ${selectedFriend.name}` 
                      : "Live Chat"}
                  </h3>
                  <div className="chat-controls">
                    <span className="agent-status online">
                      <span className="status-dot"></span>
                      {username} Online
                    </span>
                    <button 
                      className="toggle-chat-btn"
                      onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                      {isChatOpen ? 'Minimize' : 'Expand'}
                    </button>
                  </div>
                </div>
                
                {isChatOpen && (
                  <>
                    <div className="chat-sidebar">
                      <div className="friends-list">
                        <h4>Friends</h4>
                        <ul>
                          {onlineFriends.map(friend => (
                            <li 
                              key={friend.id} 
                              className={`friend-item ${selectedFriend?.id === friend.id ? 'active' : ''}`}
                              onClick={() => handleFriendSelect(friend)}
                            >
                              <span className={`friend-status ${friend.status}`}></span>
                              {friend.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="chat-panel-body">
                      <div className="messages-container">
                        {messages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`message ${
                              msg.sender === 'user' 
                                ? 'user-message' 
                                : msg.sender === 'friend' 
                                ? 'friend-message' 
                                : 'system-message'
                            }`}
                          >
                            <div className="message-content">
                              {msg.sender === 'friend' && (
                                <div className="message-sender">{msg.friendName}</div>
                              )}
                              <p>{msg.text}</p>
                              <span className="timestamp">{msg.timestamp}</span>
                            </div>
                          </div>
                        ))}
                        <div ref={messageEndRef} />
                      </div>
                    </div>
                    
                    <div className="chat-panel-footer">
                      <input
                        type="text"
                        placeholder={selectedFriend 
                          ? `Message ${selectedFriend.name}...` 
                          : "Type your message..."}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!isLoggedIn}
                      />
                      <button 
                        className="send-btn" 
                        onClick={handleSendMessage}
                        disabled={inputMessage.trim() === ""}
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
      
      <footer className="main-footer">
        <div className="footer-content">
          <p>&copy; 2025 Communication Platform. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chat;