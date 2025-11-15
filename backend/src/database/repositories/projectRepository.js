// database/repositories/projectRepository.js
import db from "../db/db.js";
import { Project } from "../models/models.js";

class ProjectRepository {
  // Get all projects
  async getAll() {
    const result = await db.query(
      `SELECT id, title, link, description, video_url, created_at, updated_at
       FROM xportfolio.projects
       ORDER BY created_at DESC`
    );
    return result.rows.map(
      (row) =>
        new Project(
          row.id,
          row.title,
          row.link,
          row.description,
          row.video_url,
          row.created_at,
          row.updated_at
        )
    );
  }

  // Get project by ID
  async getById(id) {
    const result = await db.query(
      `SELECT id, title, link, description, video_url, created_at, updated_at
       FROM xportfolio.projects
       WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Project(
      row.id,
      row.title,
      row.link,
      row.description,
      row.video_url,
      row.created_at,
      row.updated_at
    );
  }

  // Create a new project
  async create(project) {
    const result = await db.query(
      `INSERT INTO xportfolio.projects (title, link, description, video_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, link, description, video_url, created_at, updated_at`,
      [project.title, project.link, project.description, project.video_url]
    );
    const row = result.rows[0];
    return new Project(
      row.id,
      row.title,
      row.link,
      row.description,
      row.video_url,
      row.created_at,
      row.updated_at
    );
  }

  // Update an existing project
  async update(id, updates) {
    const result = await db.query(
      `UPDATE xportfolio.projects
       SET title = $1, link = $2, description = $3, video_url = $4
       WHERE id = $5
       RETURNING id, title, link, description, video_url, created_at, updated_at`,
      [updates.title, updates.link, updates.description, updates.video_url, id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Project(
      row.id,
      row.title,
      row.link,
      row.description,
      row.video_url,
      row.created_at,
      row.updated_at
    );
  }

  // Delete a project
  async delete(id) {
    const result = await db.query(
      `DELETE FROM xportfolio.projects
       WHERE id = $1
       RETURNING id, title, link, description, video_url, created_at, updated_at`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Project(
      row.id,
      row.title,
      row.link,
      row.description,
      row.video_url,
      row.created_at,
      row.updated_at
    );
  }
}

export default new ProjectRepository();
