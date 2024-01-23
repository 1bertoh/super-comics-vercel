import Parody from "@/actions/parody";

export default async function handler(req, res) {
    const parody = new Parody();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);
        
        const result = await parody.insertParody(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;

        const result = await parody.getParody(query);
        res.status(200).json({ message: result });
    }
}
