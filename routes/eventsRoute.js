// Host + /api/events/*
import { Router } from 'express';
import { check } from 'express-validator';

import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/eventsController.js';
import { fieldsValidator } from '../middlewares/fieldsValidator.js';
import jwtValidator from '../middlewares/jwtValidator.js';
import isDate from '../helpers/isDate.js';

const routes = Router();

routes.use( jwtValidator );

routes.route('/')
  .get( getEvents )
  .post( [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Ingrese una fecha de inicio válida').custom( isDate ),
    check('end', 'Ingrese una fecha final válida').custom( isDate ),
    fieldsValidator,
  ], createEvent )

routes.route('/:id')
  .put( [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Ingrese una fecha de inicio válida').custom( isDate ),
    check('end', 'Ingrese una fecha final válida').custom( isDate ),
    check('id', 'El usuario es obligatorio').isMongoId(),
    fieldsValidator,
  ], updateEvent )
  .delete( deleteEvent );

export default routes;