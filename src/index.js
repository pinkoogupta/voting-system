import express from 'express';
import dotenv from 'dotenv';


import db from './db/db.js'; // Ensure `db.js` uses ESM or has a `.mjs` extension.
import userRoutes from './routes/user.route.js';
import candidateRoutes from './routes/candidate.Route.js';
import cors from "cors"
import cookiesParser from "cookie-parser"

const app =express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookiesParser());
dotenv.config();


const PORT = process.env.PORT || 3000;

// Middleware


// Use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
