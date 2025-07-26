import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  userImageStorage,
} from 'src/core/types/upload_types';


import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { userApiBody } from 'src/core/types/api.body.types';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("create")
  @ApiConsumes('multipart/form-data')
  @ApiBody(userApiBody)
  @UseInterceptors(FileInterceptor('image', userImageStorage))
  create(
    @Body() data: CreateUserDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
      return image ? this.usersService.create(data,image.filename) 
      : this.usersService.create(data)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor("image",userImageStorage))
  update(
    @Param('id') id: string, @Body() data: UpdateUserDto,
    @UploadedFile() image? : Express.Multer.File
  ) {
    return image ? this.usersService.update(id, data,image.filename) 
      : this.usersService.update(id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
