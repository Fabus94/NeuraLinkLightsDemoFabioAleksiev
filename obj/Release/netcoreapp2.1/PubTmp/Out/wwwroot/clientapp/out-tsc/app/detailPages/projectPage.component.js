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
import { Member } from "../shared/member";
import { DomSanitizer } from "@angular/platform-browser";
var ProjectPage = /** @class */ (function () {
    function ProjectPage(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.ControllMsg = "";
        this.toProjectPage = new Project();
        this.projectPageMbrprojects = [];
        this.currentUser = new Member();
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
    }
    ProjectPage.prototype.ngOnInit = function () {
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.toProjectPage = this.data.toProjectPage;
        this.currentUser = this.data.currentUser;
        this.projectPageMbrprojects = this.data.projectPageMbrprojects;
    };
    ProjectPage.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    ProjectPage.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    ProjectPage.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    ProjectPage.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    ProjectPage.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    ProjectPage.prototype.GetRelatedPr = function () {
        var _this = this;
        this.data.loadProjectsForProjectPage(this.toProjectPage.issueingId)
            .subscribe(function (success) {
            if (success) {
                _this.projectPageMbrprojects = _this.data.projectPageMbrprojects;
            }
        }, function (err) { return _this.ControllMsg = "Failed to get my projects"; });
    };
    ProjectPage.prototype.ProfilePage = function () {
        if (this.data.toProfilePage) {
            this.data.toProfilePage = new Member();
        }
        //we are moving the project.member to the profilePage view
        this.data.toProfilePage = this.toProjectPage.member;
        if (this.data.toProfilePage) {
            this.data.NavBackFromProfile = "projectindiv";
            this.router.navigate(["profile"]);
        }
    };
    ProjectPage.prototype.BackFromProject = function () {
        this.router.navigate([this.data.NavBackFromProfile]);
    };
    ProjectPage.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    ProjectPage.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectPage.prototype.CheckLogin = function () {
        if (this.data.susasssrsp.email != null) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectPage.prototype.MessageUser = function () {
        var _this = this;
        // format: email, senderEmail
        this.data.loadMessage(this.toProjectPage.member.email, this.currentUser.email)
            .subscribe(function (success) {
            if (success) {
                _this.data.UpdateMsgtoRead();
            }
        });
        this.data.OpenSienavInvites = 0;
        this.data.MessCtrl = 1;
        this.data.OpenGroupChat = 0;
        this.data.toMessage = this.toProjectPage.member;
    };
    ProjectPage = __decorate([
        Component({
            selector: "project-page",
            templateUrl: "projectPage.component.html",
            styleUrls: ["projectPage.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], ProjectPage);
    return ProjectPage;
}());
export { ProjectPage };
//# sourceMappingURL=projectPage.component.js.map