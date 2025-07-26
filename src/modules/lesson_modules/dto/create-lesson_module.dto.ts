import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateLessonModuleDto {
    
    @ApiProperty({example : "daed"})
    @IsString()
    @IsNotEmpty()
    name: string
    
    @ApiProperty({example : "daed"})
    @IsUUID()
    courseId: string
    
}
