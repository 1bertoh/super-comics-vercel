import Category from "@/actions/category";

export default async function handler(req, res) {
    const category = new Category();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);
        
        const result = await category.insertCategory(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;
        
        const result = await category.getCategory(query);
        res.status(200).json({ message: result });
    }
}
