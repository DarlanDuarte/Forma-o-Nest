import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { NewsService } from "./news.service";
import { newsMock, prismaNewsMock } from "./mocks/news.mock";
import { CategoryService } from "../categories/cateogory.service";
import { UserService } from "../user/user.service";



describe(`${NewsService.name}`, () =>{

    let newService: NewsService;
    let prismaService: PrismaService;
    let categoryService: CategoryService;
    let userService: UserService;


    beforeEach(async() =>{

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NewsService,
                {provide: PrismaService, useValue: prismaNewsMock},
                {provide: CategoryService, useValue: {}},
                {provide: UserService, useValue: {}}
            ]
        }).compile()

        newService = module.get<NewsService>(NewsService)
        prismaService = module.get<PrismaService>(PrismaService)
        categoryService = module.get<CategoryService>(CategoryService)
        userService = module.get<UserService>(UserService)

    })

    afterEach(() =>{
        jest.clearAllMocks()
    })


    it(`${NewsService.prototype.create.name}() should return new news`, async() =>{

        const response = await newService.create(newsMock[0])

        expect(response).toEqual(newsMock[0])
        expect(prismaService.news.create).toHaveBeenCalledTimes(1)
        

    })

    it(`${NewsService.prototype.list.name}() should return all news`, async() =>{

        const response = await newService.list()

        expect(response).toEqual(newsMock)
        expect(prismaService.news.findMany).toHaveBeenCalledTimes(1)

    })

    it(`${NewsService.prototype.findById.name}() should return a single news`, async() =>{

        const response = await newService.findById(newsMock[0].id)

        expect(response).toEqual(newsMock[0])
        expect(prismaService.news.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.news.findFirst).toHaveBeenCalledWith({
            where: {id: newsMock[0].id}
        })

    })

    it(`${NewsService.prototype.findById.name}() should return null when news is not found`, async() =>{

        jest.spyOn(prismaService.news, 'findFirst').mockResolvedValueOnce(null)

        const response = await newService.findById('12345678922')

        expect(response).toBeNull()
        expect(prismaService.news.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.news.findFirst).toHaveBeenCalledWith({
            where: {id: '12345678922'}
        })

    })

    it(`${NewsService.prototype.findByCategoryId.name}() should return a single new`, async() =>{

        const response = await newService.findByCategoryId(newsMock[0].category_id)

        expect(response).toEqual(newsMock[0])
        expect(prismaService.news.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.news.findFirst).toHaveBeenCalledWith({
            where: {category_id: newsMock[0].category_id}
        })

    })

    it(`${NewsService.prototype.findByCategoryId.name}() should return null when news is not found`, async() =>{

        jest.spyOn(prismaService.news, 'findFirst').mockResolvedValueOnce(null)

        const response = await newService.findByCategoryId(`adfa516af48`)

        expect(response).toBeNull()
        expect(prismaService.news.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.news.findFirst).toHaveBeenCalledWith({
            where: {category_id: 'adfa516af48'}
        })

    })

    it(`${NewsService.prototype.update.name}() should update news`, async() =>{

        const {title, content, category_id} = newsMock[1]

        jest.spyOn(prismaService.news, 'update').mockResolvedValueOnce(newsMock[1])

        const response = await newService.update({
            id: newsMock[0].id,
            data: newsMock[1]
        })

        expect(response.title).toEqual(title)
        expect(prismaService.news.update).toHaveBeenCalledTimes(1)
        expect(prismaService.news.update).toHaveBeenCalledWith({
            where: {id: newsMock[0].id},
            data: {title, content, category_id}
        })


    })

    it(`${NewsService.prototype.delete.name}() should delete new`, async() =>{

        jest.spyOn(prismaService.news, 'delete').mockResolvedValueOnce(null)

        const response = await newService.delete(newsMock[0].id)

        expect(response).toBeNull()
        expect(prismaService.news.delete).toHaveBeenCalledTimes(1)
        expect(prismaService.news.delete).toHaveBeenCalledWith({
            where:{id: newsMock[0].id}
        })

    })


})
