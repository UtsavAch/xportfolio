// database/repositories/contactMessageRepository.js
import db from "../db/db.js";
import { ContactMessage } from "../models/models.js";

class ContactMessageRepository {
  /** 
    Get all messages
  */
  async getAll() {
    const result = await db.query(
      `SELECT id, sender_name, sender_email, sender_linkedin, message, is_read, created_at
       FROM xportfolio.contact_messages
       ORDER BY created_at DESC`
    );
    return result.rows.map(
      (row) =>
        new ContactMessage(
          row.id,
          row.sender_name,
          row.sender_email,
          row.sender_linkedin,
          row.message,
          row.is_read,
          row.created_at
        )
    );
  }

  /**
    Get message by ID
  */
  async getById(id) {
    const result = await db.query(
      `SELECT id, sender_name, sender_email, sender_linkedin, message, is_read, created_at
       FROM xportfolio.contact_messages
       WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new ContactMessage(
      row.id,
      row.sender_name,
      row.sender_email,
      row.sender_linkedin,
      row.message,
      row.is_read,
      row.created_at
    );
  }

  /** 
   Create a new contact message
  */
  async create(message) {
    const result = await db.query(
      `INSERT INTO xportfolio.contact_messages (sender_name, sender_email, sender_linkedin, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, sender_name, sender_email, sender_linkedin, message, is_read, created_at`,
      [
        message.sender_name,
        message.sender_email,
        message.sender_linkedin,
        message.message,
      ]
    );
    const row = result.rows[0];
    return new ContactMessage(
      row.id,
      row.sender_name,
      row.sender_email,
      row.sender_linkedin,
      row.message,
      row.is_read,
      row.created_at
    );
  }

  /** 
  Mark message as read
  */
  async markAsRead(id) {
    const result = await db.query(
      `UPDATE xportfolio.contact_messages
       SET is_read = TRUE
       WHERE id = $1
       RETURNING id, sender_name, sender_email, sender_linkedin, message, is_read, created_at`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new ContactMessage(
      row.id,
      row.sender_name,
      row.sender_email,
      row.sender_linkedin,
      row.message,
      row.is_read,
      row.created_at
    );
  }

  /**
   Delete a message
  */
  async delete(id) {
    const result = await db.query(
      `DELETE FROM xportfolio.contact_messages
       WHERE id = $1
       RETURNING id, sender_name, sender_email, sender_linkedin, message, is_read, created_at`,
      [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new ContactMessage(
      row.id,
      row.sender_name,
      row.sender_email,
      row.sender_linkedin,
      row.message,
      row.is_read,
      row.created_at
    );
  }
}

export default new ContactMessageRepository();
