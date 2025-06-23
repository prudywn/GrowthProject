import { Request, Response, NextFunction } from 'express';
import * as managementService from '../../services/management.service';

function getResource(req: Request): string {
  const resource = req.path.split('/')[1];
  return resource.replace('-', '_'); // e.g., 'team-members' -> 'team_members'
}

export async function createItem(req: Request, res: Response, next: NextFunction) {
  try {
    const resource = getResource(req);
    const item = await managementService.manageResource(resource, 'create', undefined, req.body);
    res.status(201).json(item);
  } catch (error) { next(error); }
}

export async function updateItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const resource = getResource(req);
    const item = await managementService.manageResource(resource, 'update', id, req.body);
    res.json(item);
  } catch (error) { next(error); }
}

export async function deleteItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const resource = getResource(req);
    await managementService.manageResource(resource, 'delete', id);
    res.status(204).send();
  } catch (error) { next(error); }
}

export async function updateStatic(req: Request, res: Response, next: NextFunction) {
    try {
        const resource = getResource(req) as 'homepage_content' | 'about_page_content';
        const content = await managementService.updateStaticContent(resource, req.body);
        res.json(content);
    } catch(error) { next(error); }
} 