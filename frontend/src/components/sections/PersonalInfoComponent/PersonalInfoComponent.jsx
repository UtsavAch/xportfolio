// src/pages/PersonalArea/PersonalArea.jsx
import { useEffect, useState } from "react";
import usersService from "../../../services/usersService";
import { uploadProfilePicture } from "../../../services/storageProvider";
import InputComponent from "../../ui/InputComponent/InputComponent";
import ButtonComponent from "../../ui/ButtonComponent/ButtonComponent";

const PersonalInfoComponent = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profile_url: "",
  });

  // Fetch the first (and only) user
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await usersService.getAllUsers();
      if (res.length > 0) {
        const firstUser = res[0];
        setUser(firstUser);
        setFormData({
          username: firstUser.username || "",
          email: firstUser.email || "",
          password: firstUser.password || "",
          profile_url: firstUser.profile_url || "",
        });
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection and upload immediately
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadProfilePicture(file);
      setFormData({ ...formData, profile_url: url });
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };

  // Update user info (including profile picture URL)
  const handleSubmit = async () => {
    try {
      if (user) {
        await usersService.updateUser(user.id, formData);
        fetchUser();
        alert("Profile updated!");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      <h2>Personal Informations</h2>

      <div>
        <InputComponent
          type="text"
          name="username"
          placeholder="Name"
          value={formData.username}
          onChange={handleChange}
        />
        <InputComponent
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputComponent
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputComponent type="file" onChange={handleFileChange} />
        <ButtonComponent handleSubmit={handleSubmit} />
      </div>

      {user && (
        <div>
          <h3>User Info</h3>
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Password:</strong> {user.password}
          </p>

          {user.profile_url && (
            <div>
              <img
                src={user.profile_url}
                alt="Profile"
                style={{ width: "120px", borderRadius: "50%" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalInfoComponent;
