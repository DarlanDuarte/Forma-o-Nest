import { Categories } from "@prisma/client";


export const categoryMock: Categories[] = [
    {
        id: "001",
        name: "Lista de Teste",
        created_at: new Date(),
        update_at: new Date()
    },
    {
        id: "002",
        name: "Motos Esportivas",
        created_at: new Date(),
        update_at: new Date()
    }
]



export const PrismaCategoryMock = {
    categories: {
        create: jest.fn().mockReturnValue(categoryMock[0]),
        findFirst: jest.fn().mockReturnValue(categoryMock[0]),
        findMany: jest.fn().mockReturnValue(categoryMock),
        update: jest.fn().mockReturnValue(categoryMock[0]),
        delete: jest.fn()
    }
}