import { api } from "./api";

class UsersService {
  // Get all users
  async getAllUsers() {
    const response = await api.get("/users");
    return response.data;
  }

  // Get a specific user by ID
  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  // Update an existing user
  async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  }
}

const usersService = new UsersService();
export default usersService;
