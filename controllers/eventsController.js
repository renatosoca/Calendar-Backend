import { request, response } from 'express';

const getEvents = ( req = request, res = response ) => {

  res.status(200).json({ ok: true, msg: 'getEvents' });
}

const createEvent = ( req = request, res = response ) => {
  const { title, notes, start, end } = req.body;

  res.status(200).json({ ok: true, msg: 'createEvent' });
}

const updateEvent = ( req = request, res = response ) => {

  res.status(200).json({ ok: true, msg: 'updateEvent' });
}

const deleteEvent = ( req = request, res = response ) => {

  res.status(200).json({ ok: true, msg: 'deleteEvent' });
}

export {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}