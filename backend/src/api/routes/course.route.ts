import { Router } from 'express';
import { 
  getAllCourses, 
  getSingleCourse,
  createNewCourse,
  updateExistingCourse,
  deleteSingleCourse
} from '../controllers/course.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = Router();

// Public routes - anyone can read
router.get('/', getAllCourses);
router.get('/:id', getSingleCourse);

// Protected routes - only authenticated admins can write
router.post('/', protectRoute, createNewCourse);
router.put('/:id', protectRoute, updateExistingCourse);
router.delete('/:id', protectRoute, deleteSingleCourse);

export default router; 