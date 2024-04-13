import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./cateogory.service";
import { NewsService } from "../news/news.service";



@Module({
    imports: [PrismaModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule{}