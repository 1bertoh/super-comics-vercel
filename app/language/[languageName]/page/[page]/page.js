// export const dynamic = "force-dynamic";

import Manga from "@/actions/manga";
import { SMain } from "@/app/_components/SMain";
import { SPagination } from "@/app/_components/SPagination";
import { SSection } from "@/app/_components/SSection";
import Utils from "@/utils/utils";
import { redirect } from "next/navigation";
import ServerLayerNavbar from "@/app/_ui/serverLayerNavbar";
import Link from "next/link";
import Language from "@/actions/language";
import SMangaCardLayer from "@/app/_components/SMangaCardLayer";
import prisma from "@/db";

export default async function GET(props) {
    const { languageName, page } = props.params;

    Utils.isValidNumber(page) || redirect("?page=1");

    const l = new Language();
    const languages = await l.getLanguage({ urlName: languageName });
    const title = languages[0].name;

    languages.length || redirect("/language");

    const paginationBase = Utils.getPagination(page, 12);
    const m = new Manga();
    const { mangas, pagination } = await m.getMangas(
        { languageId: languages[0].id },
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
                        path={`/language/${languageName}/page/${page}`}
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
    const languages = await prisma.language.findMany();

    const staticParams = [];

    for (const lang of languages) {
        const qntd = await prisma.manga.count({
            where: {
                language: {
                    id: lang.id
                },
            },
        });

        const pagesTotal = Math.ceil(qntd / 12)||1;

        for (let page = 1; page <= pagesTotal; page++) {
            const languageName = lang.urlName;

            // Adicione a combinação de languageName e page aos parâmetros estáticos
            staticParams.push({ languageName, page: page.toString() });
        }
    }

    return staticParams;
}

export async function generateMetadata({ params }) {
    const { languageName } = params;
    const l = new Language();

    const [lan, manga] = await prisma.$transaction([
        prisma.language.findFirst({
            where: {
                urlName: languageName,
            },
        }),
        prisma.manga.findFirst({
            orderBy: {
                id: 'desc'
            },
            where: {
                language: {
                    urlName: languageName
                }
            },
        }),
    ]);

    return {
        title: lan.name,
        description: "Comic in " + lan.name,
        alternates: {
            canonical: `https://supercomic.info/language/${languageName}/page/1`,
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
            title: lan.name,
            description:
                "Are you looking for " +
                lan.name +
                " comic? Click to find more on Super Comics, where we offer dozens of the best comics. We are the best and fastest site. Explore now",
            siteName: "Super comics",
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
            title: lan.name,
            description:
                "Are you looking for " +
                lan.name +
                " comic? Click to find more on Super Comics, where we offer dozens of the best comics. We are the best and fastest site. Explore now",
            images: {
                url: manga.coverLg,
                alt: `Preview image for the comic cover`,
            },
        },
    };
}