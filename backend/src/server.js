import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

// create an express app
const app = express();

// notesRoutes handles this endpoint
app.use("/api/notes", notesRoutes)

// listen on port
app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
});