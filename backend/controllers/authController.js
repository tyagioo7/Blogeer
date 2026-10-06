import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req,res) => {
    try{
        const {email,password} = req.body

        const[users] = await db.query(
            `SELECT id, name,email,password,role
            FROM users
            WHERE email = ?`,
           [email]
        );

        if(users.length === 0){
            return res.status(404).json({
                message: "EMAIL NOT FOUND"
            })
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        )

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        if(user.role !== "admin" ){
            return res.status(403).json({
                message: "Access denied"
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8000h"
            }
        )

        return res.status(200).json({
            message: "Login successful",
            token: token
        })
    }catch(error){
        console.log(error);
         res.status(500).json({
            message: "Failed to login"
         })
    }
}