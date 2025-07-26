import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MentorProfilesService } from './mentor_profiles.service';
import { CreateMentorProfileDto } from './dto/create-mentor_profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor_profile.dto';

@Controller('mentor-profiles')
export class MentorProfilesController {
  constructor(private readonly mentorProfilesService: MentorProfilesService) {}

  @Post("create")
  create(@Body() data: CreateMentorProfileDto) {
    return this.mentorProfilesService.create(data);
  }

  @Get("getall")
  findAll() {
    return this.mentorProfilesService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string) {
    return this.mentorProfilesService.findOne(id);
  }

  @Patch('update-one/:id')
  update(
    @Param('id') id: string,
    @Body() updateMentorProfileDto: UpdateMentorProfileDto,
  ) {
    return this.mentorProfilesService.update(id, updateMentorProfileDto);
  }

  @Delete('delete-one/:id')
  remove(@Param('id') id: string) {
    return this.mentorProfilesService.remove(id);
  }
}
