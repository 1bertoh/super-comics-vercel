import SMangaCard from "./SMangaCard";
import SMangaGoldenCard from "./SMangaGoldenCard";

/**
 * 
 * @param {{manga:List, index: Number, priority: Boolean}} props 
 * @returns 
 */
export default function SMangaCardLayer(props) {
    const { manga, index } = props;
    const priority = Boolean(props.priority)
    const hasEncurtador = /*Boolean(manga?.encurtadorLink?.trim())*/ true

    return (
        <>
            {hasEncurtador ? (
                <SMangaGoldenCard
                    priority={priority}
                    index={index}
                    manga={manga}
                />
            ) : (
                <SMangaCard index={index} manga={manga} />
            )}
        </>
    );
}