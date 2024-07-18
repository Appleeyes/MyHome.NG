import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/css/ChatComponent.css";
import ArrowBack from "../components/ArrowBackComponent";

const ChatComponent = () => {
  const { productId, agentId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatIdFromQuery = queryParams.get("chatId");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(chatIdFromQuery);
  const [product, setProduct] = useState(null);
  const userRole = localStorage.getItem("userRole");

  const fetchProductDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        `https://myhome-ng-backend.onrender.com/api/v1/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(response.data.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  const fetchChats = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        `https://myhome-ng-backend.onrender.com/api/v1/chats/product/${productId}/agent/${agentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const chatData = response.data.data;
      if (chatData && chatData.messages) {
        setMessages(chatData.messages);
      } else {
        console.error("No messages found in chat data");
      }
      setChatId(chatData.id);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  const sendMessage = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    if (!chatId) {
      console.error("Chat ID not found");
      return;
    }

    try {
      const response = await axios.post(
        `https://myhome-ng-backend.onrender.com/api/v1/chats/${chatId}/messages`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, response.data.data]);
      setNewMessage("");
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (productId && agentId && chatId) {
      fetchChats();
      fetchProductDetails();
    }
  }, [productId, agentId, chatId]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <ArrowBack />
        {product && (
          <div className="product-det">
            <img
              src={product.image_path}
              alt={product.property_type}
              className="product-image"
            />
            <div className="product-info">
              <p>{product.property_type}</p>
              <p className="product-price">{formatPrice(product.price)}</p>
            </div>
          </div>
        )}
      </div>
      <div className="chat-messages">
        <div className="chat-message landlord">How can I be of help?</div>
        {messages.map((msg, index) => {
          const isTenant = userRole === "tenant";
          return (
            <div
              key={index}
              className={`chat-message ${isTenant ? "tenant" : "landlord"}`}
            >
              {msg.message}
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("NGN", "#");
};

export default ChatComponent;
