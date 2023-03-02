import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';

import authRoutes from './routes/authRoute.js';
import eventRoutes from './routes/eventsRoute.js';
import { dbConnection } from './database/config.js';

const app = express();
dbConnection();

// Middlewares
app.use( cors({ origin: '*' }) );
app.use( express.json() );

// Rutas
app.use( '/api/auth', authRoutes );
app.use( '/api/event', eventRoutes );

const port = process.env.PORT || 4001;
app.listen( port, () => {
  console.log(`Servidor iniciado en el puerto: ${port}`);
});