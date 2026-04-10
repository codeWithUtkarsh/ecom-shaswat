import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';

const router = Router();

/**
 * GET /api/cart
 * User's cart items with product details.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await req.supabase
      .from('cart_items')
      .select('id, quantity, created_at, product:products(*)')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { items: data });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/cart
 * Add a product to the cart or increment quantity if it already exists.
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    if (!product_id) return jsonError(res, 'product_id is required', 400);
    if (quantity < 1) return jsonError(res, 'quantity must be at least 1', 400);

    // Check if item already exists
    const { data: existing } = await req.supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', req.user!.id)
      .eq('product_id', product_id)
      .single();

    if (existing) {
      const { data, error } = await req.supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select('id, quantity, product:products(*)')
        .single();

      if (error) return jsonError(res, error.message, 500);
      return jsonOk(res, { item: data });
    }

    const { data, error } = await req.supabase
      .from('cart_items')
      .insert({ user_id: req.user!.id, product_id, quantity })
      .select('id, quantity, product:products(*)')
      .single();

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { item: data }, 201);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/cart
 * Clear all items from the cart.
 */
router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = await req.supabase
      .from('cart_items')
      .delete()
      .eq('user_id', req.user!.id);

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { message: 'Cart cleared' });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/cart/:id
 * Update quantity of a specific cart item.
 */
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return jsonError(res, 'quantity must be a positive number', 400);
    }

    const { data, error } = await req.supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id)
      .eq('user_id', req.user!.id)
      .select('id, quantity, product:products(*)')
      .single();

    if (error) return jsonError(res, 'Cart item not found', 404);

    return jsonOk(res, { item: data });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/cart/:id
 * Remove a specific item from the cart.
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { error } = await req.supabase
      .from('cart_items')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user!.id);

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { message: 'Item removed' });
  } catch (err) {
    next(err);
  }
});

export default router;
