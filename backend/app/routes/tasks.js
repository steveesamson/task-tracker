import express from 'express';
import { taskService } from "../services/index.js";
import { OnlyAuthed } from '../security/index.js';
import { deriveErrorMessage } from '../utils/index.js';

const router = express.Router();


router.get('/stats', [OnlyAuthed], async (req, res) => {
    try {
        const data = await taskService.getStats();
        res.status(200).json({ data });
    } catch (e) {
        const err = deriveErrorMessage(e);
        console.error(err);
        res.status(500).json({ error: "Unable to fulfill your request." });
    }

});
router.get('/:id?', [OnlyAuthed], async (req, res) => {
    try {
        const { query } = req;

        const id = req.params.id;
        let data;
        if (id) {
            data = await taskService.findById(id);
        } else {
            data = await taskService.findAll(query);
        }
        res.status(200).json({ data });
    } catch (e) {
        const err = deriveErrorMessage(e);
        console.error(err);
        res.status(500).json({ error: "Unable to fulfill your request." });
    }

});

router.post('/', [OnlyAuthed], async (req, res) => {

    try {
        const { title, description, status, priority, created_at } = req.body;
        // Check for fields
        if (!title || !description || !status || !priority || !created_at) {
            return res.status(400).json({ error: "Invalid request" });
        }
        const data = await taskService.addTask({ title, description, status, priority, created_at });
        res.status(200).json({ data });
    } catch (e) {
        const err = deriveErrorMessage(e);
        console.error(err);
        if (err.includes("duplicate key")) {
            return res.status(400).json({ error: "Tasks with the same title already exists." });
        }
        res.status(500).json({ error: "Unable to add task." });
    }
});


router.put('/:id', [OnlyAuthed], async (req, res) => {

    try {
        const id = req.params.id;
        const data = req.body;
        data.id = id;
        await taskService.updateTask({ ...data });
        res.status(201).json({ data });
    } catch (e) {
        const err = deriveErrorMessage(e);
        console.error(err);
        res.status(500).json({ error: "Unable to update task." });
    }
});
router.delete('/:id', [OnlyAuthed], async (req, res) => {

    try {
        const id = req.params.id;
        await taskService.deleteTask(id);
        res.status(201).json({ data: { id } });
    } catch (e) {
        const err = deriveErrorMessage(e);
        console.error(err);
        res.status(500).json({ error: "Unable to update task." });
    }
});


export default router;
