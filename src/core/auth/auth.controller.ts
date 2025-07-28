import { Controller, Get, Post, Body, Patch, Param, Delete, Res, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, VerifyDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { Public } from 'src/global/decorators/auth.decorators';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
  
  @Post("register")
  @Public()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Public()
  @Post("verify")
  async verify(
    @Body() data: VerifyDto,
    @Res() res: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.verifyCodeRegister(data)
    res.cookie('accessToken', accessToken)
    res.cookie('refreshToken', refreshToken)
    res.statusCode = 201
    res.send({ accessToken, refreshToken })
  }

  @Public()
  @Post("login")
  async login(
    @Body() data: LoginDto,
    @Res() res: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(data)
    res.cookie('accessToken', accessToken)
    res.cookie('refreshToken', refreshToken)
    res.statusCode = 201
    res.send({ accessToken, refreshToken })
  }
}
