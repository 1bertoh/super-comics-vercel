import Fetch from "./fetch";

export default class TagAPI {
    constructor() {
        this.fetch = new Fetch();
    }
    async POST(body) {
        const url = "/api/tag";
        const res = await this.fetch.POST(url, body);
        return res;
    }
    async GET(queries) {
        const url = "/api/tag";
        const res = await this.fetch.GET(url, queries);
        return res;
    }
}
