import CharacterManga from "@/actions/characterManga";
import TagsManga from "@/actions/tagManga";

export default async function handler(req, res) {
    const charManga = new CharacterManga();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);

        const result = await charManga.insertTagsManga(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;

        const result = await charManga.getCharacterManga(query);
        res.status(200).json({ message: result });
    }
}
