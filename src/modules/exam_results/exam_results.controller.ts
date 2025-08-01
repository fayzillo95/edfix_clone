import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamResultsService } from './exam_results.service';
import { CreateExamResultDto } from './dto/create-exam_result.dto';
import { UpdateExamResultDto } from './dto/update-exam_result.dto';

@Controller('exam-results')
export class ExamResultsController {
  constructor(private readonly examResultsService: ExamResultsService) {}

  @Post("create")
  create(@Body() createExamResultDto: CreateExamResultDto) {
    return this.examResultsService.create(createExamResultDto);
  }

  @Get("get-all")
  findAll() {
    return this.examResultsService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string) {
    return this.examResultsService.findOne(id);
  }

  @Patch('update-one/:id')
  update(
    @Param('id') id: string,
    @Body() updateExamResultDto: UpdateExamResultDto,
  ) {
    return this.examResultsService.update(id, updateExamResultDto);
  }

  @Delete('delte-ne/:id')
  remove(@Param('id') id: string) {
    return this.examResultsService.remove(id);
  }
}
