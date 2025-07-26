import { ValidationPipe ,INestApplication} from "@nestjs/common";
import {  } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MulterValidationExceptionFilter } from "./error/validation.filter";

export const initGlobalApp = (app : INestApplication) => {
    const config = new DocumentBuilder().setTitle("Edfix Clone").build()
    app.useGlobalPipes(new ValidationPipe({
        whitelist : true,
        forbidNonWhitelisted:true,
        transform : true
    }))
    app.setGlobalPrefix("api")
    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup("api-docs",app,document)
    app.useGlobalFilters(new MulterValidationExceptionFilter())
    app.enableCors()
}