const Task = require('../models/taskModel');

exports.getAllTasks = async (request, response) => {
    try {
        const tasks = await Task.getAllTasks();
        response.json(tasks);
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
};

exports.createTask = async (request, response) => {
    try {
        const { title } = request.body;
        const newTask = await Task.createTask(title);
        response.status(201).json(newTask);
    } catch (error) {
        response.status(500).json({ error: 'Server Error'})
    }
}