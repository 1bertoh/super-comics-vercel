import prisma from "@/db";

export default class Parody {
    async insertParody(parody) {
        const res = await prisma.parody.create({
            data: {
                name: parody.name,
                urlName: parody.urlName,
            },
        });

        return res;
    }

    /**
     *
     * @param {{id?: Number, name: String, urlName:String}} param0
     * @returns
     */
    async getParody({ id, name, urlName }) {
        let res = null;
        if (id) {
            res = await prisma.parody.findUnique({
                where: {
                    id: Number(id),
                },
            });
        } 
        else if (name) {
            res = await prisma.parody.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            });
        }
        else if (urlName) {
            res = await prisma.parody.findMany({
                where: {
                    urlName: urlName
                },
            });
        }

        return res;
    }

    async updateCount(id) {
        const tag = await prisma.parody.findUnique({
            where: {
                id: id,
            },
        });
        await prisma.parody.update({
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
