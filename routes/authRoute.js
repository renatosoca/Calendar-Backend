// Host + /api/auth/*
import express from 'express';
import { check } from 'express-validator'; 

import { fieldsValidator } from '../middlewares/fieldsValidator.js';
import { authUser, createUser, revalidateToken } from '../controllers/authController.js';

const routes = express.Router();

routes.route('/login').post( [
  check('email', 'El email es obligatorio').isEmail(),
  check('password',
      `La contraseña debe tener mínimo 8 caracteres.Debe contener una letra minúscula.Debe contener una letra mayúscula.Debe contener un carácter especial.Debe contener mínimo un número.`
    ).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  fieldsValidator,
], authUser );
routes.route('/register').post( [
  check('name', 'El nombre es obligatorio').isLength({ min: 2 }),
  check('email', 'El email es obligatorio').isEmail(),
  check('password',
      `La contraseña debe tener mínimo 8 caracteres.Debe contener una letra minúscula.Debe contener una letra mayúscula.Debe contener un carácter especial.Debe contener mínimo un número.`
    ).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  fieldsValidator,
], createUser );

routes.route('/renew').get( revalidateToken );

export default routes;