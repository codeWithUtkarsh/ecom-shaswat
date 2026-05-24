function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  PORT: parseInt(process.env.PORT || '4000', 10),
  SUPABASE_URL: required('SUPABASE_URL'),
  SUPABASE_ANON_KEY: required('SUPABASE_ANON_KEY'),
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN || '',
  POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET || '',
  POLAR_PRODUCT_ID: process.env.POLAR_PRODUCT_ID || '',
  POLAR_SERVER: (process.env.POLAR_SERVER as 'production' | 'sandbox') || 'sandbox',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  FROM_EMAIL: process.env.FROM_EMAIL || 'onboarding@resend.dev',
  SALES_EMAIL: process.env.SALES_EMAIL || '',
  ADMIN_EMAILS: process.env.ADMIN_EMAILS || '',
};
