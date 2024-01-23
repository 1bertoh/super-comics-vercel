import PrismaBase from "./prismaBase";
import prisma from "@/db";

export default class Language {
    async insertLanguage(language) {
        const res = await prisma.language.create({
            data: {
                name: language.name,
                urlName: language.urlName,
            },
        });

        return res;
    }
    /**
     * 
     * @param {{id: Number, name: String, urlName:String}} props? 
     * @returns 
     */
    async getLanguage(props) {
        let res = []
        const { id, name, urlName } = props;
        if (id) {
            res = await prisma.language.findUnique({
                where: {
                    id: id,
                },
            });
            return res;
        } 
        else if (name) {
            res = await prisma.language.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            });
            return res;
        }
        else if (urlName) {
            res = await prisma.language.findMany({
                where: {
                    urlName: urlName
                },
            });
            return res
        }

        res = await prisma.language.findMany();
        // if (Object.keys(props).length === 0) {
        //     res = [];
        //     res = await p.language.findMany();
        // }

        return res;
    }

    async updateCount(id) {
        const tag = await prisma.language.findUnique({
            where: {
                id: id,
            },
        });
        await prisma.language.update({
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
