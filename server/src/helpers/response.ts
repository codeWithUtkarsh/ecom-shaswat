import { Response } from 'express';

export function jsonOk(res: Response, data: unknown, status = 200) {
  return res.status(status).json({ data });
}

export function jsonError(res: Response, message: string, status = 400) {
  return res.status(status).json({ error: message });
}
