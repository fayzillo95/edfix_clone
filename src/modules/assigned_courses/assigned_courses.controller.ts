import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssignedCoursesService } from './assigned_courses.service';
import { CreateAssignedCourseDto } from './dto/create-assigned_course.dto';
import { UpdateAssignedCourseDto } from './dto/update-assigned_course.dto';

@Controller('assigned-courses')
export class AssignedCoursesController {
  constructor(
    private readonly assignedCoursesService: AssignedCoursesService,
  ) {}

  @Post()
  create(@Body() createAssignedCourseDto: CreateAssignedCourseDto) {
    return this.assignedCoursesService.create(createAssignedCourseDto);
  }

  @Get()
  findAll() {
    return this.assignedCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignedCoursesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignedCourseDto: UpdateAssignedCourseDto,
  ) {
    return this.assignedCoursesService.update(+id, updateAssignedCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignedCoursesService.remove(+id);
  }
}
