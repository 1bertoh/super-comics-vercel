'use client'
import Utils from "@/utils/utils";
import Image from "next/image";

export default function ReadCoverImage({manga}){
    return (
        <Image
            src={Utils.getHostingerImages(manga.coverLg)}
            className="rounded-xl mx-auto"
            alt={"comic - "+manga.name + " cover"}
            sizes="auto"
            width={320}
            height={427}
            loader={({ src, width: w, quality }) => {
                const q = quality || 75;
                return `${src}?w=${w}&q=${q}`;
            }}
        />
    );
}