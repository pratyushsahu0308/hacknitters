import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import pdfRoutes from './routes/pdfRoutes.js'

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(cookieParser());



app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/resume',pdfRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/resume', express.static(path.join(__dirname, '/resume')))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req,res) => res.sendFile(path.resolved(__dirname,'frontend','build','index.html')));
} else {
    app.get("/", (req,res) => {
        res.send("Api is running")
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {console.log(`server running on port ${port}`)});