import { HttpException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { urlGenerator } from 'src/core/types/generator.types';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { checAlreadykExistsResurs, checkExistsResurs } from 'src/core/types/check.functions.types';
import { ModelsEnumInPrisma } from 'src/core/types/global.types';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) { }
  async create(data: CreateCourseDto, banner?: string, introVideo?: string) {
    await checAlreadykExistsResurs(this.prisma, ModelsEnumInPrisma.COURSES, "name", data.name)
    await checkExistsResurs(this.prisma, ModelsEnumInPrisma.MENTOR_PROFILES, "id", data.mentorId)
    await checkExistsResurs(this.prisma, ModelsEnumInPrisma.COURSE_CATEGORIES, "id", data.categoryId)
    if (introVideo) {
      data['introVideo'] = urlGenerator(this.config, "intro", introVideo)
    }
    if (banner) {
      data['banner'] = urlGenerator(this.config, "banner", banner)
    }
    let result = {}
    try {
      result = await this.prisma.course.create({ data: { ...data } })
      return {
        message: 'This action adds a new course',
        data: result
      };
    } catch (error) {

    }
  }

  async findAll() {
    try {
      const courses = await this.prisma.course.findMany()
      return {
        message: `This action returns all courses`,
        data: courses
      };
    } catch (error) {
      console.log(error)
      throw new HttpException("Courses read filed ", 500)
    }
  }

  async findOne(id: number) {
    const result = await checkExistsResurs(this.prisma, ModelsEnumInPrisma.COURSES, "id", id)
    return {
      message: `This action returns a #${id} course`,
      data: result
    };
  }

  async update(id: string, data: UpdateCourseDto, banner?: string | undefined, introVideo?: string | undefined) {
    await checkExistsResurs(this.prisma, ModelsEnumInPrisma.COURSES, "id", id)
    try {
      if (banner) {
        data['banner'] = urlGenerator(this.config, "banner", banner)
      }
      if (introVideo) {
        data['introVideo'] = urlGenerator(this.config, "intro", introVideo)
      }
      return {
        message: `This action updates a #${id} course`,
        data: await this.prisma.course.update({
          where: { id: id },
          data: data
        })
      };
    } catch (error) {
      console.log(error)
      throw new HttpException("Course update filed ", 500)
    }
  }

  async remove(id: string) {
    await checkExistsResurs(this.prisma, ModelsEnumInPrisma.COURSES, "id", id)
    try {
      return {
        message : `This action removes a #${id} course`,
        data : await this.prisma.course.delete({where : {id : id}})
      };
    } catch (error) {
      console.log(error)
      throw new HttpException("Course update filed ", 500)
    }
  }
}
