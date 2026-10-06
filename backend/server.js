import "dotenv/config";
import express from "express";
import cors from "cors"
import db from "./config/db.js";

import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express() 

const PORT = 3000;

app.use(cors())
app.use(express.json())


app.use("/api/posts",postRoutes);
app.use("/api/auth" , authRoutes)
app.use("/api/admin/posts",adminRoutes)

app.get("/" , (req , res) =>{
    res.send("welcome to blog")
})

try {
    const [result] = await db.query("SELECT 1");
    console.log("MySQL connected successfully");
} catch (error) {
    console.error("MySQL connection failed:", error.message);
}
app.listen(PORT,() => {
    console.log(`BLOG server is running on port${PORT}`);
    
})