import { Injectable } from '@nestjs/common';
import { Feature } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FeaturesService {
  constructor(private readonly prisma: DatabaseService) {}

  async getProjectFeatures(id: number): Promise<Feature[]> {
    try {
      const features = await this.prisma.feature.findMany({
        where: { projectId: id },
      });
      return features;
    } catch (error) {
      throw new Error(`Error fetching user projects: ${error.message}`);
    }
  }

  async createFeature(
    name: string,
    description: string,
    projectId: number,
  ): Promise<Feature[]> {
    try {
      await this.prisma.feature.create({
        data: {
          name: name,
          description: description,
          projectId: projectId,
        },
      });

      return await this.getProjectFeatures(projectId);
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }
}
