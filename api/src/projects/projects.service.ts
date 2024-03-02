import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: DatabaseService) {}

  async getUserProjects(id: number): Promise<Project[]> {
    try {
      // note to self: userId in the where clause is a foreign key (Fk) defined in the prisma schema
      const projects = await this.prisma.project.findMany({
        where: { userId: id },
        // get relations: retrieve a record and include related records
        include: {
          features: true,
        },
      });

      return projects;
    } catch (error) {
      throw new Error(`Error fetching user projects: ${error.message}`);
    }
  }

  // async getProject(id: number, userId: number): Promise<Project> {
  //   try {
  //     const project = await this.prisma.project.findFirst({
  //       where: {
  //         userId: userId,
  //         id: id,
  //       },
  //     });
  //     console.log('Specific user project', project);
  //     return project;
  //   } catch (error) {
  //     throw new Error(`Error fetching user's single project: ${error.message}`);
  //   }
  // }

  async createProject(
    name: string,
    description: string,
    userId: number,
  ): Promise<Project[]> {
    try {
      await this.prisma.project.create({
        data: {
          name: name,
          description: description,
          userId: userId,
        },
      });

      // After creating the project, fetch and return the user's projects
      return await this.getUserProjects(userId);
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }
}
