import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';
import { parsePageParams } from '../helpers/pagination';

const router = Router();

/**
 * GET /api/search?q=keyword
 * Search products by name and description.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = (req.query.q as string)?.trim();

    if (!q || q.length < 2) {
      return jsonError(res, 'Search query must be at least 2 characters', 400);
    }

    const { page, limit, offset } = parsePageParams(req);
    const category = req.query.category as string;
    const pattern = `%${q}%`;

    let query = req.supabase
      .from('products')
      .select('*', { count: 'exact' })
      .or(`name.ilike.${pattern},description.ilike.${pattern}`);

    if (category) query = query.eq('category', category);

    query = query
      .order('rating', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, {
      query: q,
      products: data ?? [],
      pagination: {
        page,
        limit,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
