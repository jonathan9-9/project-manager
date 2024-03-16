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
}
