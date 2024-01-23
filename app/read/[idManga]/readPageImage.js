'use client'
import Utils from "@/utils/utils";
import Image from "next/image";

export default function ReadPageImage({page}){
    return(
        <Image
            src={page.url}
            className="rounded-xl mx-auto"
            alt={"comic " + page.alt}
            sizes="auto"
            width={page.width}
            height={page.height}
            loader={({ src, width: w, quality }) => {
                const q = quality || 75;
                return `${src}?w=${w}&q=${q}`;
            }}
        />
    )
}