import { Transform } from "class-transformer"
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export const enum CourseLevel {
  BEGINNER = 'BEGINNER',
  PRE_INTERMEDIATE = 'PRE_INTERMEDIATE',
  INTERMEDIATE = 'INTERMEDIATE',
  UPPER_INTERMEDIATE = 'UPPER_INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export class CreateCourseDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    about: string

    @Transform((e) => {
        if(isNaN(+e.value)) return undefined
        if(typeof e.value === "string"){
            return e.value ==='' ? undefined : Number(e.value)
        }
    })
    @IsNumber()
    price: number

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    mentorId: string

    @IsOptional()
    @Transform((e) => {
        return e.value === 'false' ? false :
            typeof e.value === 'boolean' ? e.value : Boolean(e.value)
    })
    @IsBoolean()
    published?: boolean


    @IsString()
    @IsEnum(['BEGINNER','ADVANCED','UPPER_INTERMEDIATE','INTERMEDIATE','PRE_INTERMEDIATE',])
    level : CourseLevel
}
