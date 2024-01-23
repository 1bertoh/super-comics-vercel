import CategoryManga from "@/actions/categoryManga";

export default async function handler(req, res) {
    const categoryManga = new CategoryManga();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);
        
        const result = await categoryManga.insertCategoryManga(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;
        
        const result = await categoryManga.getCategoryManga(query);
        res.status(200).json({ message: result });
    }
}
