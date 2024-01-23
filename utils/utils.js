import prisma from "@/db"

export default class Utils {
    /**
     *
     * @param {Number} page 'The actual page that you wanna get the interval'
     * @param {Number} pageSize 'the amount of content of each page'
     * @returns {{skip: Number, take:Number}}
     */
    static getPagination(page, pageSize) {
        const p = page ? parseInt(page, 10) : 1; // Converte a página para um número inteiro, padrão para 1 se não fornecido
        const skip = (p - 1) * pageSize; // Calcula o número de registros a serem pulados
        const take = pageSize; // Define o número de registros a serem retornados

        return { skip, take };
    }

    /**
     * 
     * @param {*} num 
     * @returns Boolean
     */
    static isValidNumber(num) {
        return !isNaN(Number(num)) && num !== "";
    }

    /**
     * 
     * @param {String} strng 
     */
    static toUrlFriendly(str){
            // Substitui espaços por traços
            let urlAmigavel = str.replace(/\s+/g, "-");

            // Remove caracteres especiais
            urlAmigavel = urlAmigavel.replace(/[^\w-]+/g, "");

            // Converte para minúsculas
            urlAmigavel = urlAmigavel.toLowerCase().replace("--", "-");

            return urlAmigavel;
    }

    static async getFormattedMangaName(manga){
        const id = manga.id;

        const {language, author} = await prisma.manga.findUnique({
            select: {
                author: true,
                language: true
            },
            where: {
                id:id
            },
        })

        const langName = language.name
        const authorName = author.name

        return `[${authorName}] ${manga.name} | ${langName}`
    }
}