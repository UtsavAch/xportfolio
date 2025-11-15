// db/repository/skillRepository.js
import db from "../db/db.js";
import { Skill } from "../models/models.js";

class SkillRepository {
  /** 
    Get all skills
  */
  async getAll() {
    const result = await db.query(
      `SELECT id, type, name, created_at
       FROM xportfolio.skills
       ORDER BY created_at DESC`
    );
    return result.rows.map(
      (row) => new Skill(row.id, row.type, row.name, row.created_at)
    );
  }

  /** 
   Get skill by ID
  */
  async getById(id) {
    const result = await db.query(
      `SELECT id, type, name, created_at
       FROM xportfolio.skills
       WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Skill(row.id, row.type, row.name, row.created_at);
  }

  /**
   Create a new skill
  */
  async create(skill) {
    const result = await db.query(
      `INSERT INTO xportfolio.skills (type, name)
       VALUES ($1, $2)
       RETURNING id, type, name, created_at`,
      [skill.type, skill.name]
    );
    const row = result.rows[0];
    return new Skill(row.id, row.type, row.name, row.created_at);
  }

  /** 
   Update an existing skill
  */
  async update(id, updates) {
    const result = await db.query(
      `UPDATE xportfolio.skills
       SET type = $1, name = $2
       WHERE id = $3
       RETURNING id, type, name, created_at`,
      [updates.type, updates.name, id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Skill(row.id, row.type, row.name, row.created_at);
  }

  /** 
   Delete a skill
  */
  async delete(id) {
    const result = await db.query(
      `DELETE FROM xportfolio.skills
       WHERE id = $1
       RETURNING id, type, name, created_at`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Skill(row.id, row.type, row.name, row.created_at);
  }
}

export default new SkillRepository();
