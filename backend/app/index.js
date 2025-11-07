import 'dotenv/config'
import express from 'express';
import cors from 'cors';
// Import routes
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
// Middleware to populate session with active session owner
import { SessionUser } from "./security/index.js";

const PORT = process.env.SERVER_PORT;

// Create application
const app = express();

// Register middlewares
app.use(cors());
app.use(express.json());
app.use(SessionUser);

// Root route
app.get("/", (_, res) => {
    res.send("Hello from Task Tracker Backend!");
})
// Register routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.listen(PORT, () => {
    console.log(`Task Tracker Backend runs at http://localhost:${PORT}`);
});
