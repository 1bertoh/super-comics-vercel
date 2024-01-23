import { SSection } from "@/app/_components/SSection";
import { SMain } from "@/app/_components/SMain";
import ReadCoverImage from "./readCoverImage";
import ReadPageImage from "./readPageImage";
import ServerLayerNavbar from "@/app/_ui/serverLayerNavbar";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import SMangaCard from "../../_components/SMangaCard";
import prisma from "@/db";
import { SCarousel } from "../../_components/SCarousel";
import { Hr } from "../../_components/SHr";
import Manga from "@/actions/manga";
import SMangaCardLayer from "@/app/_components/SMangaCardLayer";
import GotoTop from "@/app/_components/SGotoTop";

export default async function Home({ params }) {
    const { idManga } = params;
    const m = new Manga();
    const mangaRes = await m.getManga({ mangaId: idManga, full: true });
    await m.increaseView({mangaId: idManga})

    let mangaJson = mangaRes;
    const manga = mangaJson;

    const createAt = new Date(manga.createAt);
    const pages = manga.Page;

    const tags = manga.TagsManga.map((e) => {
        const tag = e.Tag;
        return (
            <Link href={`/tag/${tag.urlName}/page/1`} key={tag.id}>
                <span className="sr-only">{"Manga's tag "} {tag.name}</span>
                <span className="pointer bg-white hover:bg-slate-200 text-black py-1 px-2 mx-1 rounded-full">
                    {tag.name}
                </span>
            </Link>
        );
    });
    
    const categories = manga.CategoryManga.map((e) => {
        const cat = e.Category;
        return (
            <Link href={`/category/${cat.urlName}/page/1`} key={cat.id}>
                <span className="sr-only">{"Manga's category "} {cat.name}</span>
                <span className="pointer bg-white hover:bg-slate-200 text-black py-1 px-2 mx-1 rounded-full">
                    {cat.name}
                </span>
            </Link>
        );
    });

    const authors = manga.AuthorManga.map((e) => {
        const author = e.Author;
        return (
            <Link href={`/author/${author.urlName}/page/1`} key={author.id}>
                <span className="sr-only">{"Manga's author "} {author.name}</span>
                <span className="pointer bg-white hover:bg-slate-200 text-black py-1 px-2 mx-1 rounded-full">
                    {author.name}
                </span>
            </Link>
        );
    });
    const characters = manga.CharacterManga.map((e) => {
        const character = e.Character;
        return (
            <Link href={`/character/${character.urlName}/page/1`} key={character.id}>
                <span className="sr-only">{"Manga's character "} {character.name}</span>
                <span className="pointer bg-white hover:bg-slate-200 text-black py-1 px-2 mx-1 rounded-full">
                    {character.name}
                </span>
            </Link>
        );
    });

    return (
        <>
            <ServerLayerNavbar></ServerLayerNavbar>
            <SMain>
                <h1 className="sr-only">Reading Comic {manga.fullName}</h1>
                <SSection>
                    <h2 className="text-bold px-10">{manga.fullName}</h2>
                    <div className="flex gap-10 flex-wrap mt-2 px-10">
                        <div style={{ width: 320 }} className="lg:mx-0 mx-auto">
                            <ReadCoverImage manga={manga} />
                        </div>
                        <div className="manga-info-container light-gray2">
                            <p>
                                <span className="light-gray1 leading-7">
                                    Author:
                                </span>{" "}
                                <span className="hover:underline-offset-2 hover:text-slate-400">
                                    {authors}
                                </span>
                            </p>
                            {manga.groups && <p>Groups: </p>}
                            <p>
                                <span className="light-gray1 leading-7">
                                    Parody:
                                </span>{" "}
                                <Link
                                    href={`/parody/${manga.parody.urlName}/page/1`}
                                >
                                    <span className="sr-only">{"Manga's parody "} {manga.parody.name}</span>
                                    <span className="hover:text-slate-400">
                                        {manga.parody.name}
                                    </span>
                                </Link>
                            </p>
                            <p className="flex flex-wrap">
                                <span className="light-gray1 leading-7">
                                    Characters:
                                </span>{" "}
                                <span className="inline-flex flex-wrap gap-y-2">
                                    {characters}
                                </span>
                            </p>
                            <p>
                                <span className="light-gray1 leading-7">
                                    Language:
                                </span>{" "}
                                <Link
                                    href={`/language/${manga.language.urlName}/page/1`}
                                >
                                    <span className="sr-only">{"Manga's language "} {manga.language.name}</span>
                                    <span className="hover:text-slate-400">
                                        {manga.language.name}
                                    </span>
                                </Link>
                            </p>
                            <p className="flex flex-wrap">
                                <span className="light-gray1 leading-7">
                                    Tags:
                                </span>{" "}
                                <span className="inline-flex flex-wrap gap-y-2">
                                    {tags}
                                </span>
                            </p>
                            <p className="flex flex-wrap">
                                <span className="light-gray1 leading-7">
                                    Categories:
                                </span>{" "}
                                <span className="inline-flex flex-wrap gap-y-2">
                                    {categories}
                                </span>
                            </p>
                            <p>
                                <span className="light-gray1 leading-7">
                                    Collection:
                                </span>{" "}
                                {manga.collection}
                            </p>
                            <p>
                                <span className="light-gray1 leading-7">
                                    Pages:
                                </span>{" "}
                                {manga.pages}
                            </p>
                            <p>
                                <span className="light-gray1 leading-7">
                                    Uploaded:
                                </span>{" "}
                                {createAt.toLocaleDateString("pt-Br")}
                            </p>
                            {/* <p>
                                <span className="light-gray1 leading-7">
                                    Views:
                                </span>{" "}
                                {manga.views}
                            </p> */}
                        </div>
                    </div>
                </SSection>
                <br />
                <br />
                <br />
                <br />
                <br />
                <SSection gradientDirecton="black-to-white">
                    <div>
                        {pages.map((e) => (
                            <div key={e} className="my-3">
                                <ReadPageImage page={e} />
                            </div>
                        ))}
                    </div>
                </SSection>
                <br />
                <br />
                <br />
                <SSection>
                    <CollectionCarouselRow manga={manga} />
                    <RecommendedCarouselRow
                        tags={manga.TagsManga}
                        authorsId={manga.AuthorManga.map((e) =>
                            Number(e.authorId)
                        )}
                        parodyId={manga.parodyId}
                        categoryId={manga.categoryId}
                        mangaId={manga.id}
                    />
                </SSection>
                <GotoTop/>
            </SMain>
        </>
    );
}

