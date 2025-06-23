import { Request, Response } from 'express';
import * as clientDataService from '../../services/clientData.service';

export async function getAllTestimonials(_req: Request, res: Response) {
  const data = await clientDataService.getTestimonials();
  res.json(data);
}

export async function getAllTrustedClients(_req: Request, res: Response) {
  const data = await clientDataService.getTrustedClients();
  res.json(data);
} 