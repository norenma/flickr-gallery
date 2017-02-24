export class Photo {
    URL_tumb: string;
    URL_large: string;

    setUrls(farm, server, id, secret) {
        this.URL_tumb = this.getUrl(farm, server, id, secret, 'm');
        this.URL_large = this.getUrl(farm, server, id, secret, 'z');
    }

    private getUrl(farm, server, id, secret, size){
        let url = 'https://farm' + farm + '.staticflickr.com/' +
            server + '/' + id + '_' + secret + '_' + size + '.jpg';
        return url;
    }
}
