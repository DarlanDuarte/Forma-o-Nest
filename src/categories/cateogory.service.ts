import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDTO } from "./dtos/createCategory.dto";
import { UpdateCategoryDTO } from "./dtos/updateCategory.dto";



@Injectable()
export class CategoryService{
    constructor(private readonly prisma: PrismaService){}

        public async create({name}: CreateCategoryDTO){

            const nameCategory = await this.findByName(name)

            if(nameCategory) throw new BadRequestException("Category name already exists")

            return await this.prisma.categories.create({
                data:{
                    name: name
                },
                select:{
                    id: true,
                    name: true,
                    created_at: false,
                    update_at: false,
                }
            })

        }



        public async list(){
            return await this.prisma.categories.findMany()
        }


        public async update(id: string, {name}: CreateCategoryDTO){


            if(!id || id === ' ' || !name || name === ' ')throw new BadRequestException("Id and Name required!")
            
            const findId = await this.findById(id)
                
            
            if(!findId)throw new NotFoundException("Category not found!")
            
            
            const categoryByName = await this.findByName(name)

            
                
            if(categoryByName?.name === name)throw new BadRequestException("Category name is already in use")
                

            return await this.prisma.categories.update({
                where:{
                    id: id
                },
                data:{
                    name: name
                },

            })
        }



        public async delete(id: string){
            const existCategory = await this.findById(id)

            if(!existCategory){
                throw new NotFoundException("Category id not found")
            }

            return this.prisma.categories.delete({
                where: {id}
            })

        }




        public async findById(id: string){
            return this.prisma.categories.findFirst({
                where:{
                    id
                }
            })
        }



        public async findByName(name: string){
            return await this.prisma.categories.findFirst({
                where:{
                    name
                }
            })
        }


}