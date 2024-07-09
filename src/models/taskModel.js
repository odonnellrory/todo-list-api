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

}