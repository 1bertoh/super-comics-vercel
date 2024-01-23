// export const dynamic = "force-dynamic";

import Manga from "@/actions/manga";
import { SMain } from "@/app/_components/SMain";
import { SPagination } from "@/app/_components/SPagination";
import { SSection } from "@/app/_components/SSection";
import Utils from "@/utils/utils";
import { redirect } from "next/navigation";
import ServerLayerNavbar from "@/app/_ui/serverLayerNavbar";
import Link from "next/link";
import Author from "@/actions/author";
import SMangaCardLayer from "@/app/_components/SMangaCardLayer";
import prisma from "@/db";

export default async function GET(props) {
    const { page } = props.params;

    // Utils.isValidNumber(page) || redirect("?page=1");

    const a = new Manga();
    // const authors = await a.getAuthor({ urlName: authorName });
    // let title = authors[0].name;

    // authors.length || redirect("/author");

    const paginationBase = Utils.getPagination(page, 12);
    const m = new Manga();
    const { mangas, pagination } = await m.getMangas({},paginationBase);

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
                        All
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
                        path={"/all/manga/page/"+page}
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

// export async function generateStaticParams() {
//     const r = await prisma.author.findMany();
//     return r.map((author) => ({
//         authorName: author.name.trim().replace(" ", "-"),
//     }));
// }

export async function generateStaticParams() {
    const authors = await prisma.author.findMany();

    const staticParams = [];

    for (const author of authors) {
        const qntd = await prisma.manga.count();

        const pagesTotal = Math.ceil(qntd / 12) || 1;

        for (let page = 1; page <= pagesTotal; page++) {
            const authorName = author.urlName;

            // Adicione a combinação de authorName e page aos parâmetros estáticos
            staticParams.push({ authorName, page: page.toString() });
        }
    }

    return staticParams;
}
