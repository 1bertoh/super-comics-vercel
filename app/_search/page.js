export const dynamic = "force-dynamic";

import Manga from "@/actions/manga";
import { SMain } from "../_components/SMain";
import { SPagination } from "../_components/SPagination";
import { SSection } from "../_components/SSection";
import Utils from "@/utils/utils";
import { redirect } from "next/navigation";
import ServerLayerNavbar from "../_ui/serverLayerNavbar";
import Link from "next/link";
import SMangaCardLayer from "../_components/SMangaCardLayer";

export default async function GET(request) {
    const query = request.searchParams;

    const { page, q } = query;

    if (!("q" in query) && Object.keys(query).length > 1) {
        // Se 'page' não estiver presente, redirecionar para a mesma página com 'page=1'
        const redirectUrl = `/page/1`;
        redirect(redirectUrl);
    } else if (!("page" in query) || !Utils.isValidNumber(page)) {
        // Se 'page' não estiver presente, redirecionar para a mesma página com 'page=1'
        const redirectUrl = `?page=1&q=${q}`;
        redirect(redirectUrl);
    }

    const filter = q ? { name: q } : {};

    const { mangas, pagination } = await getMangas(Number(page), filter);

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
                    <span className="capitalize px-3 text-slate-300 text-3xl">
                        {q}
                    </span>
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
                        filteredQueryFlat={q ? ["q", q] : []}
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

async function getMangas(page, query) {
    const paginationBase = Utils.getPagination(page, 12);
    const m = new Manga();
    const res = await m.getMangas(query, paginationBase);

    return res;
}
