import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';
import { parsePageParams, parseSortParams } from '../helpers/pagination';

const router = Router();

/**
 * GET /api/products
 * List products with pagination, filtering, and sorting.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, offset } = parsePageParams(req);
    const { field, ascending } = parseSortParams(req, [
      'price', 'rating', 'created_at', 'name', 'discount',
    ]);

    let query = req.supabase
      .from('products')
      .select('*', { count: 'exact' });

    // Filters
    const category = req.query.category as string;
    if (category) query = query.eq('category', category);

    const badge = req.query.badge as string;
    if (badge) query = query.eq('badge', badge);

    const inStock = req.query.in_stock as string;
    if (inStock === 'true') query = query.eq('in_stock', true);
    if (inStock === 'false') query = query.eq('in_stock', false);

    const minPrice = req.query.min_price as string;
    if (minPrice) query = query.gte('price', parseFloat(minPrice));

    const maxPrice = req.query.max_price as string;
    if (maxPrice) query = query.lte('price', parseFloat(maxPrice));

    query = query
      .order(field, { ascending })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, {
      products: data,
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

/**
 * GET /api/products/:id
 * Single product with related products from the same category.
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await req.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !product) return jsonError(res, 'Product not found', 404);

    const { data: related } = await req.supabase
      .from('products')
      .select('*')
      .eq('category', product.category)
      .neq('id', id)
      .limit(5);

    return jsonOk(res, {
      product,
      relatedProducts: related ?? [],
    });
  } catch (err) {
    next(err);
  }
});

export default router;
