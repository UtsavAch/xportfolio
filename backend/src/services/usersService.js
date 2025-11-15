// src/services/usersService.js
import usersRepository from "../database/repositories/usersRepository.js";

class UsersService {
  async getAllUsers() {
    try {
      const users = await usersRepository.getAllUsers();
      return { success: true, data: users };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { success: false, error: "Failed to fetch users" };
    }
  }

  async getUserById(id) {
    try {
      const user = await usersRepository.getUserById(id);
      if (!user) return { success: false, error: "User not found" };
      return { success: true, data: user };
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      return { success: false, error: "Failed to fetch user" };
    }
  }

  async createUser(userData) {
    try {
      const createdUser = await usersRepository.createUser(userData);
      return { success: true, data: createdUser };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, error: "Failed to create user" };
    }
  }

  async updateUser(id, updates) {
    try {
      const updatedUser = await usersRepository.updateUser(id, updates);
      if (!updatedUser) return { success: false, error: "User not found" };
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      return { success: false, error: "Failed to update user" };
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser = await usersRepository.deleteUser(id);
      if (!deletedUser) return { success: false, error: "User not found" };
      return { success: true, data: deletedUser };
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      return { success: false, error: "Failed to delete user" };
    }
  }
}

export default new UsersService();
