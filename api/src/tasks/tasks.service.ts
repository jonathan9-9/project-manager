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
  async updateTask(field: string, value: string, taskId: number) {
    try {
      // const taskToUpdate = await this.prisma.task.findUnique({
      //   where: {
      //     id: taskId,
      //   },
      // });
      // if (!taskToUpdate) {
      //   throw new Error('Task not found');
      // }

      const updatedTask = await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          [field]: value,
        },
      });
      console.log('updated task', updatedTask);
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }
}
