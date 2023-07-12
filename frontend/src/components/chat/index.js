import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../Redux/Actions/ChatActions";

const ChatApp = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    {
      sender: "admin",
      content: "Hello, how can I assist you?",
      timestamp: new Date(),
    },
    {
      sender: "user",
      content: "I have a question about a product.",
      timestamp: new Date(),
    },
    {
      sender: "admin",
      content: "Sure, go ahead and ask.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        sender: "user",
        content: inputValue,
        timestamp: new Date(),
      };
      dispatch(sendMessage(inputValue));
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);

    if (now.toDateString() === messageTime.toDateString()) {
      // Message sent/received today
      return messageTime.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    } else {
      // Message sent/received on a different day
      return messageTime.toLocaleString();
    }
  };

  const allChats = useSelector((state) => state.chats);
  console.log({ allChats });

  return (
    <div className={`chat-app ${isChatOpen ? "open" : ""}`}>
      <div className="chat-toggle" onClick={handleChatToggle}>
        Chat with Diva
      </div>
      <div className="chat-window">
        <div className="messages">
          <div className={`message admin`}>
            <span className="content">
              Hey, I am Diva, how can I help you..
            </span>
            <span className="timestamp">
              {formatTime(messages[0].timestamp)}
            </span>
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user" : "admin"
              }`}
            >
              <span className="content">{message.content}</span>
              <span className="timestamp">{formatTime(message.timestamp)}</span>
            </div>
          ))}
        </div>
        {isChatOpen && (
          <div className="input-area">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
