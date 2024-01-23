'use client'

import { useEffect } from "react";

const { ArrowUpIcon } = require("@heroicons/react/24/outline")

const GotoTop = () => {

    useEffect(() => {
            let e = document.getElementById("go-top");

            e.addEventListener("click", () =>
                window.scrollTo({ top: 0, behavior: "smooth" })
            );
    }, []);

    return(
        <div className="fixed right-3 bg-slate-100 rounded-full p-1 cursor-pointer opacity-20 hover:opacity-80" id="go-top" style={{top: '90vh'}}>
            <ArrowUpIcon className="w-8 h-8"/>
        </div>
    )
}

export default GotoTop