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
import { Member } from "../shared/member";
import { Project } from "../shared/Project";
import { DomSanitizer } from "@angular/platform-browser";
var ProjectList = /** @class */ (function () {
    function ProjectList(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.showexpost = 0;
        this.link = "";
        this.PrControllMsg = "";
        this.loadLimitPage = 20;
        this.numCheckIssueingMbr = 1;
        this.projects = [];
        this.currentUser = new Member(); //public currentUser: Member[] = [];
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
    }
    ProjectList.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    ProjectList.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    ProjectList.prototype.OpenFull = function (newExplorePost) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newExplorePost.document;
        if (this.data.DocumentFull) {
            this.data.NavBackFromProfile = "projects";
            this.router.navigate(["docfull"]);
        }
    };
    ProjectList.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    ProjectList.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    ProjectList.prototype.ReturnParameterPdf = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    ProjectList.prototype.ReturnParameterImgW = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    ProjectList.prototype.ReturnParameterImgH = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    ProjectList.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    //Reset page to work with search results, look into reshub nav variables and the page ng OnInit order for logic details, also in search.component.ts
    ProjectList.prototype.ngOnInit = function () {
        var _this = this;
        this.data.projectsFromMembersListAvatar = new Member();
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.data.toggle();
        if (this.data.projects.length > 0) {
            this.projects = this.data.projects;
            this.showexpost = 1;
        }
        if (this.projects.length == 0) {
            this.data.loadProjects()
                .subscribe(function (success) {
                if (success) {
                    _this.projects = _this.data.projects;
                    _this.showexpost = 1;
                    _this.data.toggle();
                }
            });
        }
        //cut the need to load this on every many page
        if (this.data.currentUser) {
            this.currentUser = this.data.currentUser;
        }
        else {
            this.data.GetCurrentUser()
                .subscribe(function (success) {
                if (success) {
                    _this.currentUser = _this.data.currentUser;
                }
            }, function (err) { return _this.PrControllMsg = "Failed to get current user"; });
        }
        //reset redirect from search values
        this.data.projects = [];
        this.data.NavRedirect = 0;
        this.data.toProjectPage = new Project();
    };
    ProjectList.prototype.LoadAll = function () {
        var _this = this;
        this.data.loadProjects()
            .subscribe(function (success) {
            if (success) {
                _this.projects = _this.data.projects;
                _this.showexpost = 1;
                _this.data.toggle();
            }
        });
    };
    ProjectList.prototype.CheckLogin = function () {
        if (this.data.susasssrsp.email != null) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectList.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectList.prototype.ProjectPage = function (newProject) {
        if (this.data.toProjectPage) {
            this.data.toProjectPage = new Project();
        }
        this.data.toProjectPage = newProject;
        if (this.data.toProjectPage) {
            this.data.NavBackFromProfile = "projects";
            this.router.navigate(["projectindiv"]);
        }
    };
    ProjectList.prototype.ProfilePage = function (newMember) {
        if (this.data.toProfilePage) {
            this.data.toProfilePage = new Member();
        }
        //we are moving the project.member to the profilePage view
        this.data.toProfilePage = newMember;
        if (this.data.toProjectPage) {
            this.data.NavBackFromProfile = "projects";
            this.router.navigate(["profile"]);
        }
    };
    ProjectList.prototype.LoadMoreProjects = function () {
        this.loadLimitPage += 20;
    };
    ProjectList.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    ProjectList.prototype.PostButton = function () {
        if (this.data.numCheckPostProject == 0) {
            this.data.numCheckPostProject = 1;
        }
        else {
            this.data.numCheckPostProject = 0;
        }
    };
    ProjectList.prototype.CheckToShow = function () {
        if (this.data.numCheckPostProject == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectList.prototype.MessageUser = function (newProject) {
        var _this = this;
        // format: email, senderEmail
        this.openMsgWindow = newProject.id;
        this.data.loadMessage(newProject.member.email, this.currentUser.email)
            .subscribe(function (success) {
            if (success) {
                for (var _i = 0, _a = _this.data.messages; _i < _a.length; _i++) {
                    var s = _a[_i];
                    if (s.senderRef != _this.currentUser.id) {
                        _this.data.UpdateNewMsg(s.id)
                            .subscribe(function (success) {
                            if (success) {
                            }
                        });
                    }
                    _this.data.CheckMessagesStatusB(s);
                }
            }
        });
        this.data.OpenSienavInvites = 0;
        this.data.MessCtrl = 1;
        this.data.OpenGroupChat = 0;
        this.data.toMessage = newProject.member;
    };
    ProjectList = __decorate([
        Component({
            selector: "projects-list",
            templateUrl: "projectList.component.html",
            styleUrls: ["projectList.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], ProjectList);
    return ProjectList;
}());
export { ProjectList };
//# sourceMappingURL=projectList.component.js.map