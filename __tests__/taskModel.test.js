const Task = require('../src/models/taskModel');
const pool = require('../src/db');

describe('Task Model', () => {
    beforeEach(async () => {
        // Clear the database before each test
        await pool.query('DELETE FROM tasks');
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await pool.end();
    });

    describe('getAllTasks', () => {
        it('should return all tasks', async () => {
            await pool.query("INSERT INTO tasks (title, completed) VALUES ('Test Task 1', false), ('Test Task 2', true)");
            const tasks = await Task.getAllTasks();

            expect(tasks.length).toBe(2);
            expect(tasks[0]).toHaveProperty('title', 'Test Task 1');
            expect(tasks[1]).toHaveProperty('title', 'Test Task 2');
        });
    });

    describe('createTask', () => {
        it('should create a new task', async () => {
            const newTask = await Task.createTask('New Test Task');

            expect(newTask).toHaveProperty('title', 'New Test Task');
            expect(newTask).toHaveProperty('completed', false);

            // Check if the task was actually inserted into the database
            const { rows } = await pool.query('SELECT * FROM tasks');
            expect(rows.length).toBe(1);
            expect(rows[0].title).toBe('New Test Task');
        });
    });
});