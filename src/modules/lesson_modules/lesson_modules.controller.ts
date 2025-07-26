import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonModulesService } from './lesson_modules.service';
import { CreateLessonModuleDto } from './dto/create-lesson_module.dto';
import { UpdateLessonModuleDto } from './dto/update-lesson_module.dto';

@Controller('lesson-modules')
export class LessonModulesController {
  constructor(private readonly lessonModulesService: LessonModulesService) {}

  @Post()
  create(@Body() createLessonModuleDto: CreateLessonModuleDto) {
    return this.lessonModulesService.create(createLessonModuleDto);
  }

  @Get()
  findAll() {
    return this.lessonModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonModulesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLessonModuleDto: UpdateLessonModuleDto,
  ) {
    return this.lessonModulesService.update(+id, updateLessonModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonModulesService.remove(+id);
  }
}
