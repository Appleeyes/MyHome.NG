import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/css/Chat.css";
import ArrowBack from "../components/ArrowBackComponent";
import Footer from "../components/Footer";

const Chat = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatIdFromQuery = queryParams.get("chatId");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(chatIdFromQuery);
  const [product, setProduct] = useState(null);
  const [agent, setAgent] = useState(null);
  const [tenant, setTenant] = useState(null);

  const fetchChatDetails = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        `https://myhome-ng-backend.onrender.com/api/v1/chats/${chatId}`,
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
      setProduct(chatData.product);
      setAgent(chatData.agent);
      setTenant(chatData.tenant);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  }, [chatId]);

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
    if (chatId) {
      fetchChatDetails();
    }
  }, [chatId, fetchChatDetails]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("NGN", "#");
  };

  const getSenderDetails = (senderId) => {
    if (agent && agent.id === senderId) {
      return { name: agent.name, image: agent.image, role: "landlord" };
    }
    if (tenant && tenant.id === senderId) {
      return { name: tenant.name, image: tenant.image, role: "tenant" };
    }
    return { name: "Unknown", image: null, role: "unknown" };
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
        {agent && (
          <div className="chat-message landlord">
            <div className="message-header">
              <img src={agent.image} alt={agent.name} className="user-image" />
              <p className="user-name">{agent.name}</p>
            </div>
            <div className="contact-det">
              <p>
                <span>Email:</span>{" "}
                <a href={`mailto:${agent.email}`}>{agent.email}</a>
              </p>
              <p>
                <span>Phone:</span>{" "}
                <a href={`tel:${agent.phone_number}`}>{agent.phone_number}</a>
              </p>
            </div>

            <div className="message-body">How can I be of help?</div>
          </div>
        )}
        {messages.map((msg, index) => {
          const senderDetails = getSenderDetails(msg.sender_id);
          const isSender = senderDetails.role === "landlord";

          return (
            <div
              key={index}
              className={`chat-message ${isSender ? "landlord" : "tenant"}`}
            >
              <div className="message-header">
                {senderDetails.image && (
                  <img
                    src={senderDetails.image}
                    alt={senderDetails.name}
                    className="user-image"
                  />
                )}
                <span className="user-name">{senderDetails.name}</span>
              </div>
              <div className="message-body">{msg.message}</div>
              <div className="message-time">{formatTime(msg.created_at)}</div>
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
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
};

export default Chat;
