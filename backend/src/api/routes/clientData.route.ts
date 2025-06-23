import { Router } from 'express';
import { getAllTestimonials, getAllTrustedClients } from '../controllers/clientData.controller';

const router = Router();

router.get('/testimonials', getAllTestimonials);
router.get('/trusted-clients', getAllTrustedClients);

export default router; 