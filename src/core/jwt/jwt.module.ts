import { Module } from '@nestjs/common';
import { JwtSubService } from './jwt.service';

@Module({
  providers: [JwtSubService],
})
export class JwtSubModule {}
