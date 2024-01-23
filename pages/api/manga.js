import Manga from "@/actions/manga";
import TagsManga from "@/actions/tagManga";

export default async function handler(req, res) {
    const manga = new Manga();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);
        
        const result = await manga.insertManga(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;
        
        const result = await manga.getManga(query);
        res.status(200).json({ message: result });
    }
}
