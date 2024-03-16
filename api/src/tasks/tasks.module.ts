import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [],
  providers: [DatabaseService, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
