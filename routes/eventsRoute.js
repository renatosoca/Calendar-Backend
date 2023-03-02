// Host + /api/events/*
import { Router } from 'express';
import { check } from 'express-validator';

import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/eventsController.js';
import { fieldsValidator } from '../middlewares/fieldsValidator.js';
import jwtValidator from '../middlewares/jwtValidator.js';

const routes = Router();

routes.use( jwtValidator );

routes.route('/')
  .get( getEvents )
  .post( [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Ingrese una fecha de inicio válida').isDate(),
    check('end', 'Ingrese una fecha final válida').isDate(),
    fieldsValidator,
  ], createEvent )

routes.route('/:id')
  .put( [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Ingrese una fecha de inicio válida').isDate(),
    check('end', 'Ingrese una fecha final válida').isDate(),
    check('id', 'El usuario es obligatorio').isMongoId(),
    fieldsValidator,
  ], updateEvent )
  .delete( deleteEvent );

export default routes;