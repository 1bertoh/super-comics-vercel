import prisma from "@/db";

export default class Page {
    async insertPage(page) {
        const res = await prisma.page.create({
            data: {
                
            },
        });

        return res;
    }

    /**
     *
     * @param {{mangaId: Number}} mangaId
     * @returns
     */
    async getPage({ mangaId }) {
        const res = await prisma.page.findMany({
            where: {
                manga: {
                    id: mangaId,
                },
            },
        });

        return res;
    }
}
