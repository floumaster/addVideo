class vastUrlHandler{
    vastUrl: string;
    videoUrl: string;
    setVastUrl(url: string):void{
        this.vastUrl = url;
    }
    load():void{
        var xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('GET', this.vastUrl, true);
        xhr.responseType = 'document';
        xhr.overrideMimeType('text/xml');
        xhr.onload = () => {
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                const xml: Document = xhr.responseXML;
                const requiredTags: HTMLCollectionOf<Element> = xml.getElementsByTagName("MediaFile");
                for(let i = 0; i<requiredTags.length; i++){
                    if(requiredTags[i].getAttribute("type").indexOf("mp4") !== -1){
                        this.videoUrl = requiredTags[i].textContent.trim();
                    }
                }
            }
            else{
                let errorMsg: HTMLHeadingElement = document.createElement("h1");
                errorMsg.innerHTML = "Error in loading a required url"
                document.body.appendChild(errorMsg);
            }
          }
        };
        xhr.send(null);
    }
    start():void{
        let video: HTMLVideoElement = document.createElement("video");
        video.className ="video-wrapper";
        let source: HTMLSourceElement = document.createElement("source");
        source.src = this.videoUrl;
        video.appendChild(source);
        document.body.appendChild(video);
    }
    play():void{
        (document.getElementsByClassName("video-wrapper")[0] as HTMLVideoElement).play();
    }
    pause():void{
        (document.getElementsByClassName("video-wrapper")[0] as HTMLVideoElement).pause();
    }
    close():void{
        document.getElementsByClassName("video-wrapper")[0].remove();
    }
}

const player: vastUrlHandler = new vastUrlHandler();
