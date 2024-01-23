"use client";
import Image from "next/image";
import vip from "@/public/images/vip-icon.gif"
// import load from ""
import Utils from "@/utils/utils";
/**manga: {Manga}, index: integer | undefined
 */
export default function SMangaGoldenCard(props) {
    const { manga, index, priority } = props;
    
    const vipSrc = vip.src;
    // const lo = load.blurDataURL

    return (
        <div
            className="section-golden-item-bg relative section-item rounded-lg light-gray2"
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
                    // placeholder="blur"
                    // blurDataURL={lo}
                    priority={priority}
                    loader={({ src, width: w, quality }) => {
                        const q = quality || 75;
                        return `${src}?w=${w}&q=${q}`;
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
            <div className=" text-sm text-yellow-400 text-justify p-2">
                <span
                    className="truncate-4-rows"
                    style={{ fontSize: "clamp(72%, 3vw, 92%)" }}
                >
                    {manga.fullName}
                </span>
            </div>
            <Image
                alt="vip comic"
                src={vipSrc}
                className="golden-vip-icon rounded-full"
                width={30}
                loading="lazy"
                height={30}
                loader={({ src, width: w, quality }) => {
                    const q = quality || 75;
                    return `${src}`;
                }}
            />
        </div>
    );
}
