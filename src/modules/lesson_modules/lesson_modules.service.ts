import { Injectable } from '@nestjs/common';
import { CreateLessonModuleDto } from './dto/create-lesson_module.dto';
import { UpdateLessonModuleDto } from './dto/update-lesson_module.dto';

@Injectable()
export class LessonModulesService {
  create(createLessonModuleDto: CreateLessonModuleDto) {
    return 'This action adds a new lessonModule';
  }

  findAll() {
    return `This action returns all lessonModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonModule`;
  }

  update(id: number, updateLessonModuleDto: UpdateLessonModuleDto) {
    return `This action updates a #${id} lessonModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonModule`;
  }
}
