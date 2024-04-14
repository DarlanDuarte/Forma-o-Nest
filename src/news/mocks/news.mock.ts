import { News } from "@prisma/client";


export const newsMock: News[] = [
    {
        id: "01",
        title: "Titulo Para Testes",
        content: "Conteudo referente a testes unitários",
        publication_date: new Date(),
        author_id: "aa84078e-8038-426e-bca7-43bb804face2",
        category_id: "9879c90b-6768-4ba3-93d4-7351985ed874",
        created_at: new Date(),
        update_at: new Date()
    },
    {
        id: "02",
        title: "Implementação de teste",
        content: "Conteudo referente a testes unitários dois",
        publication_date: new Date(),
        author_id: "aa84078e-8038-426e-bca7-43bb804face2",
        category_id: "9879c90b-6768-4ba3-93d4-7351985ed874",
        created_at: new Date(),
        update_at: new Date()
    }
]


export const prismaNewsMock = {
    news:{
        create: jest.fn().mockReturnValue(newsMock[0]),
        findMany: jest.fn().mockReturnValue(newsMock),
        findFirst: jest.fn().mockReturnValue(newsMock[0]),
        update: jest.fn().mockReturnValue(newsMock[0]),
        delete: jest.fn()
    }
}