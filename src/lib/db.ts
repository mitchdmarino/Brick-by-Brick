import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('brick_by_brick.db');

export function initDB() {
  db.execSync('PRAGMA foreign_keys = ON'); 

  db.execSync(`
    CREATE TABLE IF NOT EXISTS walls (
      id           INTEGER PRIMARY KEY,
      name         TEXT    NOT NULL,
      description  TEXT,
      created_at   TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bricks (
      id           INTEGER PRIMARY KEY,
      wall_id      INTEGER NOT NULL REFERENCES walls(id) ON DELETE CASCADE
    );
  `);
}

export default db; 