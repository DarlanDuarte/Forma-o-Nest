import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateNewsDTO } from "./dtos/createNews.dto";
import { NewsService } from "./news.service";
import { News } from "@prisma/client";
import { UpdateNewsDTO } from "./dtos/updateNews.dto";


@Controller('news')
export class NewsController{
    constructor(private readonly newsService: NewsService){}


    @UsePipes(ValidationPipe)
    @Post()
    public async create(@Body() data: CreateNewsDTO){

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

        return await this.newsService.update({id, data})

    }

    @Delete('/:id')
    @HttpCode(204)
    public async delete(@Param('id') id: string){
        return this.newsService.delete(id)
    }

}