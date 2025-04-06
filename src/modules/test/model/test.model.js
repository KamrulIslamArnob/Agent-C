const pool = require('../../../configs/db.config');

// Get all
exports.getAll = async () => {
  const res = await pool.query('SELECT * FROM test ORDER BY id ASC');
  return res.rows;
};

// Get by ID
exports.getById = async (id) => {
  const res = await pool.query('SELECT * FROM test WHERE id = $1', [id]);
  return res.rows[0];
};

// Create
exports.create = async (name) => {
  const res = await pool.query(
    'INSERT INTO test (name, "createdAt") VALUES ($1, NOW()) RETURNING *',
    [name]
  );
  return res.rows[0];
};

// Update
exports.update = async (id, name) => {
  const res = await pool.query(
    'UPDATE test SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return res.rows[0];
};

// Delete
exports.remove = async (id) => {
  const res = await pool.query('DELETE FROM test WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
};
