import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment} from "react";

/**
 * 
 * @param {{name: String, list: Array}} props 
 * @returns 
 */
export default function Dropdown(props){
    let {name, list} = props

    return (
        <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 light-gray1 px-3 capitalize">
                {name}
                <ChevronDownIcon
                    className="h-3 w-3 flex-none text-gray-400"
                    aria-hidden="true"
                />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3  w-md w-screen max-w-xs max-h-screen rounded-3xl shadow-lg ring-1 overflow-y-auto ring-gray-900/5 sidebar-dark-bg-95">
                    <div className="p-4">
                        {list.map((item) => (
                            <div
                                key={item.name}
                                className="group relative flex items-center rounded-lg p-3 item-navbar
                                text-sm leading-6 hover:bg-gray-50 hover:pointer light-gray2"
                            >
                                <div className="flex-auto">
                                    <Link
                                        href={`/${name}/${item.urlName}/page/1`}
                                        className="block capitalize font-semibold"
                                    >
                                        {item.name}
                                        <span className="absolute inset-0" />
                                    </Link>
                                    {/* <p className="mt-1 text-gray-600">
                                        {item.description}
                                    </p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}