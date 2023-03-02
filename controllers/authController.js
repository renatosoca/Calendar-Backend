import { response, request } from 'express';

const authUser = ( req, res = response ) => {
  const { email, password } = req.body;

  res.status(201).json({ ok: true, page: 'login' });
}

const createUser = ( req, res = response ) => {
  const { name, email, password } = req.body;

  res.status(201).json({ ok: true, page: 'createUser', name, email, password });
}

const revalidateToken = ( req, res = response ) => {
  res.status(201).json({ ok: true, page: 'tokens' });
}

export {
  authUser,
  createUser,
  revalidateToken,
}