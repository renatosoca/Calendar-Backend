import { Schema, model } from 'mongoose'; 
import bcrypt from 'bcrypt';

import generateToken from '../helpers/generateToken.js';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
    default: generateToken(),
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

userSchema.pre('save', async function( next ) {
  if ( !this.isModified('password') ) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash( this.password, salt );
});

userSchema.methods.matchPassword = async function( password ) {
  return await bcrypt.compare( password, this.password );
}

export default model('User', userSchema);