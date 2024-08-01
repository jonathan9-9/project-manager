import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: DatabaseService) {}

  async getTasks(id: number): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: { userStoryId: id },
      });
      return tasks;
    } catch (error) {
      throw new Error(`Error fetching user tasks: ${error.message}`);
    }
  }

  async createTask(name: string, userStoryId: number): Promise<Task[]> {
    try {
      await this.prisma.task.create({
        data: {
          name: name,
          userStoryId: userStoryId,
        },
      });

      return await this.getTasks(userStoryId);
    } catch (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }
  }
  async updateTask(
    field: string,
    value: string,
    userId: number,
    taskId: number,
  ) {
    try {
      const taskToUpdate = await this.prisma.task.findUniqueOrThrow({
        where: {
          id: taskId,
        },
        include: {
          userStory: {
            include: {
              feature: {
                include: {
                  project: true,
                },
              },
            },
          },
        },
      });

      if (taskToUpdate.userStory.feature.project.userId !== userId) {
        throw new Error('You do not have access to this task');
      }

      await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: { [field]: value },
        include: {
          userStory: {
            include: {
              feature: {
                include: {
                  project: true,
                },
              },
            },
          },
        },
      });

      return taskToUpdate.userStory.feature.project.id;
    } catch (error) {
      console.error(`Error updating tasks ${error.message}`);
    }
  }
}
