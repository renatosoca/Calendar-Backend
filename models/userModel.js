import { Schema, model } from 'mongoose'; 
import bcrypt from 'bcrypt';

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