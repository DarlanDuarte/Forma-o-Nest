import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {hash} from 'bcrypt'
import { Prisma, User } from "@prisma/client";
import { UpdateUserDTO } from "./dtos/update-user.dto";


@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService){}   
    

    public async create(data: Prisma.UserCreateInput): Promise<User> {

        if(!data.name || !data.email || !data.password){
            throw new BadRequestException("Name, Email and Password Required!")
        }

        const findEmail = await this.ExistEmail(data.email)

        if(findEmail){
            throw new BadRequestException(`Email already exist!`)
        }


        const passwordHash = await hash(data.password, 10)
        const userData: Prisma.UserCreateInput = {...data, password: passwordHash}
        const user = await this.prismaService.user.create({
            data: userData,

        })

        return user

    }


    public async update({id, data}: {id: string, data: UpdateUserDTO}){
        if(!data.email || !data.password) throw new BadRequestException("Email and Password required!")
        
        const findId = await this.findById(id)
        if(!findId)throw new NotFoundException("User not found")

        const findEmail = await this.ExistEmail(data?.email)
        if(findEmail !== null){
            if(findEmail?.id !== id) throw new BadRequestException("User does not match this email")
        }

        data.password = await hash(data.password, 10)

        const {email, password} = data


        return await this.prismaService.user.update({
            where:{
                id: id
            },
            data:{
                email: email,
                password: password
            },
        })

    }

    public async list(){
        return await this.prismaService.user.findMany()
    }



    public async ExistEmail(email: string){
        const findEmail = await this.prismaService.user.findFirst({
            where:{
                email
            },
            
        })

        return findEmail
    }


    public async findById(id: string): Promise<User | null>{

        const findId = await this.prismaService.user.findFirst({
            where:{
                id: id
            }
        })

        return findId

    }


}