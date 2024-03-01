import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FeaturesService } from './features.service';

@Module({
  imports: [],
  providers: [DatabaseService, FeaturesService],
  exports: [FeaturesService],
})
export class FeaturesModule {}
