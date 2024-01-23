'use client'
import Utils from "@/utils/utils";
import Image from "next/image";
/**manga: {Manga}, index: integer | undefined
 */
export default function SMangaCard(props){
    const {manga, index, priority} = props

    return (
        <div
            className="section-item-bg section-item rounded-lg light-gray2"
            id="carousel-item-container"
        >
            <div className="relative cursor-pointer">
                <Image
                    src={manga.coverSm || manga.cover_sm}
                    alt="comic-cover"
                    width={230}
                    sizes="auto"
                    height={300}
                    id="image"
                    priority={priority}
                    loader={({ src, width: w, quality }) => {
                        const q = quality || 75;
                        return `${(
                            src
                        )}?w=${w}&q=${q}`;
                    }}
                    className="rounded-t-lg w-full"
                ></Image>
                {index != undefined && (
                    <span
                        className=" ranking-mask absolute right-px chubby-font"
                        style={{ lineHeight: 0.7 }}
                    >
                        {index + 1}
                    </span>
                )}
            </div>
            <div style={{fontSize: "clamp(72%, 3vw, 92%)"}} className=" text-sm text-justify p-2">
                <span className="truncate-4-rows">{manga.fullName}</span>
            </div>
        </div>
    );
}