import { Router } from 'express';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/health', healthRoutes);

// Add more routes here as the application grows
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

export default router;

