import prisma from "@/db";
import Tag from "./tag";

export default class TagsManga {
    /**
     *
     * @param {{mangaId: Number, tagId: Number}} param0
     * @returns
     */
    async insertTagsManga({ tagId, mangaId }) {
        //NÃO É MAIS ÚTIL JÁ QUE A INSERÇÃO ESTÁ SENDO FEITA NO ACTION DO MANGA
        const t = new Tag();
        const res = await prisma.tagsManga.create({
            data: {
                Manga: {
                    connect: {
                        id: Number(mangaId),
                    },
                },
                Tag: {
                    connect: {
                        id: Number(tagId),
                    },
                },
            },
        });

        // await t.updateCount(tagId);

        return res;
    }
    async getTagsManga(e) {
        const { mangaId, tagsId } = e;
        // const include = {
        //     Tag: true,
        //     Manga: true,
        // };
        let res = [];
        if (mangaId !== undefined) {
            res = [];
            res = await prisma.tagsManga.findMany({
                where: {
                    mangaId: Number(mangaId),
                },
                include: {
                    Tag: true,
                },
            });
        } else if (tagsId !== undefined) {
            res = [];
            res = await prisma.tagsManga.findMany({
                where: {
                    tagId: Number(tagsId),
                },
                include: {
                    Manga: true,
                },
            });
        }

        return res;
    }
}
