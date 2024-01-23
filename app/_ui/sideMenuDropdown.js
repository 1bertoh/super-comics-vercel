import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

/**
 * 
 * @param {{name: String, list: Array, type: 'tags'|'language'}} props 
 * @returns 
 */
export default  function SimeMenuDropdown(props) {
    let {name, list} = props
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <Disclosure as="div" className="-mx-3">
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50 light-gray1 item-navbar capitalize">
                        {name}
                        <ChevronDownIcon
                            className={classNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                        {[...list].map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={`/${name}/${item.urlName}/page/1`}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 capitalize hover:bg-gray-50 light-gray1 hover:text-indigo-900"
                            >
                                {item.name}
                            </Disclosure.Button>
                        ))}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}