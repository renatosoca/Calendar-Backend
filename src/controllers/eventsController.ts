import { Response } from 'express';
import { UserRequest } from '../interfaces';
import eventModel from '../models/eventModel';

export const getEvents = async ({ user }: UserRequest, res: Response ) => {
  if (!user ) return res.status(401).json({ ok: false, msg: 'No autorizado' });
  const { _id } = user;

  try {
    const events = await eventModel.find( { createdFor: _id } ).populate('createdFor', '_id name lastname email');
  
    return res.status(200).json({ 
      ok: true,
      events
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const createEvent = async ({ body, user }: UserRequest, res: Response) => {
  if (!user ) return res.status(401).json({ ok: false, msg: 'No autorizado' });
  
  try {
    const event = new eventModel( body );
    event.createdFor = user;
    const savedEvent = await event.save();

    return res.status(201).json({ 
      ok: true,
      event: savedEvent, 
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const updateEvent = async ({ params, body, user }: UserRequest, res: Response) => {
  if (!user) return res.status(401).json({ ok: false, msg: 'No autorizado' });
  const { id } = params;
  
  try {
    const event = await eventModel.findById( id ).populate('createdFor');
    if ( !event ) return res.status(404).json({ ok: false, msg: 'Evento no encontrado' });

    if ( event.createdFor._id.toString() !== user._id.toString() ) return res.status(403).json({ ok: false, msg: 'No autorizado para esta acción' });

    const updateEvent = await eventModel.findByIdAndUpdate( id, { ...body }, { new: true } );

    return res.status(200).json({
      ok: true,
      event: updateEvent,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const deleteEvent = async ({ params, user }: UserRequest, res: Response) => {
  if (!user) return res.status(401).json({ ok: false, msg: 'No autorizado' });
  const { id } = params;

  try {
    const event = await eventModel.findById( id ).populate('createdFor');
    if ( !event ) return res.status(404).json({ ok: false, msg: 'Evento no encontrado' });

    if ( event.createdFor._id.toString() !== user._id.toString() ) return res.status(403).json({ ok: false, msg: 'No autorizado para esta acción' });

    await eventModel.findByIdAndDelete( id );

    return res.status(200).json({
      ok: true,
      msg: 'Evento eliminado correctamente'
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, comuniquese con el administrador' });
  }
}