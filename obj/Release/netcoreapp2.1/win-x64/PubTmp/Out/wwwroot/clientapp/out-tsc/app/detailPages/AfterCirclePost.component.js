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
import { CircleDM } from "../shared/Circle";
var AfterCirclePost = /** @class */ (function () {
    function AfterCirclePost(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.ControllMsg = "";
        this.toCirclePage = new CircleDM();
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
    }
    AfterCirclePost.prototype.ngOnInit = function () {
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.toCirclePage = this.data.toCirclePage;
    };
    AfterCirclePost.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    AfterCirclePost.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    AfterCirclePost.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    AfterCirclePost.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    AfterCirclePost.prototype.ReturnParameterPdf = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    AfterCirclePost.prototype.ReturnParameterImgW = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    AfterCirclePost.prototype.ReturnParameterImgH = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    AfterCirclePost.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    AfterCirclePost.prototype.BackFromExPost = function () {
        this.router.navigate([this.data.NavBackFromProfile]);
    };
    AfterCirclePost.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    AfterCirclePost.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AfterCirclePost = __decorate([
        Component({
            selector: "aftercircle- page",
            templateUrl: "AfterCirclePost.component.html",
            styleUrls: ["AfterCirclePost.component.html"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], AfterCirclePost);
    return AfterCirclePost;
}());
export { AfterCirclePost };
//# sourceMappingURL=AfterCirclePost.component.js.map