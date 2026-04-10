import 'dotenv/config';
import app from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`[server] Vyapaar Global API running on http://localhost:${env.PORT}`);
  console.log(`[server] Health check: http://localhost:${env.PORT}/health`);
});
