import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./dtos/authLogin.dto";



@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UsePipes(ValidationPipe)
    @Post('login')
    public async login(@Body() {email, password}: AuthLoginDTO){

        return await this.authService.login({email, password})

    }


}