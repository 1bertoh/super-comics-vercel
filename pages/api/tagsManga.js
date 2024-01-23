import TagsManga from "@/actions/tagManga";

export default async function handler(req, res) {
    const tagsManga = new TagsManga();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);
        
        const result = await tagsManga.insertTagsManga(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;
        
        const result = await tagsManga.getTagsManga(query);
        res.status(200).json({ message: result });
    }
}
