import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

export interface ProjectProps {
  id: number;
  name: string;
  description: string;
  userId: number;
  features: Feature[];
}

export interface Feature {
  id: number;
  name: string;
  userStories: UserStory[];
}

export interface UserStory {
  id: number;
  tasks: Task[];
}

export interface Task {
  id: number;
  status: string;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: DatabaseService) {}

  addStatusToProject(project: ProjectProps) {
    // featureCount: total number of features to be completed
    const featureCount = project.features.length;
    let completedFeatures = 0;
    let projectStarted = false;

    project.features.forEach((feature) => {
      feature['userStoryCount'] = feature.userStories.length;
      feature['completedUserStories'] = 0;
      let featureStarted = false;

      const userStories = feature.userStories;

      userStories.forEach((story) => {
        story['taskCount'] = story.tasks.length;

        const inProgressTasks = story.tasks.filter(
          (task) => task.status === 'In Progress',
        ).length;
        const completedTasks = story.tasks.filter(
          (task) => task.status === 'Done',
        ).length;
        story['completedTasks'] = completedTasks;

        if (completedTasks > 0 || inProgressTasks > 0) {
          featureStarted = true;
          projectStarted = true;
        }

        if (story['taskCount'] === completedTasks) {
          feature['completedUserStories']++;
        }
      });
      if (!featureStarted) {
        feature['status'] = 'To Do';
      } else if (
        feature['userStoryCount'] === feature['completedUserStories']
      ) {
        feature['status'] = 'Done';
        completedFeatures++;
      } else {
        feature['status'] = 'In Progress';
      }
    });

    if (!projectStarted) {
      project['status'] = 'To Do';
    } else if (featureCount === completedFeatures) {
      project['status'] = 'Done';
    } else {
      project['status'] = 'In Progress';
    }

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

      return projects.map((project: ProjectProps) => {
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
