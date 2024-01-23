import Tag from "@/actions/tag";

export default async function handler(req, res) {
    const tag = new Tag();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);

        const result = await tag.insertTag(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;

        const result = await tag.updateCount(query);
        res.status(200).json({ message: result });
    }
}
