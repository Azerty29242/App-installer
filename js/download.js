class FileDownloader {
    constructor () {
        this.downloader = document.createElement("iframe")
    }

    download(url) {
        this.downloader.src = url
    }
}

fileDownloader = new FileDownloader()