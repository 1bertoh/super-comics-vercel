import SAlert from "@/app/_components/SAlert";
import ParodyAPI from "@/fetch/parody";
import Utils from "@/utils/utils";
import { useState } from "react";

export default function Parody() {
    const [name, setName] = useState("");
    const [postRes, setPostRes] = useState(null);
    const [urlName, setUrlName] = useState("");
    const [isUrlOk, setIsUrlOk] = useState(true);

    const getInput = async ({target}) => {
        const value = target.value
        const url = Utils.toUrlFriendly(value);
        
        setUrlName(url);
        setName(value);

        const p = new ParodyAPI();
        
        const res = await p.GET({urlName:url});
        const resJson = await res.json();
        const parodies = resJson.message
        setIsUrlOk(!Boolean(parodies.length))
    }

    const submit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPostRes(null);

        try {
            const a = new ParodyAPI();
            const jsonA = JSON.stringify({ name: name, urlName });

            const response = await a.POST(jsonA);
            const responseJson = await response.json();

            const resObj = {
                ok: response.ok,
                status: response.status,
                body: responseJson,
            };

            setPostRes(resObj);
        } catch (error) {
            console.error("Erro durante a solicitação:", error);
            // Lide com erros, se necessário
        }
    };

    const closeAlert = () => {
        setPostRes(null);
    };

    // useEffect(() => {}, [postRes]);

    const alertFeedback = () => {
        if (postRes !== null) {
            if (postRes?.ok) {
                return (
                    <SAlert
                        closeCallback={closeAlert}
                        schema="success"
                        text="This post was successful !!"
                    />
                );
            } else {
                return (
                    <SAlert
                        closeCallback={closeAlert}
                        schema="danger"
                        text={
                            "This post was not successful !! status: " +
                            postRes?.status
                        }
                    />
                );
            }
        }
        return <></>;
    };

    return (
        <>
            <div className="px-10">
                <form onSubmit={submit} action="#" className="block w-1/3">
                    <label
                        htmlFor="parody"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        {"Parody's name"}
                    </label>
                    <input
                        onChange={(e) => getInput(e)}
                        type="text"
                        id="parody"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Naruto"
                        required
                    />
                    <input
                        type="text"
                        value={urlName}
                        id="urlName"
                        className={`border ${
                            isUrlOk
                                ? "bg-gray-50 border-gray-300 text-gray-900"
                                : "border-red-500 text-red-900 bg-red-200 "
                        }  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                        placeholder="url-friendly"
                        readOnly
                        required
                    />
                    <br />
                    <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Submit
                    </button>
                </form>
                <br />
                <br />
                {alertFeedback()}
            </div>
        </>
    );
}
