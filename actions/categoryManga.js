import Category from "./category";
import prisma from "@/db"

export default class CategoryManga {
    /**
     *
     * @param {{mangaId: Number, tagId: Number}} param0
     * @returns
     */
    async insertCategoryManga({ categoryId, mangaId }) {
       //NÃO É MAIS ÚTIL JÁ QUE A INSERÇÃO ESTÁ SENDO FEITA NO ACTION DO MANGA
        const c = new Category()
        const res = await prisma.categoryManga.create({
            data: {
                Manga: {
                    connect: {
                        id: Number(mangaId),
                    },
                },
                Category: {
                    connect: {
                        id: Number(categoryId),
                    },
                },
            },
        });

        await c.updateCount(categoryId)

        return res;
    }

    /**
     *
     * @param {{mangaId?: Number, categoryId?: Number}} e
     * @returns
     */
    async getCategoryManga(e) {
        const { mangaId, categoryId } = e;
        let res = [];
        if (mangaId !== undefined) {
            res = [];
            res = await prisma.categoryManga.findMany({
                where: {
                    mangaId: Number(mangaId),
                },
                include: {
                    Category: true
                }
            });
        } else if (categoryId !== undefined) {
            res = [];
            res = await prisma.categoryManga.findMany({
                where: {
                    categoryId: Number(categoryId),
                },
                include: {
                    Manga: true
                }
            });
        }

        return res;
    }
}
