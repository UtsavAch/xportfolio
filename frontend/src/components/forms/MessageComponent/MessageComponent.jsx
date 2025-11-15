import { useState } from "react";

import InputComponent from "../../ui/InputComponent/InputComponent";
import ButtonComponent from "../../ui/ButtonComponent/ButtonComponent";

import messagesService from "../../../services/messagesService";

const MessageComponent = () => {
  const [formData, setFormData] = useState({
    sms_name: "",
    sms_email: "",
    sms_text: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send the message
  const handleSubmit = async () => {
    try {
      await messagesService.createMessage(formData);
      alert("Message sent!");
    } catch (err) {
      console.error("Error sending the message:", err);
    }
  };

  return (
    <div>
      <InputComponent
        type="text"
        name="sms_name"
        placeholder="Name"
        value={formData.sms_name}
        onChange={handleChange}
      />
      <InputComponent
        type="email"
        name="sms_email"
        placeholder="Email"
        value={formData.sms_email}
        onChange={handleChange}
      />
      <InputComponent
        type="textarea"
        name="sms_text"
        placeholder="Write message"
        value={formData.sms_text}
        onChange={handleChange}
      />
      <ButtonComponent handleSubmit={handleSubmit} />
    </div>
  );
};

export default MessageComponent;
