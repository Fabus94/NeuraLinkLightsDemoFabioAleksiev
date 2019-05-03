var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { DataService } from "../shared/dataService";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ExplorePost } from "../shared/Explore";
var AfterExplorePost = /** @class */ (function () {
    function AfterExplorePost(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.ControllMsg = "";
        this.toExplorePage = new ExplorePost();
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
    }
    AfterExplorePost.prototype.ngOnInit = function () {
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.toExplorePage = this.data.toExplorePage;
    };
    AfterExplorePost.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    AfterExplorePost.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    AfterExplorePost.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    AfterExplorePost.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    AfterExplorePost.prototype.ReturnParameterPdf = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    AfterExplorePost.prototype.ReturnParameterImgW = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    AfterExplorePost.prototype.ReturnParameterImgH = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    AfterExplorePost.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    AfterExplorePost.prototype.BackFromExPost = function () {
        this.router.navigate([this.data.NavBackFromProfile]);
    };
    AfterExplorePost.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    AfterExplorePost.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AfterExplorePost = __decorate([
        Component({
            selector: "afterexplore-page",
            templateUrl: "AfterExplorePost.component.html",
            styleUrls: ["AfterExplorePost.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], AfterExplorePost);
    return AfterExplorePost;
}());
export { AfterExplorePost };
//# sourceMappingURL=AfterExplorePost.component.js.map