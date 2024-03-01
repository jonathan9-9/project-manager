import { Injectable } from '@nestjs/common';
// import { Feature } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FeaturesService {
  constructor(private readonly prisma: DatabaseService) {}
}
