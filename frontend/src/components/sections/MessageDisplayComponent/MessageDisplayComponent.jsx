import { useEffect, useState } from "react";

import messagesService from "../../../services/messagesService";

const MessageDisplayComponent = () => {
  const [messages, setMessages] = useState([]);

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const data = await messagesService.getAllMessages();
      // Sort by created_at (newest first)
      const sorted = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setMessages(sorted);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Delete a message
  const handleDelete = async (id) => {
    try {
      await messagesService.deleteMessage(id);
      // Refresh list
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <div>{msg.created_at}</div>
            <div>{msg.sms_name}</div>
            <div>{msg.sms_email}</div>
            <div>{msg.sms_text}</div>
            <button onClick={() => handleDelete(msg.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageDisplayComponent;
