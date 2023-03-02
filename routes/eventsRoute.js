// Host + /api/events/*
import { Router } from 'express';

import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/eventsController.js';
import jwtValidator from '../middlewares/jwtValidator.js';

const routes = Router();

routes.route('/')
  .get( jwtValidator, getEvents )
  .post( jwtValidator, createEvent )

routes.route('/:id')
  .put( jwtValidator, updateEvent )
  .delete( jwtValidator, deleteEvent );

export default routes;