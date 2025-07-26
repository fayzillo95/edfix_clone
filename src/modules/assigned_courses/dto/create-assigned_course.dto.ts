import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export class CreateAssignedCourseDto {
    
    @ApiProperty({example : "cewscewcewcew"})
    @IsUUID()
    userId :string
    
    @ApiProperty({example : "cewscewcewcew"})
    @IsUUID()
    courseId : string
}
