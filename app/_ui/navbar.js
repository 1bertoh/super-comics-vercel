"use client";

import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "./dropDown.js";
import SideMenuDropdown from "./sideMenuDropdown.js";
import Link from "next/link.js";
import { useRouter } from "next/navigation";

export default function Navbar(props) {
    const { tags, languages } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [serchInput, setSearchInput] = useState("");

    const router = useRouter();

    const openSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const getInput = ({ target }) => {
        const value = target.value;

        setSearchInput(value?.trim());
    };

    const search = (e) => {
        e.preventDefault();
        e.stopPropagation();

        router.push("/search/?page=1&q=" + serchInput);
    };

    let lastScrollTop = 0;

    if (typeof window !== "undefined") {
        // Client-side-only code
        window.addEventListener("scroll", () => {
            const currentScrollTop =
                window.scrollY || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                // Scrolling down
                document.querySelector("header").style.top = "-100px"; // Esconda a barra de navegação
            } else {
                // Scrolling up
                document.querySelector("header").style.top = "2rem"; // Exiba a barra de navegação
            }

            lastScrollTop = currentScrollTop;
        });
    }

    return (
        <header
            style={{ transition: "top ease-out 0.5s" }}
            className={`navbar-dark-bg-70  w-11/12 sm:w-7/12 m-auto fixed top-8 ${
                !searchOpen ? "nav-all-rounded" : "nav-t-rounded"
            }`}
        >
            <nav
                className={`mx-auto flex max-w-7xl items-center justify-between p-2 px-3 lg:px-8 ${
                    mobileMenuOpen ? "sr-only" : "flex"
                }`}
                aria-label="Global"
            >
                <div className="flex ">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="text-white font-bold">
                            Super Comics
                        </span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon
                            className="h-6 light-gray1 w-6"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <div className="flex">
                        <Link
                            href="/"
                            className="text-sm font-semibold leading-6 text-white pr-3 inline-block"
                        >
                            Home
                        </Link>
                        <Dropdown name="tag" list={tags} />
                        <Dropdown name="language" list={languages} />
                        <Link
                            href="/about"
                            className="text-sm font-semibold leading-6 light-gray1 pr-3 inline-block"
                        >
                            About/Contact
                        </Link>
                    </div>
                </Popover.Group>
                <div
                    className="hidden text-slate-300 lg:inline" /*onClick={openSearch}*/
                >
                    {/*searchOpen ? (
                            <XMarkIcon
                            className="h-6 light-gray1 w-6 pointer"
                            aria-hidden="true"
                            />
                            ) : (
                                <MagnifyingGlassIcon
                                className="h-6 light-gray1 w-6 pointer"
                                aria-hidden="true"
                                />
                            )*/}
                    <Link href={"/all/manga/page/1"}>All</Link>
                </div>
                {/* <form
                    action="#"
                    onSubmit={(e) => search(e)}
                    className={`absolute w-full bg-white search-area ${
                        searchOpen
                            ? "search-area-active"
                            : "search-area-inactive"
                    }`}
                >
                    <input
                        type="text"
                        className="rounded-b-full w-full text-lg pl-3 lg:pl-8"
                        autoFocus
                        onChange={(e) => {
                            getInput(e);
                        }}
                    />
                    <MagnifyingGlassIcon
                        className="h-30 cursor-pointer light-gray1 w-7 mr-3 lg:mr-8"
                        aria-hidden="true"
                        onClick={(e) => search(e)}
                    />
                </form> */}
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed navbar-dark-bg-95 inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 sidebar-dark-bg-95">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="font-bold text-2xl text-white">
                                Super Marvel
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon
                                className="h-6 text-white w-6"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    <div className="my-5 text-slate-300 relative">
                        {/* <form action="#" onSubmit={(e) => search(e)}>
                            <input
                                type="text"
                                className="rounded-full w-full text-lg pl-3 pr-8"
                                onChange={(e) => {
                                    getInput(e);
                                }}
                            />
                            <MagnifyingGlassIcon
                                style={{ right: "1%", top: "2px" }}
                                className="absolute cursor-pointer h-6 light-gray1 w-6"
                                aria-hidden="true"
                                onClick={(e) => search(e)}
                            />
                        </form> */}
                        <Link href={"/all/manga/page/1"}>All</Link>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white item-navbar hover:bg-gray-50"
                                >
                                    Home
                                </Link>
                                <SideMenuDropdown name="tag" list={tags} />
                                <SideMenuDropdown
                                    name="language"
                                    list={languages}
                                />
                                <a
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 item-navbar light-gray1 hover:bg-gray-50 "
                                >
                                    About/Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
