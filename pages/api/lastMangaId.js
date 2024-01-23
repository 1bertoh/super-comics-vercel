import prisma from "@/db"

export default async function handler(req, res) {

    if (req.method === "POST") {
        res.status(403).json({ message: "post not allowed" });
    } else if (req.method === "GET") {
        const mangaId = await prisma.manga.findMany({
            orderBy: {
                id: "desc",
            },
            take: 1,
            select: {
                id: true,
            },
        });
        res.status(200).json({ message: mangaId[0] });
    }
}
