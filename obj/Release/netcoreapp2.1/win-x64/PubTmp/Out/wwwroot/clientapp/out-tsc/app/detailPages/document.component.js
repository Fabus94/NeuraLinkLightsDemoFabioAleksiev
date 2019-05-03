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
var Document = /** @class */ (function () {
    function Document(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.DocumentFull = "";
        //Graphisc Controllers
        //Use window.innerWidth / window.innerHeight to get screen dimensions in resolution px X px format
        this.ImgW = window.innerWidth;
        this.ImgH = window.innerHeight;
        this.ZoomVal = 1;
    }
    Document.prototype.ngOnInit = function () {
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.DocumentFull = this.data.DocumentFull;
    };
    Document.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Document.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    Document.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    Document.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    Document.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    Document.prototype.BackFromExpost = function () {
        this.router.navigate([this.data.NavBackFromProfile]);
    };
    Document.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    Document = __decorate([
        Component({
            selector: "docfull",
            templateUrl: "document.component.html",
            styleUrls: ["document.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], Document);
    return Document;
}());
export { Document };
//# sourceMappingURL=document.component.js.map