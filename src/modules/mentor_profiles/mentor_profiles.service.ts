import { HttpException, Injectable } from '@nestjs/common';
import { CreateMentorProfileDto } from './dto/create-mentor_profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor_profile.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { checAlreadykExistsResurs, checkExistsResurs } from 'src/core/types/check.functions.types';
import { ModelsEnumInPrisma } from 'src/core/types/global.types';

@Injectable()
export class MentorProfilesService {

  constructor(
    private readonly prisma : PrismaService,
    private readonly config : ConfigService
  ){}

  async create(data: CreateMentorProfileDto) {
    await checAlreadykExistsResurs(this.prisma,ModelsEnumInPrisma.MENTOR_PROFILES,"userId",data.userId)
    await checkExistsResurs(this.prisma,ModelsEnumInPrisma.USERS,"id",data.userId)
    const newMentorProfile = await this.prisma.mentorProfile.create({
      data : {...data}
    })  
    return {
      message : 'This action adds a new mentorProfile',
      data : newMentorProfile
    };
  }

  async findAll() {
    const mentorProfiles = await this.prisma.mentorProfile.findMany()
    return {
      message  : `This action returns all mentorProfiles`,
      data : mentorProfiles
    };
  }

  async findOne(id: string) {
    return {
      message : `This action returns a #${id} mentorProfile`,
      data : await checkExistsResurs(this.prisma,ModelsEnumInPrisma.MENTOR_PROFILES,"id",id)
    };
  }

  async update(id: string, updateMentorProfileDto: UpdateMentorProfileDto) {
    await checkExistsResurs(this.prisma,ModelsEnumInPrisma.MENTOR_PROFILES,"id",id)
    try {
      const result =  await this.prisma.mentorProfile.update({
        where : {id:id},
        data : updateMentorProfileDto
      })
      return {
        message : `This action updates a #${id} mentorProfile`,
        data : result
      };
    } catch (error) {
      console.log(error)
      throw new HttpException("MentorPrfile updated filed !",500)
    }
  }

  async remove(id: string) {
    await checkExistsResurs(this.prisma,ModelsEnumInPrisma.MENTOR_PROFILES,"id",id)
    try {
      const deleted = await this.prisma.mentorProfile.delete({where : {id : id }})
      return {
        message : `This action removes a #${id} mentorProfile`,
        data : deleted
      };
    } catch (error) {
      throw new HttpException("MentorProfile delete  filed ",500)
    }
  }
}
