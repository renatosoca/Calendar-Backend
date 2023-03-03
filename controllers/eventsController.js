import { request, response } from 'express';
import eventModel from '../models/eventModel.js';

const getEvents = async ( req = request, res = response ) => {
  const { _id } = req.user;

  try {
    const events = await eventModel.find(/* { user: _id } */).populate('user', 'name email');
  
    res.status(200).json({ 
      ok: true,
      events
    });
  } catch (error) {
    res.status(500).json({ 
      ok: false, 
      msg: 'Error del sistema' 
    });
  }
}

const createEvent = async ( req = request, res = response ) => {
  const event = new eventModel( req.body )

  try {
    event.user = req.user._id;
    const savedEvent = await event.save();

    res.status(201).json({ 
      ok: true,
      event: savedEvent, 
    });
  } catch (error) {
    res.status(500).json({ 
      ok: false, 
      msg: 'Error del sistema' 
    });
  }
}

const updateEvent = async ( req = request, res = response ) => {
  const { id } = req.params;
  const { _id } = req.user;
  
  try {
    const event = await eventModel.findById( id );
    if ( !event ) return res.status(404).json({ ok: false, msg: 'Evento no encontrado' });

    if ( event.user.toString() !== _id.toString() ) return res.status(401).json({ ok: false, msg: 'No autorizado para actualizar este evento' });

    const newEvent = {
      ...req.body,
      user: _id,
    }
    const updateEvent = await eventModel.findByIdAndUpdate( id, newEvent, { new: true } );

    res.status(200).json({
      ok: true,
      event: updateEvent,
    });
  } catch (error) {
    res.status(500).json({ 
      ok: false, 
      msg: 'Error del sistema, comuniquese con el administrador' 
    });
  }
}

const deleteEvent = async ( req = request, res = response ) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    const event = await eventModel.findById( id );
    if ( !event ) return res.status(404).json({ ok: false, msg: 'Evento no encontrado' });

    if ( event.user.toString() !== _id.toString() ) return res.status(401).json({ ok: false, msg: 'No autorizado para eliminar este evento' });

    const deleteEvent = await eventModel.findByIdAndDelete( id );

    res.status(200).json({
      ok: true,
      msg: 'Evento eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({ 
      ok: false, 
      msg: 'Error del sistema, comuniquese con el administrador' 
    });
  }
}

export {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}