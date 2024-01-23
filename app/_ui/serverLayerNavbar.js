import Tag from "@/actions/tag";
import Navbar from "./navbar";
import Language from "@/actions/language";

export default async function ServerLayerNavbar() {
    const tags = new Tag();
    const topTags = await tags.getTopTags();

    const lang = new Language()
    const languages = await lang.getLanguage({})

    return(
        <Navbar tags={topTags.message} languages={languages}/>
    )
}