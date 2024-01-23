export default class Fetch {
    async POST(url, data) {
        const res = await fetch(url, { method: "POST", body: data });
        return res;
    }
    
    async GET(url, queries) {
        if(queries){
            const query = this._objectToQuery(queries)
            if(query){
                url = url+'?'+query
            }
        }
        
        const res = await fetch(url);
        return res;
    }

    _objectToQuery(objeto) {
        const queryStrings = [];

        for (let chave in objeto) {
            if (objeto.hasOwnProperty(chave)) {
                const valor = objeto[chave];
                queryStrings.push(
                    `${encodeURIComponent(chave)}=${encodeURIComponent(valor)}`
                );
            }
        }

        return queryStrings.join("&");
    }
}
