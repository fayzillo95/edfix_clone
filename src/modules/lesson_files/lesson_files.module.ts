import { Module } from '@nestjs/common';
import { LessonFilesService } from './lesson_files.service';
import { LessonFileStreamController } from './files.controller';
import {LeesonFilesController} from './lesson_files.controller'
@Module({
  controllers: [LessonFileStreamController,LeesonFilesController],
  providers: [LessonFilesService],
})
export class LessonFilesModule {}
