import { ValidationPipe, INestApplication } from "@nestjs/common";
import { } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MulterValidationExceptionFilter } from "./error/validation.filter";
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'; // Import SwaggerTheme

export const initGlobalApp = (app: INestApplication) => {
    const config = new DocumentBuilder().setTitle("Edfix Clone").build()
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }))

    app.setGlobalPrefix("api")


    const document = SwaggerModule.createDocument(app, config)

    const theme = new SwaggerTheme();
    const darkThemeCss = theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK);

    SwaggerModule.setup("api-docs", app, document, {
        customCss: darkThemeCss, // Apply the dark theme CSS
        customSiteTitle: 'My API Docs', // Optional: Customize site title
    })


    app.useGlobalFilters(new MulterValidationExceptionFilter())
    app.enableCors()
}
