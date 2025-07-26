import { Injectable } from '@nestjs/common';
import { CreateAssignedCourseDto } from './dto/create-assigned_course.dto';
import { UpdateAssignedCourseDto } from './dto/update-assigned_course.dto';

@Injectable()
export class AssignedCoursesService {
  create(createAssignedCourseDto: CreateAssignedCourseDto) {
    return 'This action adds a new assignedCourse';
  }

  findAll() {
    return `This action returns all assignedCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignedCourse`;
  }

  update(id: number, updateAssignedCourseDto: UpdateAssignedCourseDto) {
    return `This action updates a #${id} assignedCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignedCourse`;
  }
}
