import { Request, Response, NextFunction } from 'express';
import * as courseService from '../../services/course.service';
import { z } from 'zod';

const courseSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  category: z.enum(['main', 'specialty', 'video_single', 'video_series']),
  video_url: z.string().url().optional(),
});

export async function getAllCourses(req: Request, res: Response, next: NextFunction) {
  try {
    const category = req.query.category as string | undefined;
    const courses = await courseService.getCourses(category);
    res.json(courses);
  } catch (error) {
    next(error);
  }
}

export async function getCourse(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
}

export async function createNewCourse(req: Request, res: Response) {
  const validatedData = courseSchema.parse(req.body);
  const course = await courseService.createCourse(validatedData);
  res.status(201).json(course);
}

export async function updateExistingCourse(req: Request, res: Response) {
  const { id } = req.params;
  // For updates, all fields are optional
  const validatedData = courseSchema.partial().parse(req.body);
  const course = await courseService.updateCourse(id, validatedData);
  res.json(course);
}

export async function deleteSingleCourse(req: Request, res: Response) {
  const { id } = req.params;
  await courseService.deleteCourse(id);
  res.status(204).send();
} 