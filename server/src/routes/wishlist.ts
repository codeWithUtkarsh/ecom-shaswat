import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';

const router = Router();

/**
 * GET /api/wishlist
 * User's wishlist with product details.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await req.supabase
      .from('wishlist')
      .select('id, created_at, product:products(*)')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { items: data });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/wishlist
 * Add a product to the wishlist.
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product_id } = req.body;

    if (!product_id) return jsonError(res, 'product_id is required', 400);

    const { data, error } = await req.supabase
      .from('wishlist')
      .insert({ user_id: req.user!.id, product_id })
      .select('id, created_at, product:products(*)')
      .single();

    if (error) {
      if (error.code === '23505') {
        return jsonError(res, 'Product already in wishlist', 409);
      }
      return jsonError(res, error.message, 500);
    }

    return jsonOk(res, { item: data }, 201);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/wishlist/:id
 * Remove an item from the wishlist.
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { error } = await req.supabase
      .from('wishlist')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user!.id);

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { message: 'Removed from wishlist' });
  } catch (err) {
    next(err);
  }
});

export default router;
