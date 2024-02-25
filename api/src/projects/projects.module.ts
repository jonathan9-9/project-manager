import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProjectsService } from './projects.service';

@Module({
  imports: [],
  providers: [DatabaseService, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
