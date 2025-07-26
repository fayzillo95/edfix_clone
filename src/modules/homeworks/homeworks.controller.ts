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
} from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
// import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { homeworkFilesStorage } from 'src/core/types/upload_types';
import { homeworkFIleApiBody } from 'src/core/types/api.body.types';

@Controller('homeworks')
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) { }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody(homeworkFIleApiBody)
  @UseInterceptors(FilesInterceptor("files", 10, homeworkFilesStorage))
  create(
    // @Body() createHomeworkDto: CreateHomeworkDto
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return files || "return"
    // return this.homeworksService.create();
  }

  @Get()
  findAll() {
    return this.homeworksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ) {
    return this.homeworksService.update(+id, updateHomeworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeworksService.remove(+id);
  }
}
