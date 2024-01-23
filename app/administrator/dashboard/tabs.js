"use client";
// import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MangaForm from "./mangaForm";
import Author from "./authorForm";
import Tag from "./tagForm";
import Language from "./languageForm";
import Parody from "./parodyForm";
import Category from "./categoryForm";
import CharacterForm from "./characterForm";

export default function Tabs() {
    // const { data: session, status /*Loading */ } = useSession();
    const [tab, setTab] = useState(1);
    const [isReady, setIsReady] = useState(false);
    const tabs = [
        "manga",
        "Author",
        "Tag",
        "Language",
        "Parody",
        "Category",
        "Character",
    ];
    const generateTabs = tabs.map((e, index) => {
        index = index + 1;
        return (
            <li key={index} className="me-2">
                <span
                    onClick={() => setTab(index)}
                    aria-current="page"
                    className={`inline-block p-4 rounded-t-lg cursor-pointer ${
                        tab === index
                            ? " bg-gray-100 text-blue-600 active dark:bg-gray-800 dark:text-blue-500"
                            : " hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    }`}
                >
                    {e}
                </span>
            </li>
        );
    });

    let renderForm = () => {
        switch (tab) {
            case 1:
                return <MangaForm />;
            case 2:
                return <Author />;
            case 3:
                return <Tag />;
            case 4:
                return <Language />;
            case 5:
                return <Parody />;
            case 6:
                return <Category />;
            case 7:
                return <CharacterForm />;
        }
    };

    useEffect(() => {
        setIsReady(true);
    }, []);

    return (
        <>
            {isReady && (
                <>
                    <div className="flex justify-between px-4">
                        <h1 className="text-2xl font-bold text-slate-300">
                            Dashboard
                        </h1>

                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() =>
                                signOut({ callbackUrl: "/administrator" })
                            }
                        >
                            Logout
                        </button>
                    </div>
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        {generateTabs}
                    </ul>
                    <div className="pt-3">{renderForm()}</div>
                </>
            )}
        </>
    );
}
