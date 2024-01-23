import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { SSection } from "./_components/SSection.js";
import { SCarousel } from "./_components/SCarousel.js";
import { Hr } from "./_components/SHr.js";
import ServerLayerNavbar from "./_ui/serverLayerNavbar.js";
import prisma from "@/db.ts";
import SMangaCardLayer from "./_components/SMangaCardLayer.js";
import dynamic from "next/dynamic.js";
import { SMain } from "./_components/SMain.js";

// Import dinâmico para o componente HelpAdsModal
const TopTagsCarousel = dynamic(
    () => import("./topTagsCarousel.js"),
    { ssr: false }
);

export default async function Home() {
    const {listTopWeek, topMangas} = await generateTopWeek();

    return (
        <>
            <ServerLayerNavbar></ServerLayerNavbar>
            <SMain>

                <h1 className="sr-only">Super Comic</h1>
                <SSection>
                    <h2 className="ml-6">Popular</h2>
                    <Hr />
                    {/* Para um tamanho de leitura */}
                    {/* <Image src={'/mangas/1/1.jpg'} alt='cover' width={1032} height={1427}></Image> */}
                    <SCarousel size="lg" lazyLoad="progressive" id="top-tags" itens_list={listTopWeek} />
                    {/* <ol className='list-none'>
                    {topweek_images}
                  </ol> */}
                </SSection>
                <br />
                <br />
                <br />

                <SSection>
                    <RecentCarouselRow />
                    <TopTagsCarousel topMangas={topMangas}/>
                </SSection>
            </SMain>
        </>
    );
}

async function generateTopWeek() {
    const dataAtual = new Date();

    // Subtrair sete dias da data atual
    const dataUmaSemanaAtras = new Date(dataAtual);
    dataUmaSemanaAtras.setDate(dataAtual.getDate() - 1);

    // Agora, dataUmaSemanaAtras contém a data de uma semana atrás

    const listaMangas = await prisma.manga.findMany({
        take: 5,
        include:{
            TagsManga:{
                select: {
                    Tag: {
                        select: {
                            name: true,
                             id: true
                        }
                    }
                }
            }
        },
        orderBy: {
            views: "desc",
        },
        where: {
            createAt: {
                gte: dataUmaSemanaAtras,
            },
        },
    });

    let listTopWeek = listaMangas.map((manga, index) => {
        const padding = "pr-4";
        const className = `${padding}`;
        return (
            <li
                key={index}
                style={{ minHeight: 385, padding: 2 }}
                className={className}
            >
                <a
                    // rel="sponsored"
                    href={/*manga.encurtadorLink ||*/ "/read/" + manga.id}
                >
                    <SMangaCardLayer
                        priority={true}
                        manga={manga}
                        index={index}
                    />
                    <span className="sr-only">read {manga.name}</span>
                </a>
            </li>
        );
    });

    return {listTopWeek, topMangas: listaMangas};
}


const RecentCarouselRow = async () => {

    const listaMangas = await prisma.manga.findMany({
        take: 13,
        orderBy: {
            id: "desc",
        },
    });

    const recentWeekMangas = listaMangas.map((manga, index) => {
        const padding = index + 1 != listaMangas.length ? "pr-4" : "";
        const className = `pr-4`;

        return (
            <li key={index} className={className}>
                <a
                    // rel="sponsored"
                    href={/*manga.encurtadorLink ||*/ "/read/" + manga.id}
                >
                    <SMangaCardLayer priority={false} manga={manga} />
                    <span className="sr-only">read {manga.name}</span>
                </a>
            </li>
        );
    });

    return (
        <div className="mb-10">
            <span className="light-gray2 flex justify-between items-baseline px-6">
                <h2 style={{ fontSize: "1.5rem" }}>Recents</h2>
                <a href={"/all/manga/page/1"}>
                    <span className="sr-only">Check out all of our mangas</span>
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
            <SCarousel
                id="recents"
                size="md"
                lazyLoad="progressive"
                itens_list={recentWeekMangas}
            />
        </div>
    );
};

export async function generateMetadata() {
    return {
        title: "Super Comic: The best reading site for comic",
        description:
            "Super Comic is a free comic reader. The <strong>cleaner and faster platform</strong>.",
        alternates: {
            canonical: `https://supercomic.info/`,
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
            title: "Super Comic: The best comic reader",
            description:
                "Super Comic is a free comic reader. The <strong>cleaner and faster platform</strong>.",
            url: "https://supercomic.info",
            images: [
                {
                    url: "", // Must be an absolute URL
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
            title: "Super Comic: The best comic reader",
            description:
                "Super Comic is a free comic reader. The <strong>cleaner and faster platform</strong>.",
            images: {
                url: "",
                alt: `Preview image for cover Comic`,
            },
        },
    };
}