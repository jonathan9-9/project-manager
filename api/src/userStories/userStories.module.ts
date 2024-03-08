import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserStoriesService } from './userStories.service';

@Module({
  imports: [],
  providers: [DatabaseService, UserStoriesService],
  exports: [UserStoriesService],
})
export class UserStoriesModule {}
