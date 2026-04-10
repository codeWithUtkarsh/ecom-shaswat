import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';

const router = Router();

/**
 * GET /api/banners
 * Active hero banners sorted by display order.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await req.supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { banners: data });
  } catch (err) {
    next(err);
  }
});

export default router;
