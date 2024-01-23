import Fetch from "./fetch";

export default class CategoryAPI {
    constructor() {
        this.fetch = new Fetch();
    }
    async POST(body) {
        const url = "/api/category";
        const res = await this.fetch.POST(url, body);
        return res;
    }
    async GET(queries) {
        const url = "/api/category";
        const res = await this.fetch.GET(url, queries);
        return res;
    }
}
