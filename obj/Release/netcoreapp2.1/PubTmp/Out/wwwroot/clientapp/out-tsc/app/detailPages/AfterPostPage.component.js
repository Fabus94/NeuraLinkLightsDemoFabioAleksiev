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
import { Project } from "../shared/Project";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
var AfterProjectPost = /** @class */ (function () {
    function AfterProjectPost(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.ControllMsg = "";
        this.toProjectPage = new Project();
    }
    AfterProjectPost.prototype.ngOnInit = function () {
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.toProjectPage = this.data.toProjectPage;
    };
    AfterProjectPost.prototype.BackFromProject = function () {
        this.router.navigate(["projects"]);
    };
    AfterProjectPost.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    AfterProjectPost.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AfterProjectPost = __decorate([
        Component({
            selector: "afterproject-page",
            templateUrl: "AfterPostPage.component.html",
            styleUrls: ["AfterPostPage.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], AfterProjectPost);
    return AfterProjectPost;
}());
export { AfterProjectPost };
//# sourceMappingURL=AfterPostPage.component.js.map