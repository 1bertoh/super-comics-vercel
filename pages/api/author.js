import Author from "@/actions/author";

export default async function handler(req, res) {
    const author = new Author();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);
        const result = await author.insertAuthor(obj);

        res.status(200).json({ message: result });
        
    } else if (req.method === "GET") {
        const query = req.query;
        const result = await author.getAuthor(query);

        res.status(200).json({ message: result });
    }
}
