import { HttpException, Injectable } from '@nestjs/common';
import { CreateLessonFileDto } from './dto/create-lesson_file.dto';
import { UpdateLessonFileDto } from './dto/update-lesson_file.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { urlGenerator } from 'src/common/types/generator.types';
import { checkExistsResurs } from 'src/common/types/check.functions.types';
import { ModelsEnumInPrisma } from 'src/common/types/global.types';

@Injectable()
export class LessonFilesService {
  constructor(
    private readonly prisma: PrismaService,
    private config: ConfigService
  ) { }

  async create(data: CreateLessonFileDto, fileName?: string | undefined) {
    await checkExistsResurs(this.prisma, ModelsEnumInPrisma.LESSONS, "id", data.lessonId)
    try {
      if (fileName) {
        data['file'] = urlGenerator(this.config, fileName)
      }
      return {
        message: 'This action adds a new lessonFile',
        data: await this.prisma.lessonFile.create({ data: { ...data } })
      };
    } catch (error) {
      console.log(error)
      throw new HttpException("LessonFile column create filed", 500)
    }
  }

  async findAll() {
    try {
      return {
        message: `This action returns all lessonFiles`,
        data: await this.prisma.lessonFile.findMany()
      };
    } catch (error) {
      console.log(error)
      throw new HttpException("LessonFiles read all filed ", 500)
    }
  }

  async findOne(id: string) {
    return {
      message: `This action returns a #${id} lessonFile`,
      data: await checkExistsResurs(this.prisma, ModelsEnumInPrisma.LESSON_FILES, "id", id)
    };
  }

  async update(id: string, data: UpdateLessonFileDto, fileName?: string | undefined) {
    await checkExistsResurs(this.prisma, ModelsEnumInPrisma.LESSON_FILES, "id", id)
    try {
      if (fileName) {
        data['file'] = urlGenerator(this.config, fileName)
      }
      return {
        message: `This action updates a #${id} lessonFile`,
        data: await this.prisma.lessonFile.update({
          where: { id: id },
          data: { ...data }
        })
      };
    } catch (error) {
      console.log(error)
      throw new HttpException("LessonFile update filed ", 500)
    }
  }

  async remove(id: string) {
    await checkExistsResurs(this.prisma, ModelsEnumInPrisma.LESSON_FILES, "id", id)
    try {
      return {
        message: `This action removes a #${id} lessonFile`,
        data: await this.prisma.lessonFile.delete({ where: { id: id } })
      };
    } catch (error) {
      console.log(error)
      throw new HttpException("Lessofile delete filed", 500)
    }
  }
}
