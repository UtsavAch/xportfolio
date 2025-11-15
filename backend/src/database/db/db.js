// db.js - Database Abstraction Layer
import { Pool } from "pg";
import logger from "./logger.js";

class Database {
  constructor() {
    this.pool = null;
    this.config = null;
    this.currentTransaction = null;
  }

  async connect(config) {
    this.config = config;
    try {
      this.pool = new Pool(
        typeof config === "string"
          ? { connectionString: config, ssl: { rejectUnauthorized: false } }
          : config
      );
      logger.info("Connected to database");
      await this.pool.query("SELECT 1");
    } catch (err) {
      logger.error("Database connection error:", err);
      throw err;
    }
  }

  async query(sql, params = []) {
    try {
      // Clean up SQL by removing extra whitespace
      const cleanSql = sql.replace(/\s+/g, " ").trim();
      logger.debug(`SQL: ${cleanSql} Params: ${JSON.stringify(params)}`);

      if (this.currentTransaction) {
        return await this.currentTransaction.query(cleanSql, params);
      }
      return await this.pool.query(cleanSql, params);
    } catch (err) {
      logger.error("Database query error:", err);
      throw err;
    }
  }

  async beginTransaction() {
    if (this.currentTransaction) {
      throw new Error("Transaction already in progress");
    }
    this.currentTransaction = await this.pool.connect();
    await this.currentTransaction.query("BEGIN");
    logger.debug("Transaction started");
  }

  async commitTransaction() {
    if (!this.currentTransaction) {
      throw new Error("No transaction to commit");
    }
    try {
      await this.currentTransaction.query("COMMIT");
      logger.debug("Transaction committed");
    } finally {
      this.currentTransaction.release();
      this.currentTransaction = null;
    }
  }

  async rollbackTransaction() {
    if (!this.currentTransaction) {
      throw new Error("No transaction to rollback");
    }
    try {
      await this.currentTransaction.query("ROLLBACK");
      logger.debug("Transaction rolled back");
    } finally {
      this.currentTransaction.release();
      this.currentTransaction = null;
    }
  }

  async close() {
    if (this.currentTransaction) {
      await this.rollbackTransaction();
    }
    await this.pool.end();
    logger.info("Database connection closed");
  }

  // Helper method for executing queries in a transaction
  async executeInTransaction(callback) {
    await this.beginTransaction();
    try {
      const result = await callback();
      await this.commitTransaction();
      return result;
    } catch (err) {
      await this.rollbackTransaction();
      throw err;
    }
  }
}

// Singleton instance
export default new Database();
