import { Router } from 'express';
import { ApiResponse } from '../utils/index.js';

const router = Router();

router.get('/', (_req, res) => {
  ApiResponse.success(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

router.get('/live', (_req, res) => {
  res.status(200).send('OK');
});

router.get('/ready', (_req, res) => {
  // Add database/service checks here
  res.status(200).send('OK');
});

export default router;

