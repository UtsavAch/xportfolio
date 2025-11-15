// database/repositories/courseRepository.js
import db from "../db/db.js";
import { Course } from "../models/models.js";

class CourseRepository {
  /**
  Get all courses
   */
  async getAll() {
    const result = await db.query(
      `SELECT id, title, start_date, end_date, link, description, created_at, updated_at
       FROM xportfolio.courses
       ORDER BY start_date DESC`
    );
    return result.rows.map(
      (row) =>
        new Course(
          row.id,
          row.title,
          row.start_date,
          row.end_date,
          row.link,
          row.description,
          row.created_at,
          row.updated_at
        )
    );
  }

  /** 
    Get course by ID
  */
  async getById(id) {
    const result = await db.query(
      `SELECT id, title, start_date, end_date, link, description, created_at, updated_at
       FROM xportfolio.courses
       WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Course(
      row.id,
      row.title,
      row.start_date,
      row.end_date,
      row.link,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  /** 
    Create a new course
  */
  async create(course) {
    const result = await db.query(
      `INSERT INTO xportfolio.courses (title, start_date, end_date, link, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, start_date, end_date, link, description, created_at, updated_at`,
      [
        course.title,
        course.start_date,
        course.end_date,
        course.link,
        course.description,
      ]
    );
    const row = result.rows[0];
    return new Course(
      row.id,
      row.title,
      row.start_date,
      row.end_date,
      row.link,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  /** 
    Update an existing course
  */
  async update(id, updates) {
    const result = await db.query(
      `UPDATE xportfolio.courses
       SET title = $1, start_date = $2, end_date = $3, link = $4, description = $5
       WHERE id = $6
       RETURNING id, title, start_date, end_date, link, description, created_at, updated_at`,
      [
        updates.title,
        updates.start_date,
        updates.end_date,
        updates.link,
        updates.description,
        id,
      ]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Course(
      row.id,
      row.title,
      row.start_date,
      row.end_date,
      row.link,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  /** 
   Delete a course
  */
  async delete(id) {
    const result = await db.query(
      `DELETE FROM xportfolio.courses
       WHERE id = $1
       RETURNING id, title, start_date, end_date, link, description, created_at, updated_at`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Course(
      row.id,
      row.title,
      row.start_date,
      row.end_date,
      row.link,
      row.description,
      row.created_at,
      row.updated_at
    );
  }
}

export default new CourseRepository();
