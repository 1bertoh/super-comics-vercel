import prisma from "@/db"

export default class Manga {
    /**
     * 
     * @param {{manga: Object, pages: Array}} body 
     * @returns 
     */
    async insertManga(body) {
        const { manga, pages } = body;

        const pagesMany = pages.map((page) => {
            return {
                alt: page.alt,
                height: Number(page.height),
                page: Number(page.page),
                url: page.url,
                width: Number(page.width),
            };
        });

        let mangaData = {
            coverLg: manga.coverLg,
            coverSm: manga.coverSm,
            description: manga.description,
            groups: "",
            name: manga.name,
            pages: Number(manga.pages),
            rating: 0,
            views: 0,
            isWesternReading: 0,
            language: {
                connect: {
                    id: Number(manga.language),
                },
            },
            // Page: {
            //     createMany: {
            //         data: pagesMany,
            //     },
            // },
            parody: {
                connect: {
                    id: Number(manga.parody),
                },
            },
            urlName: manga.urlName,
            fullName: manga.fullName,
        };

        if(manga.collection !== (''|| undefined || null) && !isNaN(manga.chapCollection) && Number(manga.chapCollection) !== 0){
            mangaData.collection = manga.collection
            mangaData.chapCollection = Number(manga.chapCollection)
        }

        const res = await prisma.$transaction([
            prisma.manga.create({
                data: {
                    // TagsManga: {
                    //     createMany: {
                    //         data: manga.tags.map(e => {
                    //             return {tagId: e.id}
                    //         }),
                    //     },
                    // },
                    // CharacterManga: {
                    //     createMany: {
                    //         data: manga.characters.map((e) => {
                    //             return {characterId: e.id}
                    //         }),
                    //     },
                    // },
                    // CategoryManga: {
                    //     createMany: {
                    //         data: manga.categories.map((e) => {
                    //             return {categoryId: e.id}
                    //         }),
                    //     },
                    // },
                    // AuthorManga: {
                    //     createMany: {
                    //         data: manga.authors.map((e) => {
                    //             return{authorId:e.id}
                    //         }),
                    //     },
                    // },
                    ...mangaData,
                },
            }),
            prisma.tags.updateMany({
                where: {
                    id: {
                        in: manga.tags.map((e) => e.id),
                    },
                },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            }),
            prisma.category.updateMany({
                where: {
                    id: {
                        in: manga.categories.map((e) => e.id),
                    },
                },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            }),
            prisma.author.updateMany({
                where: {
                    id: {
                        in: manga.authors.map((e) => e.id),
                    },
                },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            }),
            prisma.character.updateMany({
                where: {
                    id: {
                        in: manga.characters.map((e) => e.id),
                    },
                },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            }),
            prisma.language.update({
                where: {
                    id: Number(manga.language)
                },
                data: {
                    count: {
                        increment: 1
                    }
                }
            }),
            prisma.parody.update({
                where: {
                    id: Number(manga.parody)
                },
                data: {
                    count: {
                        increment: 1
                    }
                }
            })
        ]);

        await prisma.$transaction(
            manga.tags.map(e => {
                return prisma.tagsManga.create({
                    data: { tagId: e.id, mangaId: res[0].id },
                });
            })
        )
        await prisma.$transaction(
            manga.characters.map(e => {
                return prisma.characterManga.create({
                    data: { characterId: e.id, mangaId: res[0].id },
                });
            })
        )
        await prisma.$transaction(
            manga.categories.map(e => {
                return prisma.categoryManga.create({
                    data: { categoryId: e.id, mangaId: res[0].id },
                });
            })
        )
        await prisma.$transaction(
            manga.authors.map(e => {
                return prisma.authorManga.create({
                    data: { authorId: e.id, mangaId: res[0].id },
                });
            })
        )
        await prisma.$transaction(
            pagesMany.map(e => {
                return prisma.page.create({
                    data: { ...e ,mangaId: res[0].id, },
                });
            })
        )
        

        return res;
    }
    /**
     * 
     * @param {{mangaId: Number}} query 
     * @returns 
     */
    async getManga({mangaId, full}) {
        const include = {
                language: true,
                parody: true,
                Page: true,
                TagsManga: {
                    include: {
                        Tag: true
                    }
                },
                CategoryManga: {
                    include:{
                        Category: true
                    }
                },
                AuthorManga: {
                    include:{
                        Author: true
                    }
                },
                CharacterManga: {
                    include: {
                        Character: true
                    }
                }
            }
        return  await prisma.manga.findUnique({
            where: {
                id: Number(mangaId),
            },
            include: Boolean(full) === true && include
        });
    }
    /**
     * 
     * @param {{name: String, authorId: Number, tagId: Number, languageId: Number, parodyId: Number, categoryId:Number, collection:String, urlName:String, characterId: Number}} query 
     * @param {{skip: Number, take: Number}} pagination 
     * @returns 
     */
    async getMangas(query, pagination){
        const {name, tagId, languageId, parodyId, authorId, collection, categoryId, urlName, characterId} = query
        const {skip, take} = pagination
        
        delete query?.page

        if(Object.keys(query).length !== 0){
            const isValidQuery = Object.values(query).some((e) => String(e)?.trim() !== '' )

            if(isValidQuery){
                const mangaWhere = new MangaWhere(name, tagId,languageId,parodyId,authorId, collection, categoryId, urlName, characterId);
                
                if(Object.keys(mangaWhere).length){
                    const [mangas, mangasTotal] = await prisma.$transaction([
                        prisma.manga.findMany({
                            orderBy: {
                                id: 'desc'
                            },
                            where: mangaWhere,
                            skip,
                            take
                        }),
                        prisma.manga.count(
                            {
                                where:mangaWhere
                            }
                        )
                    ])
                    const pagesTotal = Math.ceil(mangasTotal/take)
                    return({pagination: {mangasTotal, pagesTotal}, mangas})
                }
            }
            return []

        } else {
            const [mangas, mangasTotal] = await prisma.$transaction([
                prisma.manga.findMany({
                    orderBy: {
                        id: "desc",
                    },
                    skip,
                    take,
                }),
                prisma.manga.count(),
            ]);
            const pagesTotal = Math.ceil(mangasTotal / take);
            return { pagination: {mangasTotal, pagesTotal}, mangas };
        }

    }

    async increaseView({mangaId}) {
        await prisma.manga.update({
            where: {
                id: Number(mangaId)
            },
            data: {
                views: {
                    increment: 1
                }
            }
        })
    }
}


class MangaWhere {
    constructor(name, tagId, languageId, parodyId, authorId, collection, categoryId, urlName, characterId) {
        if (name && name !== '') this.name = {
            contains: name,
        };
        if (this.isValidNumber(tagId)) this.TagsManga = {
            some: {
                tagId: Number(tagId),
            },
        };
        if (this.isValidNumber(characterId)) this.CharacterManga = {
            some: {
                characterId: Number(characterId),
            },
        };
        if (this.isValidNumber(authorId)) this.AuthorManga = {
            some: {
                authorId: Number(authorId),
            },
        };
        if (this.isValidNumber(categoryId)) this.CategoryManga = {
            some: {
                categoryId: Number(categoryId),
            },
        };
        if (this.isValidNumber(languageId)) this.languageId = Number(languageId);
        if (this.isValidNumber(parodyId)) this.parodyId = Number(parodyId);
        // if (this.isValidNumber(authorId)) this.authorId = Number(authorId);
        if (collection && collection !== '') this.collection = collection;
        if (urlName && urlName !== '') this.urlName = urlName;
    }

    isValidNumber(num) {
        return !isNaN(Number(num)) && num !== ''
    };

}