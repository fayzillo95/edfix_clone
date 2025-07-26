import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadGatewayException,
  HttpException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { courseStorage, courseApiBody, courseFileFields } from 'src/core/types/upload_types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post("create-one")
  @ApiConsumes("multipart/form-data")
  @ApiBody(courseApiBody)
  @UseInterceptors(FileFieldsInterceptor(courseFileFields, courseStorage))
  createCourse(
    @Body() data: CreateCourseDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    try {
      let banner = "null"
      let introVideo = "null"
      if (files['banner']) {
        banner = files['banner'][0].filename
      }
      if (files['introVideo']) {
        console.log(files['introVideo'])
        introVideo = files['introVideo'][0].filename
      }
      return this.coursesService.create(data, banner, introVideo)
    } catch (error) {
      throw new BadGatewayException("Invalid fields name files")
    }
  }

  @Get("getall")
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch('update-one/:id')
  @ApiConsumes("multipart/form-data")
  @ApiBody(courseApiBody)
  @UseInterceptors(FileFieldsInterceptor(courseFileFields, courseStorage))
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    try {
      let banner : string | undefined = undefined
      let introVideo : string | undefined = undefined
      if (files['banner']) {
        banner = files['banner'][0].filename
      }
      if (files['introVideo']) {
        console.log(files['introVideo'])
        introVideo = files['introVideo'][0].filename
      }
      return this.coursesService.update(id, updateCourseDto,banner,introVideo);
    } catch (error) {
      console.log(error)
      throw new HttpException("Course update filed ", 500)    
    }
  }

  @Delete('delte-one/:id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
/*
{
  "banner": [
    {
      "fieldname": "banner",
      "originalname": "bot_image_.jpg",
      "encoding": "7bit",
      "mimetype": "image/jpeg",
      "destination": "/home/fayzillo/Desktop/New Folder/imtihon/src/core/uploads/banners",
      "filename": "1753516437137-bot_image_.jpg",
      "path": "/home/fayzillo/Desktop/New Folder/imtihon/src/core/uploads/banners/1753516437137-bot_image_.jpg",
      "size": 12311
    }
  ],
  "introVideo": [
    {
      "fieldname": "introVideo",
      "originalname": "resized_640x360.png",
      "encoding": "7bit",
      "mimetype": "image/png",
      "destination": "/home/fayzillo/Desktop/New Folder/imtihon/src/core/uploads/intro_videos",
      "filename": "1753516437144-resized_640x360.png",
      "path": "/home/fayzillo/Desktop/New Folder/imtihon/src/core/uploads/intro_videos/1753516437144-resized_640x360.png",
      "size": 148346
    }
  ]
}*/