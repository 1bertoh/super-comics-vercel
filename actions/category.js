import prisma from "@/db"

export default class Category {
    async insertCategory(category) {

        const res = await prisma.category.create({
            data: {
                name: category.name,
                urlName: category.urlName,
            },
        });

        return res;
    }
    async getCategory({ id, name, urlName }) {
        let res = null;
        if (id !== undefined) {
            res = await prisma.category.findUnique({
                where: {
                    id: Number(id),
                },
            });
        } 
        else if (name !== undefined) {
            res = await prisma.category.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            });
        }
        else if (urlName !== undefined) {
            res = await prisma.category.findMany({
                where: {
                    urlName: urlName
                },
            });
        }

        return res;
    }

    async updateCount(id) {
        const tag = await prisma.category.findUnique({
            where: {
                id: id,
            },
        });
        await prisma.category.update({
            where: {
                id: id,
            },
            data: {
                count: tag.count + 1,
            },
        });
        return { message: tag };
    }
}
