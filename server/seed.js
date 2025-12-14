const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mysql = require('mysql2/promise');

async function getColumns(conn, db, table) {
  const [cols] = await conn.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
    [db, table]
  );
  return cols.map(c => c.COLUMN_NAME);
}

async function insertIfTableExists(conn, db, tableMatch, buildRow) {
  const [tables] = await conn.query('SHOW TABLES');
  const keyName = Object.keys(tables[0] || {})[0];
  for (const t of tables) {
    const table = t[keyName];
    if (table.toLowerCase().includes(tableMatch)) {
      const cols = await getColumns(conn, db, table);
      const row = buildRow(cols);
      if (!row) continue;
      const keys = Object.keys(row);
      const placeholders = keys.map(() => '?').join(',');
      const sql = `INSERT INTO \`${table}\` (${keys.map(k => `\`${k}\``).join(',')}) VALUES (${placeholders})`;
      try {
        const [res] = await conn.query(sql, keys.map(k => row[k]));
        console.log(`Inserted into ${table}, id=${res.insertId}`);
      } catch (err) {
        console.log(`Failed to insert into ${table}: ${err.message}`);
      }
    }
  }
}

async function main() {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
  const conn = await mysql.createConnection({
    host: DB_HOST || 'localhost',
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    multipleStatements: true,
  });

  // Insert a user-like row when a user table is found
  await insertIfTableExists(conn, DB_NAME, 'user', (cols) => {
    const map = {};
    // map common column names to dummy values if present
    if (cols.includes('email')) map.email = `test.user+${Date.now()}@example.com`;
    if (cols.includes('firstName') || cols.includes('firstname') || cols.includes('first_name')) {
      const key = cols.includes('firstName') ? 'firstName' : (cols.includes('firstname') ? 'firstname' : 'first_name');
      map[key] = 'Test';
    }
    if (cols.includes('lastName') || cols.includes('lastname') || cols.includes('last_name')) {
      const key = cols.includes('lastName') ? 'lastName' : (cols.includes('lastname') ? 'lastname' : 'last_name');
      map[key] = 'User';
    }
    if (cols.includes('password')) map.password = 'password123';
    if (cols.includes('created_at') || cols.includes('createdAt')) {
      const k = cols.includes('created_at') ? 'created_at' : 'createdAt';
      map[k] = new Date();
    }
    return Object.keys(map).length ? map : null;
  });

  // Insert a post-like row when a post table is found
  await insertIfTableExists(conn, DB_NAME, 'post', (cols) => {
    const map = {};
    if (cols.includes('title')) map.title = 'Sample Post Title';
    if (cols.includes('content') || cols.includes('body')) {
      const k = cols.includes('content') ? 'content' : 'body';
      map[k] = 'This is a sample post inserted by seed script.';
    }
    // try to link to a user id if a user_id or author_id column exists; set to 1 (may or may not exist)
    if (cols.includes('user_id')) map.user_id = 1;
    if (cols.includes('author_id')) map.author_id = 1;
    if (cols.includes('created_at') || cols.includes('createdAt')) {
      const k = cols.includes('created_at') ? 'created_at' : 'createdAt';
      map[k] = new Date();
    }
    return Object.keys(map).length ? map : null;
  });

  // Insert a comment-like row when a comment table is found
  await insertIfTableExists(conn, DB_NAME, 'comment', (cols) => {
    const map = {};
    if (cols.includes('content') || cols.includes('body')) {
      const k = cols.includes('content') ? 'content' : 'body';
      map[k] = 'Sample comment from seed script.';
    }
    if (cols.includes('post_id')) map.post_id = 1;
    if (cols.includes('user_id')) map.user_id = 1;
    if (cols.includes('created_at') || cols.includes('createdAt')) {
      const k = cols.includes('created_at') ? 'created_at' : 'createdAt';
      map[k] = new Date();
    }
    return Object.keys(map).length ? map : null;
  });

  await conn.end();
  console.log('Seeding complete.');
}

main().catch(err => {
  console.error('Seeding error:', err.message);
  process.exit(1);
});