import express from 'express';
import 'dotenv/config';
import cors, { CorsOptions } from 'cors';
import { dbConnection } from './database/config';
import { authRoutes, eventsRoutes } from './routes';

const app = express();
dbConnection();

const corsconfig: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && [process.env.FRONTEND_URI].indexOf(origin) !== -1) return callback(null, true);

    return callback(new Error('Not authorized by CORS'), false);
  }
}
app.use(cors(corsconfig));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/event', eventsRoutes);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto: ${port}`);
});