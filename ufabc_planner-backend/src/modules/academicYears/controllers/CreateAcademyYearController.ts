import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAcademicYearService } from '../services/CreateAcademicYearService';

export class CreateAcademyYearController {
  async handle(request: Request, response: Response) {
    const { userId, year, startDate, endDate } = request.body;

    const createAcademicYearService = container.resolve(CreateAcademicYearService);

    await createAcademicYearService.execute({ userId, year, startDate, endDate });

    return response.status(201).send();
  }
}
