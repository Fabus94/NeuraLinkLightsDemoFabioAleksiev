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
var PostExplore = /** @class */ (function () {
    function PostExplore(data, router) {
        this.data = data;
        this.router = router;
        this.PrControllMsg = "";
        this.selectedFiles = null;
        this.exposts = [];
        this.exploreForPost = new ExplorePost();
        this.toExplorePage = new ExplorePost();
        this.uploadButtonCancel = 0;
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
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
    //Graphical controllers_________________________________________________________________
    PostExplore.prototype.ngOnInit = function () {
    };
    PostExplore.prototype.uploadSelectProject = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
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
            this.data.uploadFile(formData, blobDstnt)
                .subscribe(function (success) {
                if (success) {
                    _this.PrControllMsg = "File upload success!";
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                    _this.exploreForPost.document = _this.data.fileuri.primaryUri;
                }
                else {
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                }
            }, function (err) { return _this.PrControllMsg = "File upload failed, please try again"; });
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
        __metadata("design:paramtypes", [DataService, Router])
    ], PostExplore);
    return PostExplore;
}());
export { PostExplore };
//# sourceMappingURL=PostExplore.component.js.map