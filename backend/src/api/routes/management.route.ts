import { Router } from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { createItem, updateItem, deleteItem, updateStatic } from '../controllers/management.controller';

const router = Router();
router.use(protectRoute); // Protect all routes in this file

// Dynamic routes for simple resources
const simpleResources = ['team-members', 'testimonials', 'trusted-clients', 'authors'];
simpleResources.forEach(resource => {
  router.route(`/${resource}`)
    .post(createItem);
  router.route(`/${resource}/:id`)
    .put(updateItem)
    .delete(deleteItem);
});

// Routes for static content
router.put('/homepage-content', updateStatic);
router.put('/about-page-content', updateStatic);

export default router; 