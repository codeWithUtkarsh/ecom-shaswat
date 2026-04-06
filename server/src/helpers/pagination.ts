import { Request } from 'express';

export function parsePageParams(req: Request) {
  const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '20', 10)));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export function parseSortParams(req: Request, allowedFields: string[] = ['created_at']) {
  const sortBy = (req.query.sort as string) || 'created_at';
  const ascending = req.query.order === 'asc';
  const field = allowedFields.includes(sortBy) ? sortBy : 'created_at';
  return { field, ascending };
}
