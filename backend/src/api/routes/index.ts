import { Router } from 'express';
import pageContentRoutes from './pageContent.route';
import courseRoutes from './course.route';
import articleRoutes from './article.route';
import contactRoutes from './contact.route';
import clientDataRoutes from './clientData.route';
import analyticsRoutes from './analytics.route';
import authRoutes from './auth.route';
import webhookRoutes from './webhook.route';
import aiRoutes from './ai.route';

const router = Router();

// Auth routes are public
router.use('/auth', authRoutes);

// Public Content Routes
router.use('/page-content', pageContentRoutes);
router.use('/courses', courseRoutes);
router.use('/articles', articleRoutes);
router.use('/client-data', clientDataRoutes);

// User Interaction Routes
router.use('/contact', contactRoutes);
router.use('/analytics', analyticsRoutes);

// Webhook routes
router.use('/webhooks', webhookRoutes);

// AI routes
router.use('/ai', aiRoutes);

export default router; 