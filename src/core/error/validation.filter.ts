import { BadRequestException, Catch, ArgumentsHost, ExceptionFilter, NotFoundException, ConflictException } from '@nestjs/common';
import * as fs from 'fs';

@Catch(BadRequestException,NotFoundException,ConflictException)
export class MulterValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException | NotFoundException | ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const file = request.file || request.files;
    try {
      if (Array.isArray(file)) {
        file.map(file => {
          fs.unlink(file.path, (err) => {
            if (err) {
              console.log(err)
            }
          })
        })
      } 
      if(file['banner']){
        const path = file['banner'][0].path
        fs.unlink(path,(err) =>{
          if(err){
            console.log(err)
          }
        })
      }
      if(file['introVideo']){
        fs.unlink(file['introVideo'][0].path,(err) => {
          if(err) {
            console.log(err)
          }
        })
      }
      if(file.path){
        fs.unlink(file.path,(err) => {
          if(err) {
            console.log(err)
          }
        })
      }
      if(file['video']){
        fs.unlink(file['video'],(err) => {
          if(err){
            console.log(err)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }

    response.status(status).json({
      statusCode: status,
      ...typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse,
    });
  }
}
