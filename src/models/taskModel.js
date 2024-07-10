const pool = require('../db');

class Task {
    static async getAllTasks() {
        const query = 'SELECT * FROM tasks';
        const { rows } = await pool.query(query);
        return rows;
    }

    static async createTask(title) {
        const query = 'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *';
        const values = [title, false];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async updateTask(id, title, completed) {
        const query = 'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *';
        const values = [title, completed, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async deleteTask(id) {
        const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

module.exports = Task;