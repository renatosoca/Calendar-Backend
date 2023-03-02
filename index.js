import express from 'express';
import dotenv from 'dotenv/config';

import authRoutes from './routes/authRoute.js';
import { dbConnection } from './database/config.js';

const app = express();
dbConnection();

// Middlewares
app.use( express.json() );

// Rutas
app.use( '/api/auth', authRoutes );


const port = process.env.PORT || 4001;
app.listen( port, () => {
  console.log(`Servidor iniciado en el puerto: ${port}`);
});