import Manga from "@/actions/manga";
import Utils from "@/utils/utils";

export default async function handler(req, res) {
    const manga = new Manga();

    if (req.method === "POST") {
        res.status(404).json({ message: 'Method not found' });

    } else if (req.method === "GET") {
        const query = req.query; 
        const {skip, take} = Utils.getPagination(req?.query?.page || 1, 12)

        const result = await manga.getMangas(query, {skip, take});
        res.status(200).json({
            message: result,
        });
    }
}
