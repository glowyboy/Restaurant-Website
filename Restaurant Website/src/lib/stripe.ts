import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  console.warn('Stripe public key not found. Add VITE_STRIPE_PUBLIC_KEY to your .env file');
}

export const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;