const CollectionCarouselRow = async ({ manga }) => {
    const collection = manga.collection;
    const listaMangas = await prisma.manga.findMany({
        take: 8,

        where: {
            collection: collection,
            id: { not: manga.id },
        },
    });

    const recentWeekMangas = listaMangas.map((manga, index) => {
        const padding = index + 1 != listaMangas.length ? "pr-4" : "";
        const className = `pr-4`;

        return (
            <div key={index} className={className}>
                <a href={"/read/" + manga.id}>
                    <span className="sr-only">{"Read comic"} {manga.name}</span>
                    <SMangaCard manga={manga} />
                </a>
            </div>
        );
    });

    return (
        <>
            {Boolean(listaMangas.length) && (
                <div className="mb-10">
                    <span className="light-gray2 flex justify-between items-baseline px-6">
                        <h2 style={{ fontSize: "1.5rem" }}>Collection</h2>
                        {listaMangas.length === 8 && (
                            <Link href={"/search/page/1"}>
                                <span className="pl-3 flex items-center pointer hover:underline">
                                    More
                                    <ChevronRightIcon
                                        className="h-5 w-5 flex-none light-gray2"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Link>
                        )}
                    </span>
                    <Hr />
                    <SCarousel size="md" itens_list={recentWeekMangas} />
                </div>
            )}
        </>
    );
};

async function RecommendedCarouselRow({
    categoryId,
    languageId,
    authorsId,
    parodyId,
    tags,
    mangaId,
    limit = 10,
}) {
    const tagsId = tags.map((e) => e.tagId);

    let mangas = await prisma.manga.findMany({
        where: {
            AND: [
                {
                    NOT:[
                        {id:{equals:mangaId}}
                    ]
                },
                {
                    OR: [
                        { AuthorManga:{some: {authorId: {in: authorsId}}} },
                        { parodyId: { equals: Number(parodyId) } },
                    ],
                }
            ]
        },
        take: limit,
    });

    // Verifica se o número de mangas retornados é menor que o limite
    if (mangas.length < limit) {
        const remainingLimit = limit - mangas.length;

        const remainingMangas = await prisma.manga.findMany({
            where: {
                AND: [
                    {
                        NOT: [
                            { AuthorManga: { some: {authorId: {in: authorsId}}}},
                            { parodyId: { equals: Number(parodyId) } },
                            {id: {equals: mangaId}}
                        ],
                    },
                    {
                        OR: [
                            { TagsManga: { some: { tagId: { in: tagsId } } } },
                            // Adicione outras condições aqui, se necessário
                            { languageId: { equals: languageId } },
                        ],
                    },
                ],
            },
            take: remainingLimit,
        });

        // Concatena os resultados
        mangas.push(...remainingMangas);
    }


    const recentWeekMangas = mangas.map((manga, index) => {
        const padding = index + 1 != mangas.length ? "pr-4" : "";
        const className = `pr-4`;

        return (
            <li key={index} className={className}>
                <a href={/*manga.encurtadorLink ||*/ "/read/" + manga.id}>
                    <SMangaCardLayer priority={false} manga={manga} />
                </a>
            </li>
        );
    });

    return (
        <>
            {Boolean(mangas.length) && (
                <div className="mb-10">
                    <span className="light-gray2 flex justify-between items-baseline px-6">
                        <h2 style={{ fontSize: "1.5rem" }}>Recommended</h2>
                    </span>
                    <Hr />
                    <SCarousel size="md" itens_list={recentWeekMangas} />
                </div>
            )}
        </>
    );
}

export async function generateStaticParams() {
    const r = await prisma.manga.findMany();
    return r.map((manga) => ({
        idManga: manga.id.toString(),
    }));
}

export async function generateMetadata({ params }) {
    const manga = await prisma.manga.findUnique({
        where: {
            id: Number(params.idManga),
        },
        include:{
            parody: true
        }
    });
    return {
        title: manga.name,
        description: manga.name + " - " + manga.parody.name,
        alternates: {
            canonical: `https://supercomic.info/read/${manga.id}`,
        },
        openGraph: {
            title: manga.name,
            description:
                "Enjoyed this comic? Click to read more on Super Comics, where we offer dozens of the best comics. We are the best and fastest site. Explore now",
            url: "https://supercomics.info",
            siteName: "Super comics",
            images: [
                {
                    url: manga.coverLg, // Must be an absolute URL
                    width: 800,
                    height: 600,
                    alt: "Comic cover",
                },
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
            card: "summary_large_image", //'summary', 'summary_large_image', 'app', 'media'
            site: "https://supercomic.info",
            title: manga.fullName,
            description:
                "Enjoyed this comic? Click to read more on Super Comics, where we offer dozens of the best comics. We are the best and fastest site. Explore now",
            images: {
                url: manga.coverLg,
                alt: `Preview image for the comic cover`,
            },
        },
    };
}
