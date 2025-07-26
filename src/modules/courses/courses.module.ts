import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { IntroVideoController } from './intro.controller';

@Module({
  controllers: [CoursesController,IntroVideoController],
  providers: [CoursesService],
})
export class CoursesModule {}
