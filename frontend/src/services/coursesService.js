// services/coursesService.js
import { api } from "./api";

class CoursesService {
  // Get all courses (public)
  async getAllCourses() {
    const response = await api.get("/courses");
    return response.data;
  }

  // Get a specific course by ID (public)
  async getCourseById(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  }

  // Create a new course (CMS/admin - protected)
  async createCourse(courseData) {
    const response = await api.post("/courses", courseData);
    return response.data;
  }

  // Update an existing course (CMS/admin - protected)
  async updateCourse(id, courseData) {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  }

  // Delete a course (CMS/admin - protected)
  async deleteCourse(id) {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  }
}

const coursesService = new CoursesService();
export default coursesService;
