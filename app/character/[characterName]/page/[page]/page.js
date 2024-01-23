// export const dynamic = "force-dynamic";

import Manga from "@/actions/manga";
import ServerLayerNavbar from "@/app/_ui/serverLayerNavbar";
import Link from "next/link";
import SMangaCardLayer from "@/app/_components/SMangaCardLayer";
import prisma from "@/db"
import Utils from "@/utils/utils";

import { SMain } from "@/app/_components/SMain";
import { SPagination } from "@/app/_components/SPagination";
import { SSection } from "@/app/_components/SSection";
import Character from "@/actions/character";

export default async function GET({ params}) {
    const { characterName, page } = params;

    const c = new Character();
    const char = await c.getCharacter({ urlName: characterName });
    let title = char[0]?.name;
    console.log(char, 'character')

    const paginationBase = Utils.getPagination(page, 12);
    const m = new Manga();
    const { mangas, pagination } = await m.getMangas(
        { characterId: char[0]?.id },
        paginationBase
    );

    const mangas_cards = mangas?.map((el, index) => {
        return (
            <div
                key={el.id}
                className="lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 lg:p-3 md:p-3 sm:p-2 p-1"
            >
                <Link
                    // rel="sponsored"
                    href={/*el.encurtadorLink ||*/ "/read/" + el.id}
                >
                    <SMangaCardLayer priority={false} manga={el} />
                </Link>
            </div>
        );
    });

    return (
        <>
            <ServerLayerNavbar></ServerLayerNavbar>
            <SMain>
                <SSection>
                    <h1 className="capitalize px-3 text-slate-300 text-3xl">
                        {title}
                    </h1>
                    {mangas?.length ? (
                        <div className="flex px-3 flex-wrap">
                            {mangas_cards}
                        </div>
                    ) : (
                        <div className="text-center">
                            <span className="text-3xl text-slate-300">
                                Not Found
                            </span>
                        </div>
                    )}
                    {
                        pagination &&
                        <SPagination
                            page={page}
                            path={`/character/${characterName}/page/${page}`}
                            filteredQueryFlat={[]}
                            lastPage={pagination.pagesTotal}
                        />
                    }
                </SSection>
                <br />
                <br />
                <br />
            </SMain>
        </>
    );
}

export async function generateStaticParams() {
    const chars = await prisma.character.findMany();
    
    const staticParams = [];

    for (const char of chars) {
        const qntd = await prisma.characterManga.count({
            where: {
                characterId: char.id,
            },
        });

        const pagesTotal = Math.ceil(qntd / 12)||1;
        
        for (let page = 1; page <= pagesTotal; page++) {
            const characterName = char.urlName;
            
            // Adicione a combinação de tagName e page aos parâmetros estáticos
            staticParams.push({ characterName, page: page.toString() });
        }
    }
    
    return staticParams;
}

export async function generateMetadata({ params }) {
    const { characterName } = params;
    
    const [char, manga] = await prisma.$transaction([
        prisma.character.findFirst({
            where: {
                urlName: characterName,
            },
        }),
        prisma.manga.findFirst({
            orderBy: {
                id:'desc'
            },
            where: {
                CharacterManga: {
                    some: {
                        Character: {
                            urlName: characterName,
                        },
                    },
                },
            },
        }),
    ]);

    return {
        title: char.name,
        description: char.name + " comic",
        alternates: {
            canonical: `https://supercomic.info/character/${characterName}/page/1`,
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            title: char.name,
            description:
                "Are you looking for " +
                char.name +
                " comic? Click to find more on Super Comics, where we offer dozens of the best comic. We are the best and fastest site. Explore now",
            siteName: "Super Comics",
            locale: "en_US",
            images: [
                {
                    url: manga.coverLg, // Must be an absolute URL
                    width: 1800,
                    height: 1600,
                    alt: "Comic cover",
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            site: "https://supercomic.info",
            title: char.name,
            description:
                "Are you looking for " +
                char.name +
                " comic? Click to find more on Super Comics, where we offer dozens of the best comics. We are the best and fastest site. Explore now",
            images: {
                url: manga.coverLg,
                alt: `Preview image for the comic cover`,
            },
        },
    };
}