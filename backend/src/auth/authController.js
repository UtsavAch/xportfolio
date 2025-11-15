import AuthService from "./authService.js";

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;
    const token = AuthService.login(username, password);

    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Send token in response
    res.json({ token });
  }

  async logout(req, res) {
    // Since JWT is stateless, logout can be handled on the client
    res.json({ message: "Logged out successfully" });
  }
}

export default new AuthController();
