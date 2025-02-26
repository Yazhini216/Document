import React, { useState } from 'react'; // Assuming you have a CSS file for styling
import './Chat.css'
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, inputMessage]);
      setInputMessage(""); // Clear input after sending
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Email sent successfully!");
  };

  return (
    <div>
      <div className='vethi'>
      {/* Top Image and Welcome Message */}
      <div className="vethi1">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/chatting-illustration-download-in-svg-png-gif-file-formats--messenger-logo-like-online-communication-meetup-pack-people-illustrations-4912113.png?f=webp"
          alt="Chat Illustration"
          className="top-right-image"
        />
        <h2 className='po1'>
          <i>
            Welcome to our platform! We invite you to take full advantage of the enhanced chat facilities below,
            designed to help you collaborate, communicate, and engage more effectively with others.
            Feel free to reach out and start a conversation!
          </i>
        </h2>
      </div>

      {/* Email Form */}
      <div className="vethi2">
        <div className="c6">
          <form id="emailForm" onSubmit={handleFormSubmit}>
            <label htmlFor="email">
              <h1 className='po2'>SEND THE LINK VIA EMAIL</h1>
              <h3 className='po3'>ENTER THE MAIL ID</h3>
            </label>
            <input type="email" id="email" name="email" required />
            <button type="submit">DONE</button>
          </form>
        </div>
      </div>

      {/* Chat Box */}
      <div id="v1">
        <div id="v2">
          <div id="v3">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
            ))}
          </div>
          <div className='po4'>
          <input
            type="text"
            id="v4"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button id="v5" onClick={handleSendMessage}>Send</button>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Chat;
