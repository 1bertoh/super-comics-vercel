'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Image from "next/image";
import MangaAPI from "@/fetch/manga";
import ParodyAPI from "@/fetch/parody";
import TagAPI from "@/fetch/tag";
import AuthorAPI from "@/fetch/author";
import LanguageAPI from "@/fetch/language";
import SModal from "@/app/_components/SModal";
import CategoryAPI from "@/fetch/category";
import SAlert from "@/app/_components/SAlert";
import MangasAPI from "@/fetch/mangas";
import { ArrowPathIcon, LinkIcon } from "@heroicons/react/24/outline";
import Utils from "@/utils/utils";
import CharacterAPI from "@/fetch/character";
import Link from "next/link";

export default function MangaForm() {
    const [domain, setDomain] = useState('')
    const [folderName, setFolderName] = useState(0)
    const [pagesList, setPagesList] = useState([])
    const [postRes, setPostRes] = useState(null)
    const d = new Date()
    const [manga, setManga] = useState({
        id: 0,
        name: "",
        parody: {},
        coverLg: "",
        coverSm: "",
        rating: 0,
        isCoverNsfw: false,
        tags: [],
        characters: [],
        categories: [],
        views: 0,
        createAt: d.toUTCString(),
        language: {},
        authors: [],
        description: "",
        groups: [],
        pages: 0,
        collection: "",
        chapCollection: 0,
        encurtador: '',
        urlName: '',
        fullName: '[] | | []'
    });

    const generateObj = async (e) => {
        setPostRes(null);

        const m = new MangaAPI()
        const body =  {manga:{...manga, parody: manga.parody.id, language: manga.language.id}, pages: pagesList }
        const res = await m.POST(JSON.stringify(body))
        const resJson = await res.json()
        const mangaId = resJson.message.id
        
        setPostRes({...postRes,resJson, mangaOk:res?.ok, mangaStatus:res?.status })
    }

    const alertFeedback = () => {
        if (postRes !== null) {
            if (postRes?.mangaOk) {
                return (
                    <SAlert
                        closeCallback={() =>{}}
                        schema="success"
                        text="This post was successful !!"
                    />
                );
            } else {
                return (
                    <SAlert
                        closeCallback={() =>{}}
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
            <form className="px-10 pb-20">
                <MangaInfo />
                <br />
                <Manganame manga={manga} callback={setManga} />
                <br />
                <ParodyList manga={manga} callback={setManga} />
                <br />
                <UploadDate manga={manga} callback={setManga} />
                <br />
                <CharactersSelector manga={manga} callback={setManga} />
                <br />
                <TagsSelector manga={manga} callback={setManga} />
                <br />
                <CategorySelector manga={manga} callback={setManga} />
                <br />
                <LaguageSelect manga={manga} callback={setManga} />
                <br />
                <AuthorSelect manga={manga} callback={setManga} />
                <br />
                <Description manga={manga} callback={setManga} />
                <br />
                <PageQntd manga={manga} callback={setManga} />
                <br />
                <Encurtador manga={manga} callback={setManga} />
                <br />
                <Collection manga={manga} callback={setManga} />
                <br />
                <div className="flex flex-wrap gap-3">
                    <SelectDomain value={domain} callback={setDomain} />
                    <FolderName value={folderName} callback={setFolderName} />
                </div>
                <br />
                <PagesInfo
                    manga={manga}
                    domain={domain}
                    folderName={folderName}
                    pagesList={pagesList}
                    setPagesList={setPagesList}
                    setManga={setManga}
                />
                <PreviewPages
                    pages={pagesList}
                    coverLg={manga.coverLg}
                    coverSm={manga.coverSm}
                />
                <br />
                <ShowModal
                    callback={generateObj}
                    manga={manga}
                    pagesList={pagesList}
                />
                <br />
                {alertFeedback()}
            </form>
        </>
    );
}

const MangaInfo =  () => {
    const [id, setId] = useState(0)

    useEffect(()=>{
        try{
            (async function fetch() {
                const m = new MangasAPI();
                const res = await m.LASTID();
                const resJson = await res.json();
                const mangaId = resJson.message;

                setId(mangaId.id + 1);
            })();
        }catch(e){
            console.log(e)
        }

    },[])
    const url = 'https://www.superhentai.info/read'

    const copy = () => {
        navigator.clipboard.writeText(url+'/'+id);
    }

    return(
        <div className="text-slate-300">
            <h1 className="text-3xl">
                #{id}
            </h1>
            <div className="flex gap-5">
                <Link href={url+'/'+id}>{url}/{id}</Link>
                <LinkIcon className="cursor-pointer" width={16} height={16} onClick={() => copy()}/>
            </div>
        </div>
    )
}

const Manganame = (props) => {
    const {manga, callback} = props
    const [isUrlOk, setIsUrlOk] = useState(true)

    const getInput = async ({target}) => {
        const  input = target.value
        const url = Utils.toUrlFriendly(input);

        callback({...manga, urlName:url, fullName: input,  name: input})
        
        let m = new MangasAPI();
        
        const paginationBase = Utils.getPagination(0, 12);
        const res = await m.GET({urlName:url});
        const resJson = await res.json();
        const mangas = resJson.message.mangas
        setIsUrlOk(!Boolean(mangas?.length))
    }
    
    return (
        <div>
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
            >
                Name
            </label>
            <input
                onChange={(e) => getInput(e)}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Manga's name"
                required
            />
            <input
                type="text"
                value={manga.urlName}
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
            <input
                type="text"
                value={manga.fullName}
                id="fullName"
                className={`border "bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                placeholder="[author] | name | [lang]"
                readOnly
                required
            />
        </div>
    );
}

const ParodyList = (props) => {
    const {callback, manga} = props
    const [parodies, setParodies] = useState([])
    
    const generateList = parodies.map((e) => {
        return(
            <option value={e.id} key={e.name+'-'+e.id}>{e.name}</option>
        )
    })
    const getValue = ({ target }) => {
        const value = target.value;
        const obj = parodies.find((e) => e.id === Number(value))
        callback({...manga, parody: obj});
    };

    const getInput = async ({target}) => {
        let t = new ParodyAPI()

        const value = target.value
        const res = await t.GET({name: value})
        const resJson = await res.json()

        resJson.message &&
        setParodies([...resJson.message])
    }

    return (
        <div>
            <label
                htmlFor="parody"
                className="block mb-2 text-sm font-medium text-white"
            >
                Search for the parody
            </label>
            <input
                onChange={(e) => getInput(e)}
                type="text"
                id="parody"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Naruto"
            />
            <select
                id="parody_list"
                required
                size="5"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => getValue(e)}
            >
                {generateList}
            </select>
        </div>
    );
}

const UploadDate = (props) => {
    const { callback, manga } = props;
    const d = new Date();
    const now = d.toISOString().split("T")[0];

    useEffect(() => {callback({...manga, createAt: now});},[])

    const updateDate = ({ target }) => {
        const value = target.value;
        callback({...manga, createAt: value});
    };

    return (
        <div>
            <div>
                <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-white"
                >
                    Year
                </label>
                <input
                    onChange={(e) => updateDate(e)}
                    type="date"
                    id="year"
                    value={manga.createAt}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Manga's name"
                    required
                />
            </div>
        </div>
    );
};

const CharactersSelector = (props) => {
    const { callback, manga } = props;
    const [characterList, setCharacterList] = useState([]);

    const insertCharacter = (char) => {
        if (!manga.characters.some((e) => e.name === char.name)) {
            let lista = [...manga.characters];
            lista.push(char);
            callback({...manga, characters: lista});
        }
    };

    const removeCharacter = (index) => {
        let lista = [...manga.characters];
        lista.splice(index, 1);
        callback({...manga, characters: lista});
    };

    const generateSearchCharactersEl = characterList.map((e,index) => {
        return (
            <span
                key={e.name +'-'+index}
                onClick={() => insertCharacter(e)}
                className="bg-red-700 cursor-pointer text-white px-4 rounded-full mx-1 h-min"
            >
                {e.name}
            </span>
        );
    });

    const generateChosenCharactersEl = manga.characters.map((e, index) => {
        return (
            <span
                key={e.name + "*" + index}
                onClick={() => removeCharacter(index)}
                className="bg-red-700 cursor-pointer text-white px-4 rounded-full mx-1 h-min"
            >
                {e.name}
            </span>
        );
    });

    const getInput = async ({ target }) => {
        let value = target.value;
        let t = new CharacterAPI()
        const res = await t.GET({name: value})
        const resJson = await res.json()
        resJson.message &&
        setCharacterList([...resJson.message]);
    };

    return (
        <div>
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
            >
                Search for Character
            </label>
            <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Sakura"
                onKeyUp={(e) => getInput(e)}
                required
            />
            <div className="flex gap-3">
                <div
                    style={{ width: "50%" }}
                    className="bg-white rounded-b-xl p-5 flex flex-wrap gap-3"
                >
                    {generateSearchCharactersEl}
                </div>
                <div
                    style={{ width: "50%" }}
                    className="bg-white rounded-b-xl p-5 flex flex-wrap"
                >
                    {generateChosenCharactersEl}
                </div>
            </div>
        </div>
    );
};
const TagsSelector = (props) => {
    const { callback, manga } = props;
    const [tagList, setTagList] = useState([]);

    const insertTag = (tag) => {
        try{
            if (!manga.tags.some((e) => e.name === tag.name)) {
                let lista = [...manga.tags];
                lista.push(tag);
                callback({...manga, tags: lista});
            }
        } catch(e){
            console.log(e)
        }
    };

    const removeTag = (index) => {
        try{
            let lista = [...manga.tags];
            lista.splice(index, 1);
            callback({...manga, tags: lista});
        }catch(e){console.log(e)}
    };

    const generateSearchTagsEl = tagList.map((e,index) => {
        try{
            return (
                <span
                    key={e.name + "-" + e.description+''+index}
                    about={e.description}
                    onClick={() => insertTag(e)}
                    className="bg-red-700 cursor-pointer text-white px-4 rounded-full mx-1 h-min"
                >
                    {e.name}
                </span>
            );
        } catch(e){console.log(e)}
    });

    const generateChosenTagsEl = manga.tags.map((e, index) => {
        try{
            return (
                <span
                    key={e.name + "*" + index}
                    onClick={() => removeTag(index)}
                    className="bg-red-700 cursor-pointer text-white px-4 rounded-full mx-1 h-min"
                >
                    {e.name}
                </span>
            );
        }catch(e){console.log(e)}
    });

    const getInput = async ({ target }) => {
        try{
            let value = target.value;
            let t = new TagAPI()
            const res = await t.GET({name: value})
            const resJson = await res.json()
            resJson.message &&
            setTagList([...resJson.message]);
        }catch(e){
            console.log(e)
        }
    };

    return (
        <div>
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
            >
                Search for Tag
            </label>
            <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ecchi"
                onKeyUp={(e) => getInput(e)}
                required
            />
            <div className="flex gap-3">
                <div
                    style={{ width: "50%" }}
                    className="bg-white rounded-b-xl p-5 flex flex-wrap gap-3"
                >
                    {generateSearchTagsEl}
                </div>
                <div
                    style={{ width: "50%" }}
                    className="bg-white rounded-b-xl p-5 flex flex-wrap"
                >
                    {generateChosenTagsEl}
                </div>
            </div>
        </div>
    );
};

const CategorySelector = (props) => {
    const { callback, manga } = props;
    const [categoryList, setCategoryList] = useState([]);

    const insertCategory = (category) => {
        if (!manga.categories.some((e) => e.name === category.name)) {
            let lista = [...manga.categories];
            lista.push(category);
            callback({...manga, categories: lista});
        }
    };

    const removeCategory = (index) => {
        let lista = [...manga.categories];
        lista.splice(index, 1);
        callback({...manga, categories: lista});
    };

    const generateSearchCategoriesEl = categoryList.map((e,index) => {
        return (
            <span
                key={e.name + "-" + e.description+''+index}
                about={e.description}
                onClick={() => insertCategory(e)}
                className="bg-orange-700 cursor-pointer text-white px-4 rounded-full mx-1"
            >
                {e.name}
            </span>
        );
    });

    const generateChosenCategoriesEl = manga.categories.map((e, index) => {
        return (
            <span
                key={e.name + "*" + index}
                onClick={() => removeCategory(index)}
                className="bg-orange-700 cursor-pointer text-white px-4 rounded-full mx-1"
            >
                {e.name}
            </span>
        );
    });

    const getInput = async ({ target }) => {
        let value = target.value;
        let t = new CategoryAPI()
        const res = await t.GET({name: value})
        const resJson = await res.json()
        resJson.message &&
        setCategoryList([...resJson.message]);
    };

    return (
        <div>
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
            >
                Search for Category
            </label>
            <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Hentai"
                onKeyUp={(e) => getInput(e)}
                required
            />
            <div className="flex gap-3">
                <div
                    style={{ width: "50%" }}
                    className="bg-white rounded-b-xl p-5 flex flex-wrap gap-3"
                >
                    {generateSearchCategoriesEl}
                </div>
                <div
                    style={{ width: "50%" }}
                    className="bg-white rounded-b-xl p-5"
                >
                    {generateChosenCategoriesEl}
                </div>
            </div>
        </div>
    );
};

const LaguageSelect = (props) => {
    const { callback, manga } = props;
    const [languages, setLanguages] = useState([]);

    const generateOptions = languages.map((e, index) => {
        return (
            <option key={e.id+''+index} className="text-lg" value={e.id}>
                {e.name}
            </option>
        );
    });

    const getValue = async ({ target }) => {
        const value = target.value;
        const obj = languages.find((e) => e.id === Number(value));
        const languageName = obj.name;
        const authorsName = manga.authors.map((e) => e.name).join(",")
        
        callback({...manga, fullName:`[${authorsName}] | ${manga.name} | ${languageName}`, language: obj});
    };

    const getLanguages = async () => {
        let t = new LanguageAPI();

        const res = await t.GET();
        const resJson = await res.json();

        resJson.message && setLanguages([...resJson.message]);
    }

    useEffect(() => {
        try{
            getLanguages()
        }catch(e){
            console.log(e)
        }
    }, [])

    return (
        <div>
            <label
                htmlFor="language"
                className="block mb-2 text-sm font-medium text-white"
            >
                Language
            </label>
            <select
                id="language"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => getValue(e)}
                defaultValue="null"
            >
                <option disabled value="null">
                    Choose a language
                </option>
                {generateOptions}
            </select>
        </div>
    );
};

const AuthorSelect = (props) => {
    const { callback, manga } = props;
    const [authorList, setAuthorList] = useState([]);

    const insertAuthor = (author) => {
        if (!manga.authors.some((e) => e.name === author.name)) {
            let lista = [...manga.authors];
            lista.push(author);

            const name = lista.map(e => e.name).join(", ")

            callback({ ...manga, authors: lista, fullName: `[${name}] | ${manga.name} | ${manga.language.name}` });

        }
    };

    const removeAuthor = (index) => {
        let lista = [...manga.authors];
        lista.splice(index, 1);

        const name = lista.map((e) => e.name).join(", ");

        callback({
            ...manga,
            authors: lista,
            fullName: `[${name}] | ${manga.name} | ${manga.language.name}`,
        });
    };

    const generateSearchAuthorsEl = authorList.map((e, index) => {
        return (
            <span
                key={e.name + "-" + index}
                onClick={() => insertAuthor(e)}
                className="bg-red-700 cursor-pointer text-white px-4 rounded-full mx-1 h-min"
            >
                {e.name}
            </span>
        );
    });

    const generateChosenAuthorsEl = manga.authors.map((e, index) => {
        return (
            <span
                key={e.name + "*" + index}
                onClick={() => removeAuthor(index)}
                className="bg-red-700 cursor-pointer text-white px-4 rounded-full mx-1 h-min"
            >
                {e.name}
            </span>
        );
    });

    const getInput = async ({ target }) => {
        let value = target.value;
        let t = new AuthorAPI();

        const res = await t.GET({ name: value });
        const resJson = await res.json();
        resJson.message && setAuthorList([...resJson.message]);
    };

    return (
        <div>
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
            >
                Search for Author
            </label>
            <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bira"
                onKeyUp={(e) => getInput(e)}
                required
            />
            <div className="flex gap-3">
                <div
                    style={{ width: "50%" }}
                    className="bg-white rounded-b-xl p-5 flex flex-wrap gap-3"
                >
                    {generateSearchAuthorsEl}
                </div>
                <div
                    style={{ width: "50%" }}
                    className="bg-white rounded-b-xl p-5 flex flex-wrap"
                >
                    {generateChosenAuthorsEl}
                </div>
            </div>
        </div>
    );
};

const Description = (props) => {
    const { callback, manga } = props;
    const getValue = ({ target }) => {
        const value = target.value;
        callback({...manga, description: value});
    };

    return (
        <div>
            <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-white"
            >
                Description
            </label>
            <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write the description here..."
                onChange={(e) => getValue(e)}
            ></textarea>
        </div>
    );
};

const FolderName = (props) => {
    const {value, callback} = props

    const getValue = ({ target }) => {
        const value = target.value;
        callback(value);
    };

    return (
        <div>
            <div>
                <label
                    htmlFor="folder-name"
                    className="block mb-2 text-sm font-medium text-white"
                >
                    folder name
                </label>
                <input
                    onChange={(e) => getValue(e)}
                    type="number"
                    id="folder-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="a number"
                    required
                />
            </div>
        </div>
    );
};

const PagesInfo = (props) => {
    const {domain, folderName, manga, setPagesList, pagesList, setManga} = props
    const { createAt, pages,   coverSm, coverLg, isCoverNsfw} = manga
    const [newList, setNewList] = useState([...pagesList])
    const [extension, setExtension] = useState('.png')
    const date = createAt.replaceAll('-','/')
    const extensions = ['.png', '.jpg', '.jpeg', '.webp']

    const pagesNumsList = Array.from({ length: Number(pages) }, (_, index) => index + 1)

    const l = pagesNumsList.map((e) => {
            let obj = {
                id:0,
                id_manga:0,
                page: e,
                width: 1280,
                height: 1804,
                alt: 'page '+e,
                extension: extension,
            }
            obj.url = `${domain}${date}/${folderName}/${e}${obj.extension}`
            return obj
        })

        useEffect(() => {
            try{
                setNewList(l);
                setPagesList(l)
            } catch(e){console.log(e)}
        }, [pages, domain, date, folderName, extension]);
            
        const getExtension = ({ target }) => {
            const value = target.value;
            setExtension(value);
        };

        const getInput = ({target}, type, index) => {
            const value = target.value
            const list = [...newList]

            list[index][type] = value
            setNewList(list)
            setPagesList(list)
        }
        
        const eachPageField = newList.map((e, index) => {
            return (
                <div key={e.page} className="flex mb-3 flex-wrap gap-3 items-center">
                    <span className="font-bold text-2xl text-gray-300">#{e.page}</span>
                    <div className="block w-1/3">
                        <label
                            htmlFor="url"
                            className="block mb-2 text-sm font-medium text-white"
                            >
                            URL
                        </label>
                        <input
                            onChange={(event) => getInput(event, 'url', index)}
                            type="url"
                            id="url"
                            value={e.url}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="https://algumacoisa.com"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="width"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            {'Width (px)'}
                        </label>
                        <input
                            onChange={(event) => getInput(event, 'width', index)}
                            type="number"
                            id="width"
                            value={e.width}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="320"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="height"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            {'Height (px)'}
                        </label>
                        <input
                            onChange={(event) => getInput(event, 'height', index)}
                            type="number"
                            id="height"
                            value={e.height}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="760"
                            required
                        />
                    </div>
                </div>
            );
        })

        const globalSizeWidth = () => {
            const changeAllSizes = ({target}, type) => {
                const value = target.value

                const newListSizes = newList.map((e) => {
                    if(type === "width"){
                        e.width = value
                    } else if(type === "height") {
                        e.height = value
                    }
                    return e
                })

                setNewList(newListSizes)
                setPagesList(newListSizes)
            }

            return (
                <>
                    <div>
                        <label
                            htmlFor="width"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            {"Width (px)"}
                        </label>
                        <input
                            onChange={(event) => changeAllSizes(event, "width")}
                            type="number"
                            id="width"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="320"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="height"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            {"Height (px)"}
                        </label>
                        <input
                            onChange={(event) =>
                                changeAllSizes(event, "height")
                            }
                            type="number"
                            id="height"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="760"
                            required
                        />
                    </div>
                </>
            );
        }

        const generateExtensionsOpt = extensions.map((e) => <option key={e} value={e}> {e} </option> ) 


    return (
        <div>
            <div>
                <label
                    htmlFor="extensions"
                    className="block mb-2 text-sm font-medium text-white"
                >
                    Extensions
                </label>
                <select
                    id="extensions"
                    className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                    onChange={(e) => getExtension(e)}
                    defaultValue={".jpg"}
                >
                    {generateExtensionsOpt}
                </select>
            </div>
            {
                <CoverInfo
                    manga={manga}
                    domain={domain}
                    folderName={folderName}
                    extension={extension}
                    setManga={setManga}
                />
            }
            <br />
            {globalSizeWidth()}
            <br />
            {eachPageField}
        </div>
    );
};

const SelectDomain = (props) => {
    const { value, callback } = props;
    const domains = [""];

    const generateOptions = domains.map((e) => {
        return (
            <option key={e} value={e}>
                {e}
            </option>
        );
    });

    useEffect(() => {
        callback(domains[0]);
    }, []);

    const getValue = ({ target }) => {
        const value = target.value;
        callback(value);
    };

    return (
        <div>
            <label
                htmlFor="domain"
                className="block mb-2 text-sm font-medium text-white"
            >
                Domain
            </label>
            <select
                id="domain"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => getValue(e)}
                value={domains[0]}
            >
                {generateOptions}
            </select>
        </div>
    );
};

const PageQntd = (props) => {
    const {callback, manga} = props

    const getValue = ({ target }) => {
        const value = target.value;
        callback({...manga, pages: value});
    };

    return (
        <div>
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
            >
                Pages
            </label>
            <input
                type="number"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="10"
                required
                onChange={(e) => getValue(e)}
            />
        </div>
    );
}

const Encurtador = (props) => {
    const {callback, manga} = props

    const getValue = ({ target }) => {
        const value = target.value;
        callback({...manga, encurtador: value});
    };

    return (
        <div>
            <label
                htmlFor="encurtador"
                className="block mb-2 text-sm font-medium text-white"
            >
                Encurtador link
            </label>
            <input
                type="url"
                id="encurtador"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://"
                onChange={(e) => getValue(e)}
            />
        </div>
    );
}

const Collection = (props) => {
    const {manga, callback} = props
    const [isSelected, setIsSelected] = useState(false)
    const [selectedCollection, setSelectedCollection] = useState(null)
    const [confirmCollection, setConfirmCollection] = useState(false)
    const [collectionChapter, setCollectionChapter] = useState(null)
    const [mangas, setMangas] = useState([])

    const getInput = async ({ target }) => {
        let m = new MangasAPI();

        const value = target.value;
        const res = await m.GET({ collection: value });
        const resJson = await res.json();

        resJson.message && setMangas(resJson.message.mangas);
    };

    const generateMangasOpt = mangas.map((e) => {
        return (
            <option value={e.collection} key={e.id}>
                {e.name} | chap. {e.chapCollection}
            </option>
        );
    });

    const openField = () => {
        const v = !isSelected;
        setIsSelected(v);
        
        if(!v) {
            callback({ ...manga, collection: "", chapCollection: 0 });
            setCollectionChapter(null)
            setConfirmCollection(false)
            setMangas([])
            setSelectedCollection(null)
            // generateMangasOpt = []
        }
    }

    const getValue = ({target}) => {
        const value = target.value
        setSelectedCollection(value)
    };

    const getCheck = ({target}) => {
        let  value = !confirmCollection;
        setConfirmCollection(value)

        if(value) {
            if(selectedCollection && collectionChapter){
                callback({...manga, collection: selectedCollection, chapCollection: collectionChapter})
            }
        } else {
            callback({...manga, collection: '', chapCollection: 0})
        }
    }
    const getChapter = ({target}) => {
        const value = target.value
        setCollectionChapter(value)
    }

    const showAlert = () => {
        if(confirm && (!selectedCollection || !collectionChapter)) {
            return <SAlert schema="danger" text={"The fields collectionId: "+selectedCollection+' collectionChapter: '+collectionChapter+' cant be empty!'} />
        }
        return <></>
    }

    useEffect(()  => {
    },[confirmCollection])

    return (
        <>
            <div className="flex">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        value={isSelected}
                        onChange={openField}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-300">
                        Is part of a collection?
                    </span>
                </label>
            </div>
            {isSelected && (
                <div>
                    <div className="flex gap-5 items-end">
                        <div className="">
                            <label
                                htmlFor="id-collection"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                {"id's collection"}
                            </label>
                            <input
                                onChange={(e) => getInput(e)}
                                type="text"
                                id="id-collection"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-72"
                                placeholder="The id of the collection"
                                required
                            />
                        </div>
                        <div>
                            {selectedCollection && (
                                <div className="flex">
                                    <input
                                        onChange={(e) => getChapter(e)}
                                        disabled={confirmCollection}
                                        type="number"
                                        id="chap-collection"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
                                        placeholder="1"
                                        required
                                    />
                                    <div className="flex items-center h-5">
                                        <input
                                            id="helper-checkbox"
                                            aria-describedby="helper-checkbox-text"
                                            type="checkbox"
                                            value={confirmCollection}
                                            onChange={(e) => getCheck(e)}
                                            className="w-4 h-4  rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                        />
                                    </div>
                                    <div className="ms-2 text-sm">
                                        <label
                                            for="helper-checkbox"
                                            className="font-medium text-gray-300"
                                        >
                                            Confirm
                                        </label>
                                        <p
                                            id="helper-checkbox-text"
                                            className="text-xs font-normal text-gray-300"
                                        >
                                            Is the chosen collection{" "}
                                            <strong>
                                                {selectedCollection}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <select
                        id="select_manga"
                        size="5"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => getValue(e)}
                    >
                        {generateMangasOpt}
                    </select>
                    {showAlert()}
                </div>
            )}
        </>
    );
}

const CoverInfo = (props) => {
    const {domain, folderName, extension, manga, setManga } = props
    const {coverLg, coverSm, createAt, isCoverNsfw, } = manga
    const covers = [{nome: 'coverLg', value: coverLg}, {nome: 'coverSm', value: coverSm}]
    const date = createAt.replaceAll('-','/')

    useEffect(() => {
            domain  &&
            setManga({...manga, coverSm: `${domain}${date}/${folderName}/0_coverSm${extension}`, coverLg: `${domain}${date}/${folderName}/0_coverLg${extension}`})
        }, [domain, folderName, extension]);

    const getInput = ({target}, type) => {
            const value = target.value

            if(type === 'coverSm') {
                setManga({...manga, coverSm: value})
            } else if(type === 'coverLg') {
                setManga({...manga, coverLg: value})
            }
        }

    const generateCoversFields = covers.map((e) => {
            return (
                    <div key={e.nome} className="block w-2/3">
                        <label
                            htmlFor={e.nome}
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            {e.nome}
                            <span className="block text-sm">{'ex: ' + e.value}</span>
                            <span className="block text-sm">{"* Don't forget update the folder name"}</span>
                        </label>
                        <input
                            onChange={(event) => getInput(event, e.nome)}
                            type="url"
                            id={e.nome}
                            defaultValue={e.value}
                            // value={e.value}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="https://algumacoisa.com"
                            required
                        />
                    </div>
            );
        })
    
    return (
        <>
            <br />

            <div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        value={isCoverNsfw}
                        onChange={() => setManga({...manga, isCoverNsfw: !isCoverNsfw})}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-300">
                        Is cover NSFW
                    </span>
                </label>
            </div>
            {generateCoversFields}
        </>
    );
}

const PreviewPages = (props) => {
    const {pages, coverLg, coverSm} = props
    const covers = [coverLg, coverSm]
    const [show, setShow] = useState(true)

    let pagesEl = pages.map((e, index) => {
        return (
            <div key={e.page+''+index} className="w-1/12">
                <span>
                    <span className="text-gray-300 text-sm">{e.page}</span>
                    <ImagePreview url={e.url}/>
                </span>
            </div>
        );
    })
    
    let coversEl = covers.map((e, index) => {
        return (
            <div key={e+''+index} className="w-1/6">
                <span>
                    <span className="text-gray-300 text-sm">{index === 0 ? 'Cover lg' : 'Cover sm'}</span>
                    <ImagePreview url={e}/>
                </span>
            </div>
        )
    })

    const t = () => {
        setShow(false)
        setTimeout(() => {
            setShow(true)
        }, 500)
    }
    
    return (
        <>
        {
            show &&
            (
                <>
                    <div className="flex justify-between">
                        <div className="flex flex-wrap gap-3">
                            {coversEl}

                        </div>
                        <ArrowPathIcon className="cursor-pointer" onClick={() => t()} width={70}/>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {pages.length && pagesEl}
                    </div>
                </>
            )
        }
        </>
    )
}

const ImagePreview = (props) => {
    const {url} = props
    const [src, setSrc] = useState(url)

    return (
        <Image
            alt={"cover"}
            src={src || "https://super-hentai.b-cdn.net/No%20image.webp"}
            width={320}
            height={760}
            onError={() =>
                setSrc("https://super-hentai.b-cdn.net/No%20image.webp")
            }
            loader={({ src, width: w, quality }) => {
                const q = 25;
                return `${src}?w=${w}&q=${q}`;
            }}
        ></Image>
    );

}

const ShowModal = (props) => {
    const {callback, manga, pagesList} = props

    const mang = () => {
        return (
            <>
                <div className="container mx-auto mt-8">
                    <div className="">
                        <div className="">
                            <h2 className="text-3xl font-bold mb-4">
                                {manga.name || "UNKNOWN NAME"}
                            <span className="block text-xs">{manga.fullName}</span>
                            <span className="block text-xs">{manga.urlName}</span>
                            </h2>
                            <p className="text-gray-600 mb-4">
                                <strong>Description:</strong>
                                {manga.description || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Chap. collection:</strong>{" "}
                                {manga.chapCollection || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Collection:</strong>{" "}
                                {manga.collection || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Cover lg:</strong>{" "}
                                {manga.coverLg || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Cover sm:</strong>{" "}
                                {manga.coverSm || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Create at:</strong>{" "}
                                {manga.createAt || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Groups:</strong>{" "}
                                {manga.groups || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Is cover NSFW:</strong>{" "}
                                {manga.isCoverNsfw ? 'YES' : "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Language:</strong>{" "}
                                {manga.language.name || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Pages:</strong>{" "}
                                {manga.pages || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Parody:</strong>{" "}
                                {manga.parody.name || "UNKNOWN"}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Rating:</strong>{" "}
                                {manga.rating }
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Views:</strong> {manga.views}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Encurtador:</strong> {manga.encurtador}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {manga.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {manga.categories.map((category) => (
                                <span
                                    key={category.id}
                                    className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4">Characters</h3>
                        <div className="flex flex-wrap gap-2">
                            {manga?.characters?.map((characters) => (
                                <span
                                    key={characters.id}
                                    className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                                >
                                    {characters.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4">Authors</h3>
                        <div className="flex flex-wrap gap-2">
                            {manga?.authors?.map((author) => (
                                <span
                                    key={author.id}
                                    className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                                >
                                    {author.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    const pages = pagesList.map((e) => {
        return (
            <p key={e.page}>
                <span className="font-semibold">{'page '}{e.page+' '}</span>= {' '+e.url}
            </p>
        );
    })

    return (
        <>
            <SModal confirmButtonName="Confirm Register" confirmCallback={callback} openModalButtonName="Register" title="Manga Fields" >
                <div style={{height: '70vh', overflowY: "scroll", boxSizing: 'border-box' }}>
                    {mang()}
                    <hr/>
                    <p className="font-bold pt-2 text-2xl">Pages</p>
                    {pages}
                </div>
            </SModal>
        </>
    )
}