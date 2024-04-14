import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateNewsDTO } from "./dtos/createNews.dto";
import { UserService } from "../user/user.service";
import { CategoryService } from "../categories/cateogory.service";
import { PrismaService } from "../prisma/prisma.service";
import { News } from "@prisma/client";
import { UpdateNewsDTO } from "./dtos/updateNews.dto";



@Injectable()
export class NewsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly categoryService: CategoryService,
        private readonly userService: UserService,
    ){}


    public async create(data: CreateNewsDTO){
        const {title, content, author_id, category_id} = data

        if(!title || !content || !author_id || !category_id)throw new BadRequestException("Required data was not provided")

        return await this.prisma.news.create({
            data:{
                title,
                content,
                author_id,
                category_id
            }
        })

    }


    public async list(): Promise<News[]>{
        return await this.prisma.news.findMany({take: 10})
    }



    public async update({id, data}: {id: string, data: UpdateNewsDTO}){
        
        const {title, content, category_id} = data
        

        return await this.prisma.news.update({
            where: {id},
            data: {
                title,
                content,
                category_id
            }
        })

    }


    public async delete(id: string){
        const findId = await this.findById(id)

        if(!findId)throw new NotFoundException("News id not found")

        return await this.prisma.news.delete({
            where: {id}
        })

    }



    public findById(id: string){
        if(!id)throw new NotFoundException("News Id was not passed")

        return this.prisma.news.findFirst({
            where:{id}
        })
    }

    public async findByCategoryId(category_id: string){
        return await this.prisma.news.findFirst({
            where: {
                category_id: category_id
            }
        })
    }



}