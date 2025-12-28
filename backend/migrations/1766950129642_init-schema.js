/* eslint-disable no-undef */
export async function up(pgm) {
  // === SCHEMA ===
  pgm.createSchema("xportfolio", { ifNotExists: true });

  // === EXTENSION FOR UUID ===
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  // === PROFILES TABLE ===
  pgm.createTable(
    { schema: "xportfolio", name: "profile" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("'00000000-0000-0000-0000-000000000001'"),
      },
      name: { type: "text", notNull: true },
      title: { type: "text", notNull: true },
      bio: { type: "text" },
      profile_photo_url: { type: "text" },
      cv_url: { type: "text" },
      phone: { type: "text" },
      whatsapp: { type: "text" },
      email: { type: "text" },
      linkedin: { type: "text" },
      github: { type: "text" },
      location: { type: "text" },
      created_at: { type: "timestamptz", default: pgm.func("now()") },
      updated_at: { type: "timestamptz", default: pgm.func("now()") },
    }
  );

  // === EDUCATION TABLE ===
  pgm.createTable(
    { schema: "xportfolio", name: "education" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()"),
      },
      degree: { type: "text", notNull: true },
      university: { type: "text", notNull: true },
      start_date: { type: "date", notNull: true },
      end_date: { type: "date" },
      description: { type: "text" },
      created_at: { type: "timestamptz", default: pgm.func("now()") },
      updated_at: { type: "timestamptz", default: pgm.func("now()") },
    }
  );

  // === WORK EXPERIENCE TABLE ===
  pgm.createTable(
    { schema: "xportfolio", name: "work_experience" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()"),
      },
      position: { type: "text", notNull: true },
      company: { type: "text", notNull: true },
      location: { type: "text" },
      start_date: { type: "date", notNull: true },
      end_date: { type: "date" },
      description: { type: "text" },
      created_at: { type: "timestamptz", default: pgm.func("now()") },
      updated_at: { type: "timestamptz", default: pgm.func("now()") },
    }
  );

  // === PROJECTS TABLE ===
  pgm.createTable(
    { schema: "xportfolio", name: "projects" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()"),
      },
      title: { type: "text", notNull: true },
      link: { type: "text" },
      description: { type: "text" },
      video_url: { type: "text" },
      created_at: { type: "timestamptz", default: pgm.func("now()") },
      updated_at: { type: "timestamptz", default: pgm.func("now()") },
    }
  );

  // === SKILLS TABLE ===
  pgm.createTable(
    { schema: "xportfolio", name: "skills" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()"),
      },
      type: { type: "text", notNull: true },
      name: { type: "text", notNull: true },
      created_at: { type: "timestamptz", default: pgm.func("now()") },
    }
  );

  // === COURSES TABLE ===
  pgm.createTable(
    { schema: "xportfolio", name: "courses" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()"),
      },
      title: { type: "text", notNull: true },
      start_date: { type: "date", notNull: true },
      end_date: { type: "date" },
      link: { type: "text" },
      description: { type: "text" },
      created_at: { type: "timestamptz", default: pgm.func("now()") },
      updated_at: { type: "timestamptz", default: pgm.func("now()") },
    }
  );

  // === TRIGGER FUNCTION: update_updated_at ===
  pgm.sql(`
    CREATE OR REPLACE FUNCTION xportfolio.update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // === ADD TRIGGERS TO TABLES ===
  ["profile", "education", "work_experience", "projects", "courses"].forEach(
    (table) => {
      pgm.sql(`
      CREATE TRIGGER update_${table}_updated_at
      BEFORE UPDATE ON xportfolio.${table}
      FOR EACH ROW
      EXECUTE FUNCTION xportfolio.update_updated_at();
    `);
    }
  );

  // === INSERT SINGLE PROFILE ===
  pgm.sql(`
    INSERT INTO xportfolio.profile (id, name, title)
    VALUES ('00000000-0000-0000-0000-000000000001', 'Your Name', 'Your Title')
    ON CONFLICT (id) DO NOTHING;
  `);

  // === TRIGGER TO PREVENT DELETION OF PROFILE ===
  pgm.sql(`
    CREATE OR REPLACE FUNCTION xportfolio.prevent_profile_delete()
    RETURNS TRIGGER AS $$
    BEGIN
      RAISE EXCEPTION 'Deleting the profile is not allowed.';
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER block_profile_delete
    BEFORE DELETE ON xportfolio.profile
    FOR EACH ROW
    EXECUTE FUNCTION xportfolio.prevent_profile_delete();
  `);

  // === CONSTRAINT TO ENSURE ONLY ONE PROFILE ===
  pgm.addConstraint(
    { schema: "xportfolio", name: "profile" },
    "only_one_profile",
    {
      check: "id = '00000000-0000-0000-0000-000000000001'",
    }
  );
}

export async function down(pgm) {
  // Drop entire schema on rollback
  pgm.dropSchema("xportfolio", { cascade: true });
}
