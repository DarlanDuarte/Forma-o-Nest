import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "./user.service";
import { PrismaUserMock, userMock } from "./mocks/user.mock";


describe(`${UserService.name}`, () =>{

    let service : UserService
    let prismaService: PrismaService

    beforeEach( async() =>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                UserService,
                {provide: PrismaService, useValue: PrismaUserMock}
            ]
        }).compile()

        service = module.get<UserService>(UserService)
        prismaService = module.get<PrismaService>(PrismaService)

    })

    afterEach(() =>{
        jest.clearAllMocks()
    })


    it(`should be defined`, () =>{
        expect(service).toBeDefined()
    })

    it(`${UserService.prototype.create.name} should create a new user`, async () =>{

        const response = await service.create(userMock[0])

        expect(response).toEqual(userMock[0])
        expect(prismaService.user.create).toHaveBeenCalledTimes(1)

    })

    it(`${UserService.prototype.ExistEmail.name} should return a single user`, async() =>{

        const response = await service.ExistEmail(userMock[0].email)

        expect(response).toEqual(userMock[0])
        expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.user.findFirst).toHaveBeenCalledWith({
            where: {email: userMock[0].email}
        })
    })

    it(`${UserService.prototype.ExistEmail.name} should return null when user is not found`, async () =>{

        jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(null)

        const fakeEmail = "mock@mock.com"

        const response = await service.ExistEmail(fakeEmail)


        expect(response).toEqual(null)
        expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.user.findFirst).toHaveBeenCalledWith({
            where:{email: fakeEmail}
        })

    })

    it(`${UserService.prototype.findById.name} should return a single user by id `, async() =>{

        const response = await service.findById(userMock[0].id)


        expect(response).toEqual(userMock[0])
        expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.user.findFirst).toHaveBeenCalledWith({
            where:{id: userMock[0].id}
        })

    })


    it(`${UserService.prototype.findById.name} should return null when user is not found`, async() =>{

        jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(null)

        const fakeId = '999999'
        const response = await service.findById(fakeId)

        expect(response).toBeNull()
        expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1)
        expect(prismaService.user.findFirst).toHaveBeenCalledWith({
            where: {id: fakeId}
        })


    })

    it(`${UserService.prototype.update.name} should update user`, async() =>{

        jest.spyOn(prismaService.user, 'update').mockResolvedValueOnce(userMock[1])
        /* const id = userMock[0].id
        const data = userMock[1] */
        const response = await service.update({
            id: userMock[0].id,
            data: userMock[1]
        })

        expect(response.email).toEqual(userMock[1].email)
        expect(prismaService.user.update).toHaveBeenCalledTimes(1)
        expect(prismaService.user.update).toHaveBeenCalledWith({
            where: {id: userMock[0].id},
            data: {email: userMock[1].email, password: userMock[1].password}
        })
    })


    /* it(`${UserService.prototype.update.name} should return null when user id not found`, async() =>{

        jest.spyOn(prismaService.user, 'update').mockResolvedValueOnce(null)
        
        const fakeId = '9786456'

        const response = await service.update({
            id: fakeId,
            data: userMock[0]
        })

        expect(response.email).toEqual(null)
        expect(prismaService.user.update).toHaveBeenCalledTimes(1)
        expect(prismaService.user.update).toHaveBeenCalledWith({
            where: {id: fakeId},
            data: {email: userMock[0].email, password: userMock[0].password}
        })
    }) */





})