import prisma from "@/db";

export default class Tag {
    async insertTag(tag) {
        const res = await prisma.tags.create({
            data: {
                description: tag.description,
                name: tag.name,
                urlName: tag.urlName,
            },
        });

        return res;
    }

    /**
     *
     * @param {{id?: Number, name: String, description: String, urlName:String}} param0
     * @returns
     */
    async getTag({ id, name, urlName }) {
        let res = null;
        if (id) {
            res = await prisma.tags.findUnique({
                where: {
                    id: Number(id),
                },
            });
        } 
        else if (name) {
            res = await prisma.tags.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            });
        }
        else if (urlName) {
            res = await prisma.tags.findMany({
                where: {
                    urlName: urlName
                },
            });
        }

        return res;
    }

    async updateCount(id) {
        const tag = await prisma.tags.findUnique({
            where: {
                id: id,
            },
        });

        await prisma.tags.update({
            where: {
                id: id,
            },
            data: {
                count: tag.count + 1,
            },
        });

        return { message: tag };
    }

    async getTopTags() {
        const tags = await prisma.tags.groupBy({
            take: 5,
            by: ["count", "description", "id", "name", "urlName"],
            orderBy: {
                count: "desc",
            },
        });

        return { message: tags };
    }
}
