import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    trim: true,
  }
});

export default model('User', userSchema);