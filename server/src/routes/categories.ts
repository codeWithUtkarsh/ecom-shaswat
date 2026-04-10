import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';
import { parsePageParams, parseSortParams } from '../helpers/pagination';

const router = Router();

/**
 * GET /api/categories
 * All categories sorted by display order.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await req.supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { categories: data });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/categories/:slug
 * Single category with paginated products.
 */
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const { page, limit, offset } = parsePageParams(req);
    const { field, ascending } = parseSortParams(req, [
      'price', 'rating', 'created_at', 'name',
    ]);

    const { data: category, error: catError } = await req.supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (catError || !category) return jsonError(res, 'Category not found', 404);

    const { data: products, error: prodError, count } = await req.supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('category', slug)
      .order(field, { ascending })
      .range(offset, offset + limit - 1);

    if (prodError) return jsonError(res, prodError.message, 500);

    return jsonOk(res, {
      category,
      products: products ?? [],
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
