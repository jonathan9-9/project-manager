import { Injectable } from '@nestjs/common';
import { UserStory } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserStoriesService {
  constructor(private readonly prisma: DatabaseService) {}

  async getFeatureUserStories(id: number): Promise<UserStory[]> {
    try {
      const userStories = await this.prisma.userStory.findMany({
        where: { featureId: id },
      });
      return userStories;
    } catch (error) {
      throw new Error(`Error fetching user projects: ${error.message}`);
    }
  }

  async createUserStory(name: string, description: string, featureId: number) {
    try {
      await this.prisma.userStory.create({
        data: {
          name: name,
          description: description,
          featureId: featureId,
        },
      });

      return await this.getFeatureUserStories(featureId);
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }

  async getUserStoryStatusById(id: number) {
    const userStory = await this.prisma.userStory.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: true,
      },
    });
    const tasks = userStory.tasks;

    const taskCount = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'Done');
    const numCompletedTasks = completedTasks.length;

    return `${numCompletedTasks}/${taskCount}`;
  }
}
