import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';

const router = Router();

/**
 * GET /api/promos
 * Active promotional banners sorted by display order.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await req.supabase
      .from('promo_banners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { promos: data });
  } catch (err) {
    next(err);
  }
});

export default router;
