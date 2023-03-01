// Host + /api/auth
import express from 'express';

import { authenticate } from '../controllers/authController.js';

const routes = express.Router();

routes.route('/').get( authenticate )

export default routes;