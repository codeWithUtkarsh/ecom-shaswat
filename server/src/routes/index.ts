import { Router, Request, Response, NextFunction } from 'express';
import { createAnonClient } from '../lib/supabase';
import { requireAuth } from '../middleware/auth';

import productsRouter from './products';
import categoriesRouter from './categories';
import searchRouter from './search';
import bannersRouter from './banners';
import promosRouter from './promos';
import cartRouter from './cart';
import ordersRouter from './orders';
import profileRouter from './profile';
import wishlistRouter from './wishlist';
import webhooksRouter from './webhooks';

const router = Router();

// Attach anon Supabase client for public routes
function attachAnonClient(req: Request, _res: Response, next: NextFunction) {
  req.supabase = createAnonClient();
  next();
}

// Public routes
router.use('/products', attachAnonClient, productsRouter);
router.use('/categories', attachAnonClient, categoriesRouter);
router.use('/search', attachAnonClient, searchRouter);
router.use('/banners', attachAnonClient, bannersRouter);
router.use('/promos', attachAnonClient, promosRouter);

// Protected routes (auth middleware attaches user + scoped supabase client)
router.use('/cart', requireAuth, cartRouter);
router.use('/orders', requireAuth, ordersRouter);
router.use('/profile', requireAuth, profileRouter);
router.use('/wishlist', requireAuth, wishlistRouter);

// Webhooks (no auth — verified via Stripe signature)
router.use('/webhooks', webhooksRouter);

export default router;
