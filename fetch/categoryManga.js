import Fetch from "./fetch";

export default class CategoryMangaAPI {
    constructor() {
        this.fetch = new Fetch();
    }
    async POST(body) {
        const url = "/api/categoryManga";
        const res = await this.fetch.POST(url, body);
        return res;
    }
    async GET(queries) {
        const url = "/api/categoryManga";
        const res = await this.fetch.GET(url, queries);
        return res;
    }
}
