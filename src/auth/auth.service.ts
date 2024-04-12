import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthLoginDTO } from "./dtos/authLogin.dto";
import { UserService } from "../user/user.service";
import { AuthUserDTO } from "./dtos/userAuth.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { compare } from "bcrypt";



@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ){}


    public async login({email, password}: AuthLoginDTO){
        const user = await this.userService.ExistEmail(email)

        if(!user) throw new UnauthorizedException("User not found!")

        const passwordCompare = await compare(password, user.password)

        if(!passwordCompare) throw new UnauthorizedException("User or Password invalid!")
        
        return await this.createToken(user)
    }

    public async createToken(user: User){

        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                email: user.email,
                name: user.name
            },{expiresIn: '7d',
                subject: user.id
            })
        }

    }

}