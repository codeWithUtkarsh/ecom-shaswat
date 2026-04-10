import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { createUserClient, createAnonClient } from '../lib/supabase';

interface JwtPayload {
  sub: string;
  email?: string;
  role?: string;
  exp: number;
}

/** Requires a valid Supabase JWT. Returns 401 if missing or invalid. */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, env.SUPABASE_JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JwtPayload;

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    req.supabase = createUserClient(token);

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/** Attaches user if token is present, but allows unauthenticated access. */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    req.user = null;
    req.supabase = createAnonClient();
    return next();
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, env.SUPABASE_JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JwtPayload;

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    req.supabase = createUserClient(token);
  } catch {
    req.user = null;
    req.supabase = createAnonClient();
  }

  next();
}
