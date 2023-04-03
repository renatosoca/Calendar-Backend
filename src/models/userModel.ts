import { Schema, model } from 'mongoose';
import { generateToken } from '../helpers';
import { User } from '../interfaces';

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
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
  }
}, { timestamps: true, versionKey: false });

export default model<User>('User', userSchema);