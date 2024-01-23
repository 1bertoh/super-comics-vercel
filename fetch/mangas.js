import Fetch from "./fetch";

export default class MangasAPI {
    constructor(){
        this.fetch = new Fetch()
    }
    async POST(body){
        const url = "/api/mangas";
        const res = await this.fetch.POST(url, body)
        return res
    }
    async GET(queries){
        const url = "/api/mangas";
        const res = await this.fetch.GET(url, queries)
        return res
    }
    async LASTID(){
        const url = "/api/lastMangaId";
        const res = await this.fetch.GET(url, {})
        return res
        
    }
}