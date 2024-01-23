import Fetch from "./fetch";

export default class LanguageAPI {
    constructor() {
        this.fetch = new Fetch();
    }
    async POST(body) {
        const url = "/api/language";
        const res = await this.fetch.POST(url, body);
        return res;
    }
    async GET(queries) {
        const url = "/api/language";
        const res = await this.fetch.GET(url, queries);
        return res;
    }
}
