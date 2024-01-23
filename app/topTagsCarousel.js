const { ChevronRightIcon } = require("@heroicons/react/24/outline");
const { default: SMangaCardLayer } = require("./_components/SMangaCardLayer");
const { SCarousel } = require("./_components/SCarousel");
const { Hr } = require("./_components/SHr");
import prisma from "@/db"  


const TopTagsCarousel = async ({topMangas}) => {
    let tags = getTopTags(topMangas); 

    const topMangasByTags = await getMangaTopTags(tags)

    let tags_rows = topMangasByTags.map((e) => <TagCarouselRow key={e}  info={e} />);

    return (
        <>
        {tags_rows}
        </>
    )
}

const TagCarouselRow = async ({info}) => {
    const tag = info[0].Tag
    const tagName = tag.name
    
    const listaMangas = info.map((e) => e.Manga); //chamada pros mangas da tag

    const topWeekMangas = listaMangas.map((manga, index) => {
        const padding = index + 1 != listaMangas.length ? "pr-4" : "";
        const className = `pr-4`;

        return (
            <li key={index} className={className}>
                <a
                    // rel="sponsored"
                    href={/*manga.encurtadorLink ||*/ "/read/" + manga.id}
                >
                    <SMangaCardLayer priority={false} manga={manga} />
                </a>
            </li>
        );
    });

    return (
        <div className="mb-10">
            <span className="light-gray2 flex justify-between items-baseline px-6">
                <h2 style={{ fontSize: "1.5rem" }}>{tagName}</h2>
                <a href={`/tag/${tag.urlName}/page/1`}>
                    <span className="pl-3 flex items-center pointer hover:underline">
                        More
                        <ChevronRightIcon
                            className="h-5 w-5 flex-none light-gray2"
                            aria-hidden="true"
                        />
                    </span>
                </a>
            </span>
            <Hr />
                <SCarousel id={tag.id} loadOnView={true} size="md" itens_list={topWeekMangas} />
        </div>
    );
};

const getTopTags = (topMangas) => {
    const t = topMangas.map(e => {
        let tagObj = []
        e.TagsManga.forEach(element => {
            tagObj.push(element.Tag);
        });
        return tagObj
    })
    const tagsList = t.flat()
    const tagsNoRepetition = reduceTagsRepetition(tagsList)

    return tagsNoRepetition
}


const reduceTagsRepetition = (tags) => {
    const lista = tags

    const contador = {};
    const listaSemDuplicatas = lista.reduce((acumulador, objeto) => {
        const chave = `${objeto.name}-${objeto.id}`;
        if (!contador[chave]) {
            contador[chave] = 1;
            acumulador.push({ ...objeto, repeticoes: 1 });
        } else {
            contador[chave]++;
            acumulador.find(
                (item) => item.name === objeto.name && item.id === objeto.id
            ).repeticoes++;
        }
        
        return acumulador;
    }, []);

    const listaOrdenada = listaSemDuplicatas.sort(
        (a, b) => b.repeticoes - a.repeticoes
    );

    // Limitar a lista às 5 tags mais frequentes
    const cincoTagsMaisFrequentes = listaOrdenada.slice(0, 5);

    return cincoTagsMaisFrequentes

}

const getMangaTopTags = async (topTags) => {
    let topWeekTagsmangas = await prisma.$transaction(
        topTags.map((e) => {
            return prisma.tagsManga.findMany({
                take: 13,
                orderBy: {
                    id: "desc",
                },
                where: {
                    tagId: e.id,
                },
                select: {
                    Manga: true,
                    Tag: true,
                },
            });
        })
        
    )
    
    return topWeekTagsmangas
}

export default TopTagsCarousel