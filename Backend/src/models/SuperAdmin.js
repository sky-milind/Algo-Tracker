const db = require('../config/database');

class SuperAdmin {
  // Get all superadmins
  static async getAll() {
    const [rows] = await db.query('SELECT id, full_name, username, role, created_at, updated_at FROM superadmin');
    return rows;
  }

  // Get superadmin by ID
  static async getById(id) {
    const [rows] = await db.query('SELECT id, full_name, username, role, created_at, updated_at FROM superadmin WHERE id = ?', [id]);
    return rows[0];
  }

  // Get superadmin by username
  static async getByUsername(username) {
    const [rows] = await db.query('SELECT * FROM superadmin WHERE username = ?', [username]);
    return rows[0];
  }

  // Create new superadmin
  static async create(data) {
    const { full_name, username, password, role = 'superadmin' } = data;
    const [result] = await db.query(
      'INSERT INTO superadmin (full_name, username, password, role) VALUES (?, ?, ?, ?)',
      [full_name, username, password, role]
    );
    return result.insertId;
  }

  // Update superadmin
  static async update(id, data) {
    const { full_name, username, password } = data;
    let query = 'UPDATE superadmin SET full_name = ?, username = ?';
    let params = [full_name, username];
    
    if (password) {
      query += ', password = ?';
      params.push(password);
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    const [result] = await db.query(query, params);
    return result.affectedRows;
  }

  // Delete superadmin
  static async delete(id) {
    const [result] = await db.query('DELETE FROM superadmin WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = SuperAdmin;
