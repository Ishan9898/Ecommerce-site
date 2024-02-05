// const express = require('express')
// const colors = require('colors') 
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cors from "cors";
import path from "path";
// configure env
dotenv.config();

// rest object
const app = express();

// database config
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));

// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use("/api/v1/product",productRoutes);

// rest api 
app.use('*',function (req,res) {
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

// POST 
// For react we use port 3000
// For angular we use port 200
// For node the most common port is 8000 or 8080

const PORT = process.env.PORT || 8080;


// run listen
app.listen(PORT , () =>{
    console.log(`Server Running on${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
