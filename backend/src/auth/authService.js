// src/auth/authService.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class AuthService {
  login(username, password) {
    const cmsUser = {
      username: process.env.CMS_USERNAME,
      password: process.env.CMS_PASSWORD,
    };

    // Check credentials
    if (username === cmsUser.username && password === cmsUser.password) {
      // Generate JWT token
      const token = jwt.sign(
        { username: cmsUser.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return token;
    } else {
      return null;
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}

export default new AuthService();
