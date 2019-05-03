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
import { ExplorePost } from "../shared/Explore";
import { CountdownService } from "../shared/Timer";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
var PostExplore = /** @class */ (function () {
    function PostExplore(data, router, countdownService) {
        this.data = data;
        this.router = router;
        this.countdownService = countdownService;
        this.PrControllMsg = "";
        this.selectedFiles = null;
        this.exposts = [];
        this.exploreForPost = new ExplorePost();
        this.toExplorePage = new ExplorePost();
        this.uploadButtonCancel = 0;
        this.DelayResponceCtrl = new FormControl();
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
        //Graphical controllers_________________________________________________________________
        this.SwitchCountDown = 0;
        this.warn = 0;
    }
    PostExplore.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    PostExplore.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    PostExplore.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    PostExplore.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    PostExplore.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    //Check whether post is a pdf or other image file
    PostExplore.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PostExplore.prototype.ngOnInit = function () {
        var _this = this;
        //delay for preview head start API bot
        this.countdownService.countdown().subscribe(function (t) {
            if (_this.SwitchCountDown == 1) {
                if (_this.data.CountTest % 8 == 0) {
                    _this.SwitchCountDown = 0;
                }
            }
        });
        this.DelayResponceCtrl.valueChanges
            .pipe(debounceTime(7000))
            .subscribe(function (myControl) { return _this.exploreForPost.document = _this.data.fileuri.primaryUri; });
    };
    PostExplore.prototype.CheckWORD = function (check) {
        if (check.search(".doc") > 0 && check.search(".docx")) {
            return true;
        }
        else {
            return false;
        }
    };
    PostExplore.prototype.uploadSelectProject = function (event) {
        var size = event.target.files[0].size;
        if (size < 1000) {
            this.size = size;
            this.unit = "bytes";
        }
        else if (size < 1000 * 1000) {
            this.size = size / 1000;
            this.unit = "kb";
        }
        else if (size < 1000 * 1000 * 1000) {
            this.size = size / 1000 / 1000;
            this.unit = "mb";
        }
        else {
            this.size = size / 1000 / 1000 / 1000;
            this.unit = "gb";
        }
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null && size < 125829120) {
            this.FileUploadRun();
        }
        if (this.selectedFiles != null && size > 125829120) {
            this.warn = 2;
        }
        if (this.selectedFiles != null && size > 8388608 && size < 125829120) {
            this.warn = 1;
        }
        if (this.selectedFiles != null && size < 8388608) {
            this.warn = 0;
        }
    };
    PostExplore.prototype.CheckReleaseUpload = function () {
        if (this.data.DisableUploadButton == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PostExplore.prototype.FileUploadRun = function () {
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
            this.data.DisableUploadButton = 1;
            this.data.uploadFile(formData, blobDstnt)
                .subscribe(function (success) {
                if (success) {
                    _this.PrControllMsg = "File upload success!";
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                    if (_this.CheckWORD(_this.selectedFiles.name)) {
                        _this.exploreForPost.document = _this.data.holdImagePostDoc;
                        _this.DelayResponceCtrl.setValue(1);
                    }
                    if (!_this.CheckWORD(_this.selectedFiles.name)) {
                        _this.exploreForPost.document = _this.data.fileuri.primaryUri;
                        _this.DelayResponceCtrl.reset();
                    }
                    _this.data.DisableUploadButton = 0;
                }
                else {
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                    _this.data.DisableUploadButton = 0;
                }
            }, function (err) { return _this.data.DisableUploadButton = 0; });
        }
    };
    PostExplore.prototype.postMyExplorePost = function () {
        var _this = this;
        this.exploreForPost.issueingId = this.data.currentUser.id;
        this.toExplorePage = this.data.toExplorePage;
        //if (this.data.fileuri.primaryUri) {
        this.exploreForPost.document = this.data.fileuri.primaryUri;
        this.data.toggle();
        this.PrControllMsg = "Posting...";
        this.data.PostNewExplore(this.exploreForPost)
            .subscribe(function (success) {
            if (success) {
                _this.data.NavBackFromProfile = "exploreposts";
                _this.PrControllMsg = "Post upload success!";
                _this.data.toggle();
                _this.ClearM();
                _this.PostButton();
                _this.router.navigate(["afterexplorepost"]);
            }
        }, function (err) { return _this.PrControllMsg = "Failed to Post, please try again"; });
        //}
    };
    PostExplore.prototype.ClearM = function () {
        this.exploreForPost = new ExplorePost;
    };
    PostExplore.prototype.Listen = function () {
        if (this.data.CheckPostingOptions == 2) {
            return true;
        }
        else {
            return false;
        }
    };
    PostExplore.prototype.PostButton = function () {
        if (this.data.CheckPostingOptions == 0) {
            this.data.CheckPostingOptions = 2;
        }
        else {
            this.data.CheckPostingOptions = 0;
        }
    };
    PostExplore = __decorate([
        Component({
            selector: "postexplore",
            templateUrl: "postExplore.component.html",
            styleUrls: ["postExplore.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, CountdownService])
    ], PostExplore);
    return PostExplore;
}());
export { PostExplore };
//# sourceMappingURL=PostExplore.component.js.map