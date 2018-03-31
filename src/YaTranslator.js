import axios from 'axios'

class YaTranslator {
    constructor(key) {
        this.setKey(key);
        this.url = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
    }
    getPromise(text) {
        if (!this.key) {
            return new Promise((resolve) => {
                resolve();
            });
        }
        
        const request = this.url + this.key + "&lang=ru&text=" + encodeURIComponent(text);
        
        return axios.get(request);
    }
    setKey(key) {
        if (!key) {
            this.key = "";
            return;
        }
        this.key = "key=" + key;
    }
}

export default YaTranslator;