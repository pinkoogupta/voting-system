import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import db from './db/db.js'; // Ensure `db.js` uses ESM or has a `.mjs` extension.
import userRoutes from './routes/user.route.js';
import candidateRoutes from './routes/candidate.Route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON in request bodies

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
