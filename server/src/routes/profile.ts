import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';

const router = Router();

/**
 * GET /api/profile
 * Current user's profile.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data: profile, error } = await req.supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user!.id)
      .single();

    if (error || !profile) return jsonError(res, 'Profile not found', 404);

    return jsonOk(res, { profile });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/profile
 * Update profile fields (whitelisted).
 */
router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allowedFields = ['full_name', 'phone', 'avatar_url'];
    const updates: Record<string, string> = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return jsonError(res, 'No valid fields to update', 400);
    }

    const { data: profile, error } = await req.supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.user!.id)
      .select()
      .single();

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { profile });
  } catch (err) {
    next(err);
  }
});

export default router;
