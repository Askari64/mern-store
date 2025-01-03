import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000

app.get("/", (req,res) => {
    res.send("Server is ready")
})

app.listen(PORT, () => {
    console.log(`🟢 Server started on Port ${PORT}`)
})

