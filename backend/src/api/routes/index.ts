import { Router } from 'express';
import pageContentRoutes from './pageContent.route';
import courseRoutes from './course.route';
import articleRoutes from './article.route';
import contactRoutes from './contact.route';
import clientDataRoutes from './clientData.route';
import analyticsRoutes from './analytics.route';
import authRoutes from './auth.route';
import managementRoutes from './management.route';

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

// Protected Admin/Management Routes
router.use('/manage', managementRoutes);

export default router; 