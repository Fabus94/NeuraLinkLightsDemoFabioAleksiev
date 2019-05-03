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
import { Invite } from "../shared/invite";
var ProjectsFromMembers = /** @class */ (function () {
    function ProjectsFromMembers(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.showexpost = 0;
        this.projectsFromMembersList = [];
        this.ControllMsg = "";
        this.DelCtrl = 0;
        this.projectsFromMembersListAvatar = new Member();
        this.toRemove = new Project();
        this.AlterProjectCtrl = 0;
        this.projectstoUpdate = new Project();
        this.selectedFiles = null;
        this.targetAddButtonView = [];
        this.uploadButtonCancel = 0;
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
        this.openMsgWindow = 0;
        this.link = "";
        this.PrControllMsg = "";
        this.loadLimitPage = 20;
        this.numCheckIssueingMbr = 1;
        this.projects = [];
        this.currentUser = new Member(); //public currentUser: Member[] = [];
    }
    ProjectsFromMembers.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    ProjectsFromMembers.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    ProjectsFromMembers.prototype.OpenFull = function (newExplorePost) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newExplorePost.document;
        if (this.data.DocumentFull) {
            this.data.NavBackFromProfile = "projectsmbr";
            this.router.navigate(["docfull"]);
        }
    };
    ProjectsFromMembers.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    ProjectsFromMembers.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    ProjectsFromMembers.prototype.ReturnParameterPdf = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    ProjectsFromMembers.prototype.ReturnParameterImgW = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    ProjectsFromMembers.prototype.ReturnParameterImgH = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    ProjectsFromMembers.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    ProjectsFromMembers.prototype.ngOnInit = function () {
        var _this = this;
        this.projectsFromMembersListAvatar = this.data.projectsFromMembersListAvatar;
        this.data.loadProjectsFromMemberPage(this.data.projectsFromMembersListAvatar)
            .subscribe(function (success) {
            if (success) {
                if (_this.data.projectsFromMembersList) {
                    _this.projects = _this.data.projectsFromMembersList;
                    _this.showexpost = 1;
                }
            }
        });
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.currentUser = this.data.currentUser;
        this.targetAddButtonView = this.data.targetAddButtonView;
    };
    ProjectsFromMembers.prototype.CheckActiveAddButton = function (newMember) {
        //CHECK VARIABLES
        //remove redundant add buttons algorithm
        if (this.data.targetAddButtonView.includes(newMember.id)) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectsFromMembers.prototype.AddSelectedFileNumber = function (id) {
        this.selectedVerifyFile = id;
        if (this.selectedFiles != null) {
            this.selectedFiles = null;
        }
    };
    ProjectsFromMembers.prototype.Clear = function () {
        this.projectstoUpdate.document = null;
        this.selectedFiles = null;
    };
    ProjectsFromMembers.prototype.uploadSelectProject = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
        }
    };
    ProjectsFromMembers.prototype.FileUploadRun = function () {
        var _this = this;
        if (this.selectedFiles) {
            //spec blob storage folder
            var blobDstnt = "accounts-explore";
            var formData = new FormData();
            formData.append('filemy', this.selectedFiles, this.selectedFiles.name);
            // form data submit
            this.PrControllMsg = "Uploading...";
            this.data.toggle();
            this.uploadButtonCancel = 1;
            this.data.uploadFile(formData, blobDstnt)
                .subscribe(function (success) {
                if (success) {
                    _this.PrControllMsg = "File upload success!";
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                    if (_this.data.fileuri.primaryUri != null) {
                        _this.projectstoUpdate.document = _this.data.fileuri.primaryUri;
                    }
                }
                else {
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                }
            }, function (err) { return _this.PrControllMsg = "File upload failed, please try again"; });
        }
    };
    ProjectsFromMembers.prototype.SelectIdFromMbr = function () {
        var _this = this;
        this.data.getMemberId(this.projectsFromMembersListAvatar);
        this.data.SendRequest()
            .subscribe(function (success) {
            if (success) {
                var req = new Invite();
                req.invitedMbr = _this.projectsFromMembersListAvatar.id;
                req.requestingMbr = _this.currentUser.id;
                _this.data.requestsList.push(req);
                _this.targetAddButtonView.push(_this.projectsFromMembersListAvatar.id);
            }
        }, function (err) { return _this.ControllMsg = "Failed to send friend request, please try again"; });
    };
    ProjectsFromMembers.prototype.ProfilePageFromMbr = function (newExplorePost) {
        if (newExplorePost.id == this.currentUser.id) {
            this.data.toProfilePage = this.data.currentUser;
            if (this.data.toProfilePage) {
                this.data.toggle();
                this.router.navigate(["myprofile"]);
            }
        }
        else {
            if (this.data.toProfilePage) {
                this.data.toProfilePage = new Member();
            }
            //we are moving the project.member to the profilePage view
            this.data.toProfilePage = newExplorePost;
            if (this.data.toProfilePage) {
                this.data.NavBackFromProfile = "exploreposts";
                this.router.navigate(["profile"]);
            }
        }
    };
    ProjectsFromMembers.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectsFromMembers.prototype.CheckLogin = function () {
        if (this.data.susasssrsp.email != null) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectsFromMembers.prototype.ProjectPage = function (newProject) {
        if (this.data.toProjectPage) {
            this.data.toProjectPage = new Project();
        }
        this.data.toProjectPage = newProject;
        if (this.data.toProjectPage) {
            this.data.NavBackFromProfile = "projects";
            this.router.navigate(["projectindiv"]);
        }
    };
    ProjectsFromMembers.prototype.ProfilePage = function (newMember) {
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
    ProjectsFromMembers.prototype.LoadMoreProjects = function () {
        this.loadLimitPage += 20;
    };
    ProjectsFromMembers.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    ProjectsFromMembers.prototype.PostButton = function () {
        if (this.data.numCheckPostProject == 0) {
            this.data.numCheckPostProject = 1;
        }
        else {
            this.data.numCheckPostProject = 0;
        }
    };
    ProjectsFromMembers.prototype.CheckToShow = function () {
        if (this.data.numCheckPostProject == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ProjectsFromMembers.prototype.MessageUser = function (newMember) {
        var _this = this;
        // format: email, senderEmail
        this.openMsgWindow = newMember.id;
        this.data.loadMessage(newMember.email, this.currentUser.email)
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
        this.data.toMessage = newMember;
    };
    ProjectsFromMembers.prototype.CancelDelete = function () {
        this.DelCtrl = 0;
    };
    ProjectsFromMembers.prototype.Cancel = function () {
        this.projectstoUpdate = new Project();
        this.AlterProjectCtrl = 0;
    };
    ProjectsFromMembers.prototype.CheckDel = function (newProject) {
        this.DelCtrl = newProject.id;
    };
    ProjectsFromMembers.prototype.DeletePr = function (newProject) {
        var _this = this;
        this.data.DeleteProjectAction(newProject.id)
            .subscribe(function (success) {
            if (success) {
                _this.projects.splice(_this.projects.indexOf(newProject), 1);
                _this.ControllMsg = "Project Deleted";
                _this.DelCtrl = 0;
            }
        }, function (err) { return _this.ControllMsg = "Failed to Send Friend Request"; });
    };
    ProjectsFromMembers.prototype.AlterMyProject = function (newProject) {
        if (this.AlterProjectCtrl != 0) {
            this.AlterProjectCtrl = 0;
            this.toRemove = new Project();
            this.projectstoUpdate = new Project();
        }
        else {
            this.AlterProjectCtrl = newProject.id;
            this.toRemove = newProject;
            this.projectstoUpdate = newProject;
            this.selectedVerifyFile = newProject.id;
        }
    };
    ProjectsFromMembers.prototype.updateProject = function () {
        var _this = this;
        if (this.currentUser.id == this.projectstoUpdate.issueingId) {
            this.projectstoUpdate.dateTime = this.toRemove.dateTime;
            this.data.UpdateProject(this.projectstoUpdate)
                .subscribe(function (success) {
                if (success) {
                    _this.data.loadProjectsFromMemberPage(_this.data.projectsFromMembersListAvatar)
                        .subscribe(function (success) {
                        if (success) {
                            if (_this.data.projectsFromMembersList) {
                                _this.projects = _this.data.projectsFromMembersList;
                            }
                        }
                    });
                    _this.projectstoUpdate = new Project();
                    _this.AlterProjectCtrl = 0;
                }
            }, function (err) { return _this.ControllMsg = "Failed to Build Profile"; });
        }
    };
    ProjectsFromMembers.prototype.SettingsCircle = function (newPost) {
        if (this.OpenSettingsCircleP == newPost.id) {
            this.OpenSettingsCircleP = 0;
        }
        else {
            this.OpenSettingsCircleP = newPost.id;
        }
    };
    ProjectsFromMembers = __decorate([
        Component({
            selector: "fromMbrsProjectView",
            templateUrl: "fromMbrsProjectView.component.html",
            styleUrls: ["fromMbrsProjectView.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], ProjectsFromMembers);
    return ProjectsFromMembers;
}());
export { ProjectsFromMembers };
//# sourceMappingURL=fromMbrsProjectView.component.js.map