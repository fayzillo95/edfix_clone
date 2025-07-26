import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonVideoController } from './video.controller';

@Module({
  controllers: [LessonsController,LessonVideoController],
  providers: [LessonsService],
})
export class LessonsModule {}
