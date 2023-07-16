import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveMessages, sendMessage } from "../../Redux/Actions/ChatActions";
import { formatTime } from "../../utils/formatTime";

const ChatApp = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      dispatch(sendMessage(inputValue));
      setInputValue("");
    }
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    dispatch(retrieveMessages());
  }, [dispatch]);

  const allChats = useSelector((state) => state.chats);

  return (
    <div className={`chat-app ${isChatOpen ? "open" : ""}`}>
      <div className="chat-toggle" onClick={handleChatToggle}>
        {isChatOpen ? "Chat with Diva" : <i className="fa fa-comment"></i>}
      </div>
      <div className="chat-window">
        <div className="messages">
          {/* <div className={`message admin`}>
            <span className="content">
              Hey, I am Diva, how can I help you..
            </span>
            <span className="timestamp">{formatTime(new Date())}</span>
          </div> */}
          {allChats.chatInfo?.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user" : "admin"
              }`}
            >
              <span className="content">{message.message}</span>
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
