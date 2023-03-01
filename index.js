import express from 'express';
import dotenv from 'dotenv/config';

import authRoutes from './routes/authRoute.js';

const app = express();

// Rutas
app.use( '/api/auth', authRoutes );

// Middlewares
app.use( express.json() );

const port = process.env.PORT || 4001;
app.listen( port, () => {
  console.log(`Servidor iniciado en el puerto: ${port}`);
});