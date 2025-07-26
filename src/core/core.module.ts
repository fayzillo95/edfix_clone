import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtSubModule } from './jwt/jwt.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        ".env",
      ]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "core", "uploads", "user_images"),
      serveRoot: "/api/user_images",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "core", "uploads", "banners"),
      serveRoot: "/api/banner",
    }),
    PrismaModule,
    JwtSubModule,
    EmailModule
  ],
})
export class CoreModule { }
// process.cwd(), "src", "core", "uploads", "intro_videos"