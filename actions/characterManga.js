import prisma from "@/db";
import Character from "./character";

export default class CharacterManga {
    /**
     *
     * @param {{mangaId: Number, characterId: Number}} param0
     * @returns
     */
    async insertTagsManga({ characterId, mangaId }) {
        //NÃO É MAIS ÚTIL JÁ QUE A INSERÇÃO ESTÁ SENDO FEITA NO ACTION DO MANGA
        const t = new Character();
        const res = await prisma.characterManga.create({
            data: {
                Manga: {
                    connect: {
                        id: Number(mangaId),
                    },
                },
                Character: {
                    connect: {
                        id: Number(characterId),
                    },
                },
            },
        });

        // await t.updateCount(characterId);

        return res;
    }
    /**
     * 
     * @param {{mangaId: Number, characterId: Number}} e 
     * @returns 
     */
    async getCharacterManga(e) {
        const { mangaId, characterId } = e;
        let res = [];
        if (mangaId !== undefined) {
            res = [];
            res = await prisma.characterManga.findMany({
                where: {
                    mangaId: Number(mangaId),
                },
                include: {
                    Character: true,
                },
            });
        } else if (characterId !== undefined) {
            res = [];
            res = await prisma.characterManga.findMany({
                where: {
                    characterId: Number(characterId),
                },
                include: {
                    Manga: true,
                },
            });
        }

        return res;
    }
}
