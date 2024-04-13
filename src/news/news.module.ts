import { Module, forwardRef } from "@nestjs/common";
import { NewsController } from "./news.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { NewsService } from "./news.service";
import { UserService } from "../user/user.service";
import { CategoryService } from "../categories/cateogory.service";



@Module({
    imports: [PrismaModule],
    controllers: [NewsController],
    providers: [NewsService, UserService, CategoryService],
    exports: [NewsService]
})
export class NewsModule {}