import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// create an express app
const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();

// middleware
app.use(express.json()); // parse JSON bodies
app.use(rateLimiter);
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use((req, res, next) => {
    console.log(`req method is ${req.method} & req URL is ${req.url}`);
    next();
});

// notesRoutes handles this endpoint
app.use("/api/notes", notesRoutes);

// connect to db then listen on port
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});

