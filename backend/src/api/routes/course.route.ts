import { Router } from 'express';
import * as courseController from '../controllers/course.controller';

const router = Router();

// Public routes - anyone can read
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);

export default router; 