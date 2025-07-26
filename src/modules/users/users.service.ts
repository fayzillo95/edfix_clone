import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { urlGenerator } from 'src/core/types/generator.types';
import { checkExistsResurs, checAlreadykExistsResurs } from 'src/core/types/check.functions.types';
import { ModelsEnumInPrisma } from 'src/core/types/global.types';
import { userFindOneEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) { }

  async create(createUserDto: CreateUserDto, image?: string) {
    console.log(createUserDto, image)
    await checAlreadykExistsResurs(this.prisma, ModelsEnumInPrisma.USERS, "email", createUserDto.email)
    if (image) {
      createUserDto['image'] = urlGenerator(this.config, "user_images", image)
    }
    const newUser = await this.prisma.user.create({
      data: createUserDto
    })
    return {
      message: 'This action adds a new user',
      data: newUser
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({select : userFindOneEntity})
    return {
      message: `This action returns all users`,
      data: users
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
      select: userFindOneEntity
    })
    if(!user){
      throw new NotFoundException("User not found ")
    }
    return {
      message: `This action returns a [ ${id} ] user`,
      data : user
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto, image?: string) {
    await this.findOne(id)
    if (updateUserDto.email) {
      await checAlreadykExistsResurs(this.prisma, ModelsEnumInPrisma.USERS, "email", updateUserDto.email)
    }
    if (image) {
      updateUserDto['image'] = urlGenerator(this.config, "user_images", image)
    }
    try {
      const updatedUser = await this.prisma.user.update({ where: { id: id }, data: updateUserDto ,select : userFindOneEntity})
      return {
        message: `This action updates a #${id} user`,
        updatedUser
      };
    } catch (error) {
      console.log(error)
      throw new HttpException(`Userning ma'lumotlarini yangilashda hatolik`, 500)
    }
  }

  async remove(id: string) {
    await this.findOne(id)

    try {
      const updatedUser = await this.prisma.user.delete({ where: { id: id } })
      return {
        message: `This action deleted a #${id} user`,
        updatedUser
      };
    } catch (error) {
      console.log(error)
      throw new HttpException(`Userni o'chirishda hatolik`, 500)
    }
  }
}
