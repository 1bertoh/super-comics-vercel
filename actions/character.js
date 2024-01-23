import prisma from "@/db";

export default class Character {
    /**
     * 
     * @param {{name: String, urlName:String}} character 
     * @returns 
     */
    async insertCharacter(character) {
        const res = await prisma.character.create({
            data: {
                name: character.name,
                urlName: character.urlName,
            },
        });

        return res;
    }

    /**
     *
     * @param {{id?: Number, name: String, urlName:String}} param0
     * @returns
     */
    async getCharacter({ id, name, urlName }) {
        let res = null;
        if (id) {
            res = await prisma.character.findUnique({
                where: {
                    id: Number(id),
                },
            });
        } else if (name) {
            res = await prisma.character.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            });
        } else if (urlName) {
            res = await prisma.character.findMany({
                where: {
                    urlName: urlName,
                },
            });
        }

        return res;
    }

    async updateCount(id) {
        const char = await prisma.character.findUnique({
            where: {
                id: id,
            },
        });

        await prisma.character.update({
            where: {
                id: id,
            },
            data: {
                count: char.count + 1,
            },
        });

        return { message: char };
    }
}
