import { IsString } from "class-validator";





export class UpdateNewsDTO {
    @IsString()
    title: string

    @IsString()
    content: string

    @IsString()
    category_id: string

}