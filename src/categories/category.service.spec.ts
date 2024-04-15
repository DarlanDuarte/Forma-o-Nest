import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { CategoryService } from "./cateogory.service";
import { PrismaCategoryMock, categoryMock } from "./mocks/prismaCategory.mock";



describe(`${CategoryService.name}`, () =>{

    let categoryService: CategoryService
    let prismaService: PrismaService

    beforeEach(async() =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                {provide: PrismaService, useValue: PrismaCategoryMock}
            ]
        }).compile()

        categoryService = module.get<CategoryService>(CategoryService)
        prismaService = module.get<PrismaService>(PrismaService)

    })

    afterEach(async() =>{
        jest.clearAllMocks()
    })


    it(`should be defined`, () =>{
        expect(categoryService).toBeDefined()
    })


    it(`${CategoryService.prototype.create.name}() should return new category`, async() =>{

        const response = await categoryService.create(categoryMock[0])

        expect(response).toEqual(categoryMock[0])
        expect(prismaService.categories.create).toHaveBeenCalledTimes(1)
        


    })

    it(`${CategoryService.prototype.findByName.name}() should return a single category`, async() =>{

        const response = await categoryService.findByName(categoryMock[0].name)

        expect(response).toEqual(categoryMock[0])
        expect(prismaService.categories.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.categories.findFirst).toHaveBeenCalledWith({
            where: {name: categoryMock[0].name}

        })

    })

    it(`${CategoryService.prototype.findByName.name}() should return null when category is not found`, async() =>{

        jest.spyOn(prismaService.categories, 'findFirst').mockReturnValueOnce(null)

        const response = await categoryService.findByName('TESTE')

        expect(response).toEqual(null)
        expect(prismaService.categories.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.categories.findFirst).toHaveBeenCalledWith({
            where: {name: 'TESTE'}
        })

    })

    it(`${CategoryService.prototype.list.name}() should return all categories`, async() =>{


        const response = await categoryService.list()

        expect(response).toEqual(categoryMock)
        expect(prismaService.categories.findMany).toHaveBeenCalledTimes(1)


    })

    it(`${CategoryService.prototype.findById.name}() should return a single category by id`, async() =>{

        const response = await categoryService.findById(categoryMock[0].id)

        expect(response).toEqual(categoryMock[0])
        expect(prismaService.categories.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.categories.findFirst).toHaveBeenCalledWith({
            where: {id: categoryMock[0].id}
        })

    })

    it(`${CategoryService.prototype.findById.name}() should return null when category not found`, async() =>{

        jest.spyOn(prismaService.categories, 'findFirst').mockReturnValueOnce(null)

        const response = await categoryService.findById('a12356')

        expect(response).toBeNull()
        expect(prismaService.categories.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.categories.findFirst).toHaveBeenCalledWith({
            where: {id: 'a12356'}
        })


    })


})