var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
//pending some modifications in the [] joints here
var ExplorePost = /** @class */ (function () {
    function ExplorePost() {
        this.datetime = new Date();
    }
    return ExplorePost;
}());
export { ExplorePost };
var ExplorePostListClass = /** @class */ (function () {
    function ExplorePostListClass() {
        this.comments = [];
        this.likes = [];
        this.hopOns = [];
        this.datetime = new Date();
    }
    return ExplorePostListClass;
}());
export { ExplorePostListClass };
var ExploreComment = /** @class */ (function () {
    function ExploreComment() {
        this.datetime = new Date();
    }
    return ExploreComment;
}());
export { ExploreComment };
var ExploreReply = /** @class */ (function () {
    function ExploreReply() {
        this.datetime = new Date();
    }
    return ExploreReply;
}());
export { ExploreReply };
var ExploreHashTag = /** @class */ (function () {
    function ExploreHashTag() {
    }
    return ExploreHashTag;
}());
export { ExploreHashTag };
var RegisterComment = /** @class */ (function () {
    function RegisterComment() {
    }
    return RegisterComment;
}());
export { RegisterComment };
var ExploreHopOns = /** @class */ (function () {
    function ExploreHopOns() {
    }
    return ExploreHopOns;
}());
export { ExploreHopOns };
var ExploreLike = /** @class */ (function () {
    function ExploreLike() {
    }
    return ExploreLike;
}());
export { ExploreLike };
var HighlightPipe = /** @class */ (function () {
    function HighlightPipe() {
    }
    HighlightPipe.prototype.transform = function (text) {
        var regexp = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        var pattern = text.match(regexp);
        return pattern ? text.replace(regexp, function (match) { return "<span class=\"highlight\"><strong>" + match + "</strong></span>"; }) : text;
    };
    HighlightPipe = __decorate([
        Pipe({ name: 'highlight' })
    ], HighlightPipe);
    return HighlightPipe;
}());
export { HighlightPipe };
//# sourceMappingURL=Explore.js.map