// export const dynamic = "force-dynamic";
import { SMain } from "@/app/_components/SMain";
import { SPagination } from "@/app/_components/SPagination";
import { SSection } from "@/app/_components/SSection";
import Utils from "@/utils/utils";
import { redirect } from "next/navigation";
import ServerLayerNavbar from "@/app/_ui/serverLayerNavbar";
// import getMangasByQuery from "./getMangasByQuery";
import Link from "next/link";
import Category from "@/actions/category";
import SMangaCardLayer from "@/app/_components/SMangaCardLayer";
import prisma from "@/db";
import Manga from "@/actions/manga";

export default async function GET(props) {
    const { categoryName, page} = props.params;

    const c = new Category();
    const categories = await c.getCategory({ urlName: categoryName });
    let title = categories[0].name;

    categories.length || redirect("/category");

    const paginationBase = Utils.getPagination(page, 12);
 
    const m = new Manga();
    const { mangas, pagination } = await m.getMangas(
        { categoryId: categories[0].id },
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
                        path={`/category/${categoryName}/page/${page}`}
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
    const categories = await prisma.category.findMany();

    const staticParams = [];

    for (const category of categories) {
        const qntd = await prisma.categoryManga.count({
            where: {
                categoryId: category.id 
            },
        });

        const pagesTotal = Math.ceil(qntd / 12)||1;

        for (let page = 1; page <= pagesTotal; page++) {
            const categoryName = category.urlName;

            // Adicione a combinação de categoryName e page aos parâmetros estáticos
            staticParams.push({ categoryName, page: page.toString() });
        }
    }

    return staticParams;
}

export async function generateMetadata({ params }) {
    const { categoryName } = params;

    const [cat, manga] = await prisma.$transaction([
        prisma.category.findFirst({
            where: {
                urlName: categoryName,
            },
        }),
        prisma.manga.findFirst({
            where: {
                CategoryManga: {
                    some: {
                        Category: {
                            urlName: categoryName,
                        },
                    },
                },
            },
        }),
    ]);
    return {
        title: cat.name,
        description: "The best Comics " + cat.name,
        alternates: {
            canonical: `https://supercomic.info/category/${categoryName}/page/1`,
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
            title: cat.name,
            description:
                "Are you looking for " +
                cat.name +
                " comic? Click to find more on Super Comics, where we offer dozens of the best comics. We are the best and fastest site. Explore now",
            siteName: "Super Comics",
            images: [
                {
                    url: manga.coverLg, // Must be an absolute URL
                    width: 1800,
                    height: 1600,
                    alt: "Comic cover",
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            site: "https://supercomic.info",
            title: cat.name,
            description:
                "Are you looking for " +
                cat.name +
                " comic? Click to find more on Super Comics, where we offer dozens of the best comics. We are the best and fastest site. Explore now",
            images: {
                url: manga.coverLg,
                alt: `Preview image for the comic cover`,
            },
        },
    };
}