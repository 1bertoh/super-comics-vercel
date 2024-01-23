import prisma from "@/db"

export default class Author {
    async insertAuthor(author) {
        const res = await  prisma.author.create({
            data: {
                name: author.name,
                urlName: author.urlName,
            },
        });

        return res;
    }
    async getAuthor({ id, name, urlName }) {
        let res = null;
        if (id) {
            res = await prisma.author.findUnique({
                where: {
                    id: Number(id),
                },
            });
        } 
        else if (name) {
            res = await prisma.author.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            });
        }
        else if (urlName) {
            res = await prisma.author.findMany({
                where: {
                    urlName: urlName,
                },
            });
        }

        return res;
    }

    async updateCount(id) {
        const tag = await prisma.author.findUnique({
            where: {
                id: id,
            },
        });
        await prisma.author.update({
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
