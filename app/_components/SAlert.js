/* eslint-disable react-hooks/exhaustive-deps */
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

/**
 * 
 * @param {{schema: 'success'|'info'|'warning'|'danger', text: 'String', closeCallback: Function}} schema 
 * @returns jsx
 */
export default function SAlert({schema, text, closeCallback}){
    const [show, setShow] = useState(true)

    const closeAlert = () => {
        setShow(!show);
        closeCallback()
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         closeAlert()
    //     },5000)
    // }, []);

    const getAlert = () => {
        if(schema === 'success') {
            return (
                <div
                    className={`flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 `}
                    role="alert"
                >
                    <InformationCircleIcon className="w-6 h-6" />
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">{text}</div>
                    <button
                        type="button"
                        className={`ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-300 dark:hover:bg-gray-700`}
                        onClick={() => closeAlert()}
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            );

        }
        else if(schema === 'danger') {
            return (
                <div
                    className={`flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 `}
                    role="alert"
                >
                    <InformationCircleIcon className="w-6 h-6" />
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">{text}</div>
                    <button
                        type="button"
                        className={`ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-300 dark:hover:bg-gray-700`}
                        onClick={() => closeAlert()}
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            );

        }
        else if(schema === 'info') {
            return (
                <div
                    className={`flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 `}
                    role="alert"
                >
                    <InformationCircleIcon className="w-6 h-6" />
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">{text}</div>
                    <button
                        type="button"
                        className={`ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700`}
                        onClick={() => closeAlert()}
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            );

        }
        else if(schema === 'warning') {
            return (
                <div
                    className={`flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 `}
                    role="alert"
                >
                    <InformationCircleIcon className="w-6 h-6" />
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">{text}</div>
                    <button
                        type="button"
                        className={`ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700`}
                        onClick={() => closeAlert()}
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            );

        }
    }
    
    return (
        <>
            {(show === true && schema) && (
                getAlert()
            )}
        </>
    );
}