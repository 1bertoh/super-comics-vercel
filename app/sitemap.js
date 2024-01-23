import { PrismaClient } from "@prisma/client";

export default async function sitemap() {
    const { category, character, parody } = await getMaps();

    const urlPrefix = "http://supercomic.info";

    let map = [];

    const catMap = category.category.map((info) => ({
        url: `${urlPrefix}/category/${info.urlName}/page/1`, // https://example.com/posts/this-is-a-post-1
        lastModified: new Date(), // ideally, this is the last modified date of the post
        changeFrequency: "daily", // this will be used to determine how often pages are re-crawled
        priority: category.priority, // the priority of this URL relative to other URLs on your site
    }));
    map.push(...catMap)

    const charMap = character.character.map((info) => ({
        url: `${urlPrefix}/character/${info.urlName}/page/1`, // https://example.com/posts/this-is-a-post-1
        lastModified: new Date(), // ideally, this is the last modified date of the post
        changeFrequency: "daily", // this will be used to determine how often pages are re-crawled
        priority: character.priority, // the priority of this URL relative to other URLs on your site
    }));
    map.push(...charMap)
    
    const parMap = parody.parody.map((info) => ({
        url: `${urlPrefix}/parody/${info.urlName}/page/1`, // https://example.com/posts/this-is-a-post-1
        lastModified: new Date(), // ideally, this is the last modified date of the post
        changeFrequency: "daily", // this will be used to determine how often pages are re-crawled
        priority: parody.priority, // the priority of this URL relative to other URLs on your site
    }));
    map.push(...parMap)

    return map
}

const getMaps = async () => {
    const p = new PrismaClient()
    const [ category, character, parody ] = await p.$transaction([
        p.category.findMany(),
        p.character.findMany(),
        p.parody.findMany(),
    ]);

    return {
        category: { priority: 1, category },
        character: { priority: 0.8, character },
        parody: { priority: 0.9, parody },
    };
};
