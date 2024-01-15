import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = await open({
  filename: path.join(__dirname, 'todo.db'),
  driver: sqlite3.Database
});
const initFile = await fs.readFile(path.join(__dirname, 'init.sql'));

await db.exec(initFile.toString());

export default db;