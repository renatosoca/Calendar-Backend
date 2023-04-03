// Host + /api/events/*
import { Router } from 'express';
import { check } from 'express-validator';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers';
import { isDate } from '../helpers';
import { checkSesion, fieldValidations } from '../middlewares';

const routes = Router();

routes.use(checkSesion);

routes.route('/')
  .get(getEvents)
  .post([
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Ingrese una fecha de inicio válida').custom(isDate),
    check('end', 'Ingrese una fecha final válida').custom(isDate),
    fieldValidations,
  ], createEvent);

routes.route('/:id')
  .put([
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Ingrese una fecha de inicio válida').custom(isDate),
    check('end', 'Ingrese una fecha final válida').custom(isDate),
    check('id', 'El usuario es obligatorio').isMongoId(),
    fieldValidations,
  ], updateEvent)
  .delete(deleteEvent);

export default routes;