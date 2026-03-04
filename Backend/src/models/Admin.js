const db = require('../config/database');

class Admin {
  // Get all admins
  static async getAll() {
    const [rows] = await db.query('SELECT id, full_name, username, role, created_by, created_at, updated_at FROM admin');
    return rows;
  }

  // Get admin by ID
  static async getById(id) {
    const [rows] = await db.query('SELECT id, full_name, username, role, created_by, created_at, updated_at FROM admin WHERE id = ?', [id]);
    return rows[0];
  }

  // Get admin by username
  static async getByUsername(username) {
    const [rows] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);
    return rows[0];
  }

  // Create new admin
  static async create(data) {
    const { full_name, username, password, role = 'admin', created_by } = data;
    const [result] = await db.query(
      'INSERT INTO admin (full_name, username, password, role, created_by) VALUES (?, ?, ?, ?, ?)',
      [full_name, username, password, role, created_by]
    );
    return result.insertId;
  }

  // Update admin
  static async update(id, data) {
    const { full_name, username, password } = data;
    let query = 'UPDATE admin SET full_name = ?, username = ?';
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

  // Delete admin
  static async delete(id) {
    const [result] = await db.query('DELETE FROM admin WHERE id = ?', [id]);
    return result.affectedRows;
  }

  // Get admins created by specific superadmin
  static async getByCreator(superadminId) {
    const [rows] = await db.query('SELECT id, full_name, username, role, created_by, created_at, updated_at FROM admin WHERE created_by = ?', [superadminId]);
    return rows;
  }
}

module.exports = Admin;
