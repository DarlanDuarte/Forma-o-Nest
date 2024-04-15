import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateCategoryDTO } from "./dtos/createCategory.dto";
import { CategoryService } from "./cateogory.service";





@Controller('categories')
export class CategoryController{
    constructor(private readonly categoryService: CategoryService){}


    @UsePipes(ValidationPipe)
    @Post()
    public async create(@Body() {name}: CreateCategoryDTO){

        const nameCategory = await this.categoryService.findByName(name)

        if(nameCategory) throw new BadRequestException("Category name already exists")

        return await this.categoryService.create({name})

    }

    @Get()
    public async list(){
        return this.categoryService.list()
    }

    @Get('/:id')
    public async show(@Param('id') id: string){
        return this.categoryService.findById(id)
    }

    @UsePipes(ValidationPipe)
    @Put('/:id')
    public async update(@Param('id') id: string, @Body() {name}: CreateCategoryDTO ){

        const categories =  await this.categoryService.update(id, {name})

        return categories
    }



    @Delete('/:id')
    public async delete(@Param('id') id: string){
        
        await this.categoryService.delete(id)

        return { message: `Category deleted successfully` }

    }


}