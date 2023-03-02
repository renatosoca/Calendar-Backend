import { validationResult } from 'express-validator';

const fieldsValidator = ( req, res, next ) => {
  const errors = validationResult( req );
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      ok: false, 
      errors: errors.array() 
    });
  }

  next();
}

export {
  fieldsValidator,
}