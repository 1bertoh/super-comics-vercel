import Page from "@/actions/page";

export default async function handler(req, res) {
    const page = new Page();

    if (req.method === "POST") {
        const obj = JSON.parse(req.body);
        
        const result = await page.insertPage(obj);
        res.status(200).json({ message: result });
    } else if (req.method === "GET") {
        const query = req.query;
        
        const result = await page.getPage(query);
        res.status(200).json({ message: result });
    }
}
