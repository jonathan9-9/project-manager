import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: DatabaseService) {}

  addStatusToProject(project: Project) {
    return project;
  }

  async getUserProjects(id: number): Promise<Project[]> {
    try {
      // note to self: userId in the where clause is a foreign key (Fk) defined in the prisma schema
      const projects: Project[] = await this.prisma.project.findMany({
        where: { userId: id },
        // get relations: retrieve a record and include related records
        include: {
          features: {
            include: {
              userStories: {
                include: {
                  tasks: true,
                },
              },
            },
          },
        },
        orderBy: { id: 'desc' },
      });

      return projects.map((project) => {
        return this.addStatusToProject(project);
      });
    } catch (error) {
      throw new Error(`Error fetching user projects: ${error.message}`);
    }
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        features: {
          include: {
            userStories: {
              include: {
                tasks: true,
              },
            },
          },
        },
      },
    });
    return this.addStatusToProject(project);
  }

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
