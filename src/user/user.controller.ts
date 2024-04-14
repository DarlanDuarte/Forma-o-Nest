import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { UpdateUserDTO } from "./dtos/update-user.dto";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @UsePipes(ValidationPipe)
    @Post()
    public async create(@Body() data: CreateUserDTO){

        const findEmail = await this.userService.ExistEmail(data?.email)

        if(findEmail){
            throw new BadRequestException(`Email already exist!`)
        }
        
        const user = await this.userService.create(data)

        return user

    }

    @Get('/:id')
    public async show(@Param('id') id: string): Promise<User>{

        const user = await this.userService.findById(id)

        if(!user)throw new NotFoundException("User does not exist")

        return user

    }

    @UsePipes(ValidationPipe)
    @Put('/:id')
    public async update(@Param('id') id: string, @Body() data: UpdateUserDTO, ){

        const user = await this.userService.update({id, data})

        return user

    }

    @Get()
    public async list(){
        return await this.userService.list()
    }

    

    
}