import { AcademicYear } from '@prisma/client';
import { singleton } from 'tsyringe';
import { PrismaAcademicYearRepository } from '../repositories/prisma/PrismaAcademicYearRepository';

@singleton()
export class GetAcademicYearByUserIdService {
  constructor(private academicYearRepository: PrismaAcademicYearRepository) {}

  async execute(userId: string): Promise<Partial<AcademicYear>[]> {
    const academicYears = await this.academicYearRepository.getByUserId(userId);

    return academicYears.map(value => ({
      id: value.id,
      year: value.year,
      startDate: value.start_date.toISOString().split('T')[0],
      endDate: value.end_date.toISOString().split('T')[0],
    }));
  }
}
