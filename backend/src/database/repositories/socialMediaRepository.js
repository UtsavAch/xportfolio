// database/repositories/socialMediaRepository.js
import db from "../db/db.js";
import { SocialMedia } from "../models/models.js";

class SocialMediaRepository {
  // Get all social media links
  async getAll() {
    const result = await db.query(
      "SELECT id, icon, url, created_at FROM xportfolio.social_media ORDER BY id"
    );
    return result.rows.map(
      (row) => new SocialMedia(row.id, row.icon, row.url, row.created_at)
    );
  }

  // Get a social media link by ID
  async getById(id) {
    const result = await db.query(
      "SELECT id, icon, url, created_at FROM xportfolio.social_media WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new SocialMedia(row.id, row.icon, row.url, row.created_at);
  }

  // Create a new social media link
  async create(socialMedia) {
    const result = await db.query(
      `INSERT INTO xportfolio.social_media (icon, url)
       VALUES ($1, $2)
       RETURNING id, icon, url, created_at`,
      [socialMedia.icon, socialMedia.url]
    );
    const row = result.rows[0];
    return new SocialMedia(row.id, row.icon, row.url, row.created_at);
  }

  // Update an existing social media link
  async update(id, updates) {
    const result = await db.query(
      `UPDATE xportfolio.social_media
       SET icon = $1, url = $2
       WHERE id = $3
       RETURNING id, icon, url, created_at`,
      [updates.icon, updates.url, id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new SocialMedia(row.id, row.icon, row.url, row.created_at);
  }

  // Delete a social media link
  async delete(id) {
    const result = await db.query(
      "DELETE FROM xportfolio.social_media WHERE id = $1 RETURNING id, icon, url, created_at",
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new SocialMedia(row.id, row.icon, row.url, row.created_at);
  }
}

export default new SocialMediaRepository();
