const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

describe('Task Controller', () => {
    beforeEach(async () => {
        // Clear the database before each test
        await pool.query('DELETE FROM tasks');
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await pool.end();
    });

    describe('GET /api/tasks', () => {
        it('should return all tasks', async () => {
            await pool.query("INSERT INTO tasks (title, completed) VALUES ('Test Task 1', false), ('Test Task 2', true)");
            
            const response = await request(app).get('/api/tasks');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0]).toHaveProperty('title', 'Test Task 1');
            expect(response.body[1]).toHaveProperty('title', 'Test Task 2');
        });
    });

    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const response = await request(app)
            .post('/api/tasks')
            .send({ title: 'New Test Task' });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('title', 'New Test Task');
            expect(response.body).toHaveProperty('completed', false);

            // Check if the task was actually inserted into the database
            const { rows } = await pool.query('SELECT * FROM tasks');
            expect(rows.length).toBe(1);
            expect(rows[0].title).toBe('New Test Task');
        });
    });
});