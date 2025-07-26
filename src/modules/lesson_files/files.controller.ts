// intro-video.controller.ts
import {
  Controller,
  Get,
  Param,
  Res,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('lesson-files')
export class LessonFileStreamController {
  @ApiExcludeEndpoint()  
  @Get(':fileName')
  async streamVideo(@Param('fileName') fileName: string, @Res() res: Response) {
    const videoPath = join(process.cwd(), 'src', 'core', 'uploads', 'lesson-files', fileName);

    if (!existsSync(videoPath)) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const stat = await import('fs/promises').then(fs => fs.stat(videoPath));
    const fileSize = stat.size;

    const range = res.req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = createReadStream(videoPath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });

      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });

      createReadStream(videoPath).pipe(res);
    }
  }
}
