import { Router, Request, Response } from 'express';

const router = Router();

/**
 * POST /api/webhooks/stripe
 * Placeholder for Stripe webhook handling.
 * This route receives raw body (configured in app.ts).
 */
router.post('/stripe', (req: Request, res: Response) => {
  // TODO: Implement Stripe webhook verification and handling
  // const sig = req.headers['stripe-signature'];
  // const event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  //
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     // Update order status to 'paid'
  //     break;
  //   case 'checkout.session.completed':
  //     // Fulfill order
  //     break;
  // }

  res.status(200).json({ received: true });
});

export default router;
