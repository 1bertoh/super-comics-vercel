import Character from "@/actions/character";

export default async function handler(req, res) {
    const char = new Character();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);

        const result = await char.insertCharacter(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;

        const result = await char.getCharacter(query);
        res.status(200).json({ message: result });
    }
}
