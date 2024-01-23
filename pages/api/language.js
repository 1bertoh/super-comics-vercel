import Language from "@/actions/language";

export default async function handler(req, res) {
    const language = new Language();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);
        
        const result = await language.insertLanguage(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;

        const result = await language.getLanguage(query);
        res.status(200).json({ message: result });
    }
}
