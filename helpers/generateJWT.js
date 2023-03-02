import jwt from 'jsonwebtoken';

const generateJWT = ( _id = '', name = '' ) => {
  return jwt.sign( { _id, name }, process.env.KEY_SECRET_JWT, {
    expiresIn: '2h'
  });
}

export default generateJWT;