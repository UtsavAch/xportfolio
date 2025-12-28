// database/repositories/profileRepository.js
import db from "../db/db.js";
import { Profile } from "../models/models.js";

const PROFILE_ID = "00000000-0000-0000-0000-000000000001"; // single profile ID

class ProfileRepository {
  /**
   Get profile
   */
  async getProfile() {
    const result = await db.query(
      `SELECT id, name, title, bio, profile_photo_url, cv_url, phone, whatsapp, email, linkedin, github, location, created_at, updated_at
       FROM xportfolio.profile
       WHERE id = $1`,
      [PROFILE_ID]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Profile(
      row.id,
      row.name,
      row.title,
      row.bio,
      row.profile_photo_url,
      row.cv_url,
      row.phone,
      row.whatsapp,
      row.email,
      row.linkedin,
      row.github,
      row.location,
      row.created_at,
      row.updated_at
    );
  }

  /** 
   Update profile
  */
  async updateProfile(updates) {
    const result = await db.query(
      `UPDATE xportfolio.profile
       SET name = $1,
           title = $2,
           bio = $3,
           profile_photo_url = $4,
           cv_url = $5,
           phone = $6,
           whatsapp = $7,
           email = $8,
           linkedin = $9,
           github = $10,
           location = $11
       WHERE id = $12
       RETURNING id, name, title, bio, profile_photo_url, cv_url, phone, whatsapp, email, linkedin, github, location, created_at, updated_at`,
      [
        updates.name,
        updates.title,
        updates.bio,
        updates.profile_photo_url,
        updates.cv_url,
        updates.phone,
        updates.whatsapp,
        updates.email,
        updates.linkedin,
        updates.github,
        updates.location,
        PROFILE_ID,
      ]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Profile(
      row.id,
      row.name,
      row.title,
      row.bio,
      row.profile_photo_url,
      row.cv_url,
      row.phone,
      row.whatsapp,
      row.email,
      row.linkedin,
      row.github,
      row.location,
      row.created_at,
      row.updated_at
    );
  }
}

export default new ProfileRepository();
