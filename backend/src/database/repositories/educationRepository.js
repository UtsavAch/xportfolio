// database/repositories/educationRepository.js
import db from "../db/db.js";
import { Education } from "../models/models.js";

class EducationRepository {
  // Get all education entries
  async getAll() {
    const result = await db.query(
      `SELECT id, degree, university, start_date, end_date, description, created_at, updated_at
       FROM xportfolio.education
       ORDER BY start_date DESC`
    );
    return result.rows.map(
      (row) =>
        new Education(
          row.id,
          row.degree,
          row.university,
          row.start_date,
          row.end_date,
          row.description,
          row.created_at,
          row.updated_at
        )
    );
  }

  // Get a single education entry by ID
  async getById(id) {
    const result = await db.query(
      `SELECT id, degree, university, start_date, end_date, description, created_at, updated_at
       FROM xportfolio.education
       WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Education(
      row.id,
      row.degree,
      row.university,
      row.start_date,
      row.end_date,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  // Create a new education entry
  async create(education) {
    const result = await db.query(
      `INSERT INTO xportfolio.education (degree, university, start_date, end_date, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, degree, university, start_date, end_date, description, created_at, updated_at`,
      [
        education.degree,
        education.university,
        education.start_date,
        education.end_date,
        education.description,
      ]
    );
    const row = result.rows[0];
    return new Education(
      row.id,
      row.degree,
      row.university,
      row.start_date,
      row.end_date,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  // Update an existing education entry
  async update(id, updates) {
    const result = await db.query(
      `UPDATE xportfolio.education
       SET degree = $1, university = $2, start_date = $3, end_date = $4, description = $5
       WHERE id = $6
       RETURNING id, degree, university, start_date, end_date, description, created_at, updated_at`,
      [
        updates.degree,
        updates.university,
        updates.start_date,
        updates.end_date,
        updates.description,
        id,
      ]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Education(
      row.id,
      row.degree,
      row.university,
      row.start_date,
      row.end_date,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  // Delete an education entry
  async delete(id) {
    const result = await db.query(
      `DELETE FROM xportfolio.education
       WHERE id = $1
       RETURNING id, degree, university, start_date, end_date, description, created_at, updated_at`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Education(
      row.id,
      row.degree,
      row.university,
      row.start_date,
      row.end_date,
      row.description,
      row.created_at,
      row.updated_at
    );
  }
}

export default new EducationRepository();
