// database/repositories/workExperienceRepository.js
import db from "../db/db.js";
import { WorkExperience } from "../models/models.js";

class WorkExperienceRepository {
  /**
   Get all work experiences
  */
  async getAll() {
    const result = await db.query(
      `SELECT id, position, company, location, start_date, end_date, description, created_at, updated_at
       FROM xportfolio.work_experience
       ORDER BY start_date DESC`
    );
    return result.rows.map(
      (row) =>
        new WorkExperience(
          row.id,
          row.position,
          row.company,
          row.location,
          row.start_date,
          row.end_date,
          row.description,
          row.created_at,
          row.updated_at
        )
    );
  }

  /** 
   Get a single work experience by ID
  */
  async getById(id) {
    const result = await db.query(
      `SELECT id, position, company, location, start_date, end_date, description, created_at, updated_at
       FROM xportfolio.work_experience
       WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new WorkExperience(
      row.id,
      row.position,
      row.company,
      row.location,
      row.start_date,
      row.end_date,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  /** 
   Create a new work experience
  */
  async create(workExp) {
    const result = await db.query(
      `INSERT INTO xportfolio.work_experience (position, company, location, start_date, end_date, description)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, position, company, location, start_date, end_date, description, created_at, updated_at`,
      [
        workExp.position,
        workExp.company,
        workExp.location,
        workExp.start_date,
        workExp.end_date,
        workExp.description,
      ]
    );
    const row = result.rows[0];
    return new WorkExperience(
      row.id,
      row.position,
      row.company,
      row.location,
      row.start_date,
      row.end_date,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  /** 
   Update an existing work experience
  */
  async update(id, updates) {
    const result = await db.query(
      `UPDATE xportfolio.work_experience
       SET position = $1, company = $2, location = $3, start_date = $4, end_date = $5, description = $6
       WHERE id = $7
       RETURNING id, position, company, location, start_date, end_date, description, created_at, updated_at`,
      [
        updates.position,
        updates.company,
        updates.location,
        updates.start_date,
        updates.end_date,
        updates.description,
        id,
      ]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new WorkExperience(
      row.id,
      row.position,
      row.company,
      row.location,
      row.start_date,
      row.end_date,
      row.description,
      row.created_at,
      row.updated_at
    );
  }

  /**
   Delete a work experience
  */
  async delete(id) {
    const result = await db.query(
      `DELETE FROM xportfolio.work_experience
       WHERE id = $1
       RETURNING id, position, company, location, start_date, end_date, description, created_at, updated_at`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new WorkExperience(
      row.id,
      row.position,
      row.company,
      row.location,
      row.start_date,
      row.end_date,
      row.description,
      row.created_at,
      row.updated_at
    );
  }
}

export default new WorkExperienceRepository();
