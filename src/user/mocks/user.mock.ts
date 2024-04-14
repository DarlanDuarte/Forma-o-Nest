import { User } from "@prisma/client";


export const userMock: User[] = [
    {
        id: "01",
        name: "Duarte",
        email: "duarte@duarte.com",
        password: "123456",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "51845ab4-0152-4634-ac51-8657855a054f",
        name: "Arlark",
        email: "arlark@teste.com",
        password: "$2b$10$ETLPaMFkGzwRu3nlpiS4j.HTrBHF56a440oSjQJZ/CO8ZsdTLpcL.",
        created_at: new Date(),
        updated_at: new Date()
    }
]

export const PrismaUserMock = {
    user: {
        create: jest.fn().mockReturnValue(userMock[0]),
        findMany: jest.fn().mockReturnValue(userMock),
        findFirst: jest.fn().mockReturnValue(userMock[0]),
        update: jest.fn().mockReturnValue(userMock[0]),
        delte: jest.fn(),
    }
}


