import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";


export class AuthUserDTO {
    @IsString()
    id: string

    @IsOptional()
    @IsString()
    name: string

    @IsEmail()
    @IsString()
    email: string

    @IsString()
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0
    })
    password: string

    @IsDateString()
    @IsOptional()
    created_at?: string

    @IsDateString()
    @IsOptional()
    updated_at?: string


}