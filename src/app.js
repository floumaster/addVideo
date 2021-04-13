var vastUrlHandler = /** @class */ (function () {
    function vastUrlHandler() {
    }
    vastUrlHandler.prototype.setVastUrl = function (url) {
        this.vastUrl = url;
    };
    vastUrlHandler.prototype.load = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.vastUrl, true);
        xhr.responseType = 'document';
        xhr.overrideMimeType('text/xml');
        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    var xml = xhr.responseXML;
                    var requiredTags = xml.getElementsByTagName("MediaFile");
                    for (var i = 0; i < requiredTags.length; i++) {
                        if (requiredTags[i].getAttribute("type").indexOf("mp4") !== -1) {
                            _this.videoUrl = requiredTags[i].textContent.trim();
                        }
                    }
                }
                else {
                    var errorMsg = document.createElement("h1");
                    errorMsg.innerHTML = "Error in loading a required url";
                    document.body.appendChild(errorMsg);
                }
            }
        };
        xhr.send(null);
    };
    vastUrlHandler.prototype.start = function () {
        var video = document.createElement("video");
        video.className = "video-wrapper";
        var source = document.createElement("source");
        source.src = this.videoUrl;
        video.appendChild(source);
        document.body.appendChild(video);
    };
    vastUrlHandler.prototype.play = function () {
        document.getElementsByClassName("video-wrapper")[0].play();
    };
    vastUrlHandler.prototype.pause = function () {
        document.getElementsByClassName("video-wrapper")[0].pause();
    };
    vastUrlHandler.prototype.close = function () {
        document.getElementsByClassName("video-wrapper")[0].remove();
    };
    return vastUrlHandler;
}());
var player = new vastUrlHandler();
