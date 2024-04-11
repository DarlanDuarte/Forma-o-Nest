import { IsString, IsStrongPassword } from "class-validator";



export class UpdateUserDTO {
    

    @IsString()
    email: string

    @IsString()
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
    })
    password: string

}