import { PrismaClient } from "@prisma/client";

export default class PrismaBase{

    prisma(){
        const prisma = new PrismaClient();
        return prisma
    }
}