import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateNewsDTO } from "./dtos/createNews.dto";
import { NewsService } from "./news.service";
import { News } from "@prisma/client";
import { UpdateNewsDTO } from "./dtos/updateNews.dto";
import { CategoryService } from "../categories/cateogory.service";
import { UserService } from "../user/user.service";


@Controller('news')
export class NewsController{
    constructor(private readonly newsService: NewsService,
        private readonly categoryService: CategoryService,
        private readonly userService: UserService,
    ){}


    @UsePipes(ValidationPipe)
    @Post()
    public async create(@Body() data: CreateNewsDTO){

        const {title, content, author_id, category_id} = data

        const findUser = await this.userService.findById(author_id)

        if(!findUser)throw new NotFoundException("User not found")
        
        const findCategory = await this.categoryService.findById(category_id)

        if(!findCategory)throw new NotFoundException("Category not found")

        return await this.newsService.create(data)

    }

    @Get()
    public async list(): Promise<News[]>{
        return await this.newsService.list()
    }

    @Get('/:id')
    public async findNews(@Param('id') id: string){
        return await this.newsService.findById(id)
    }

    @Put('/:id')
    public async update(@Body() data: UpdateNewsDTO, @Param('id') id: string){

        const {title, content, category_id} = data

        if(!title || !content || !category_id){
            throw new BadRequestException("Data was not passed")
        }

        const findId = await this.newsService.findById(id)

        if(!findId) throw new NotFoundException('News not found')

        const findCategoryId = await this.categoryService.findById(category_id)

        if(!findCategoryId) throw new NotFoundException("Category id not found")

        return await this.newsService.update({id, data})

    }

    @Delete('/:id')
    @HttpCode(204)
    public async delete(@Param('id') id: string){
        return this.newsService.delete(id)
    }

}