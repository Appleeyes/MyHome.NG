import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import axiosRetry from "axios-retry";
import "../assets/css/ChatList.css";
import ArrowBack from "../components/ArrowBackComponent";
import Footer from "../components/Footer";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
});

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchChats = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://myhome-ng-backend.onrender.com/api/v1/chats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChats(response.data.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleChatClick = (chatId, productId, agentId) => {
    history.push(
      `/chat/product/${productId}/agent/${agentId}?chatId=${chatId}`
    );
  };

  return (
    <div className="chat-list-container">
      <div className="head">
        <ArrowBack />
        <h2>Your Chats</h2>
      </div>

      {loading ? (
        <div
          className="spinner-container"
          style={{ width: "20%", marginTop: "50%" }}
        >
          <ClipLoader
            color={"rgb(122, 122, 122)"}
            loading={loading}
            size={50}
          />
        </div>
      ) : chats.length === 0 ? (
        <p>No chats available</p>
      ) : (
        <ul className="chat-list">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() =>
                handleChatClick(chat.id, chat.product_id, chat.agent_id)
              }
            >
              <div className="chat-list-item">
                <img
                  src={chat.tenant ? chat.tenant.image : chat.agent.image}
                  alt="Sender"
                  className="sender-image"
                />
                <div className="chat-details">
                  <h3>{chat.tenant ? chat.tenant.name : chat.agent.name}</h3>
                </div>
                {chat.unread_count > 0 && (
                  <div className="unread">
                    <p>{chat.unread_count}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
};

export default ChatList;
