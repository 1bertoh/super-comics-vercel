// export const dynamic = "force-dynamic";

import Manga from "@/actions/manga";
import ServerLayerNavbar from "@/app/_ui/serverLayerNavbar";
import Tag from "@/actions/tag";
import Link from "next/link";
import SMangaCardLayer from "@/app/_components/SMangaCardLayer";
import prisma from "@/db"
import Utils from "@/utils/utils";

import { SMain } from "@/app/_components/SMain";
import { SPagination } from "@/app/_components/SPagination";
import { SSection } from "@/app/_components/SSection";
import { redirect } from "next/navigation";

export default async function GET({ params}) {
    const { tagName, page } = params;
    // const {   } = searchParams;

    Utils.isValidNumber(page) || redirect("?page=1");

    const t = new Tag();
    const tags = await t.getTag({ urlName: tagName });
    let title = tags[0]?.name;

    const paginationBase = Utils.getPagination(page, 12);
    const m = new Manga();
    const { mangas, pagination } = await m.getMangas(
        { tagId: tags[0]?.id },
        paginationBase
    );

    const mangas_cards = mangas.map((el, index) => {
        return (
            <div
                key={el.id}
                className="lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 lg:p-3 md:p-3 sm:p-2 p-1"
            >
                <Link
                    // rel="sponsored"
                    href={/*el.encurtadorLink ||*/ "/read/" + el.id}
                >
                    <span className="sr-only">Read the manga {el.name}</span>
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
                    {mangas.length ? (
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
                    <SPagination
                        page={page}
                        path={`/tag/${tagName}/page/${page}`}
                        filteredQueryFlat={[]}
                        lastPage={pagination.pagesTotal}
                    />
                </SSection>
                <br />
                <br />
                <br />
            </SMain>
        </>
    );
}

export async function generateStaticParams() {
    const tags = await prisma.tags.findMany();
    
    const staticParams = [];

    for (const tag of tags) {
        const qntd = await prisma.tagsManga.count({
            where: {
                tagId: tag.id,
            },
        });

        const pagesTotal = Math.ceil(qntd / 12)||1;
        
        for (let page = 1; page <= pagesTotal; page++) {
            const tagName = tag.urlName;
            
            // Adicione a combinação de tagName e page aos parâmetros estáticos
            staticParams.push({ tagName, page: page.toString() });
        }
    }
    
    return staticParams;
}

export async function generateMetadata({ params }) {
    const {tagName} = params
    const [tag, manga] = await prisma.$transaction([
        prisma.tags.findFirst({
            where: {
                urlName: tagName,
            },
        }),
        prisma.manga.findFirst({
            orderBy: {
                id: 'desc'
            },
            where:{
                TagsManga:{
                    some: {
                        Tag: {
                            urlName: {
                                equals: tagName
                            }
                        }
                    },
                }
            }
        })
    ]);

    if(manga) {

        return {
            title: tag.name,
            description: `Mangas Comic - ${tag.name}`,
            alternates: {
                canonical: `https://supercomic.info/tag/${params.tagName}/page/1`,
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
                title: tag.name,
                description:
                    "Are you looking for " +
                    tag.name +
                    " comic? Click to find more on Super Comics, where we offer dozens of the best comic. We are the best and fastest site. Explore now",
                url: "https://supercomic.info",
                images: [
                    {
                        url: manga.coverLg, // Must be an absolute URL
                        width: 1800,
                        height: 1600,
                        alt: "Comic cover",
                    },
                ],
                siteName: "Super comic",
                locale: "en_US",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                site: "https://supercomic.info",
                title: tag.name,
                description:
                    "Are you looking for " +
                    tag.name +
                    " comic? Click to find more on Super Comic, where we offer dozens of the best comics. We are the best and fastest site. Explore now",
                images: {
                    url: manga.coverLg,
                    alt: `Preview image for cover Comic`,
                },
            },
        };
    }
    return {}
}