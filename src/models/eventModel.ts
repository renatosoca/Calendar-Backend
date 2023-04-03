import { Schema, model } from "mongoose";
import { Event } from "../interfaces";

const eventSchema = new Schema<Event>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  createdFor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true, versionKey: false });

export default model<Event>("Event", eventSchema);