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
import { Project } from "../shared/Project";
//import * as jspdf from 'jspdf';
//import html2canvas from 'html2canvas';
var PostProject = /** @class */ (function () {
    function PostProject(data, router) {
        this.data = data;
        this.router = router;
        this.PrControllMsg = "";
        this.uploadButtonCancel = 0;
        this.selectedFiles = null;
        this.projectForPost = new Project();
        this.toPostPage = new Project();
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
    }
    PostProject.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    PostProject.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    PostProject.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    PostProject.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    PostProject.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    //Check whether post is a pdf or other image file
    //---UPLOAD Ctrl__________________________________________________
    PostProject.prototype.ngOnInit = function () {
    };
    PostProject.prototype.uploadSelectProject = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
        }
    };
    PostProject.prototype.FileUploadRun = function () {
        var _this = this;
        if (this.selectedFiles) {
            //spec blob storage folder
            var blobDstnt = "accounts-projects";
            var formData = new FormData();
            formData.append('filemy', this.selectedFiles, this.selectedFiles.name);
            this.data.toggle();
            this.uploadButtonCancel = 1;
            this.PrControllMsg = "Uploading...";
            // form data submit
            this.data.uploadFile(formData, blobDstnt)
                .subscribe(function (success) {
                if (success) {
                    _this.projectForPost.document = _this.data.fileuri.primaryUri;
                    _this.PrControllMsg = "File upload Success!";
                    _this.uploadButtonCancel = 0;
                    _this.data.toggle();
                    ////functionConvert pdf local function
                    //var str2DOMElement = function (html) {
                    //    var frame = document.createElement('iframe');
                    //    frame.style.display = 'none';
                    //    document.body.appendChild(frame);
                    //    frame.contentDocument.open();
                    //    frame.contentDocument.write(html);
                    //    frame.contentDocument.close();
                    //    var el = frame.contentDocument.body.firstChild;
                    //    return el;
                    //}
                    //var el = document.getElementById('convert')    /*str2DOMElement(this.data.doc);*/
                    //html2canvas(el).then(canvas => {
                    //    // Few necessary setting options
                    //    var imgWidth = 208;
                    //    var pageHeight = 295;
                    //    var imgHeight = canvas.height * imgWidth / canvas.width;
                    //    var heightLeft = imgHeight;
                    //    const contentDataURL = canvas.toDataURL('image/png')
                    //    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
                    //    var position = 0;
                    //    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
                    //    var selectedFile: File = pdf.save('MYPdf.pdf');
                    //    formData.append('filemy', selectedFile, 'filemy');
                    //    this.data.reuploadFile(formData, blobDstnt)
                    //        .subscribe(success => {
                    //            if (success) {
                    //                this.projectForPost.document = this.data.fileuri.primaryUri
                    //                this.PrControllMsg = "File upload Success!";
                    //                this.uploadButtonCancel = 0;
                    //                this.data.toggle();
                    //            }
                    //        }, err => this.PrControllMsg = "File upload failed, please try again");
                    //});
                    ////functionConvert pdf
                }
            }, function (err) { return _this.PrControllMsg = "File upload failed, please try again"; });
            this.uploadButtonCancel = 0;
            this.data.toggle();
        }
    };
    //---UPLOAD Ctrl__________________________________________________
    PostProject.prototype.postMyProject = function () {
        var _this = this;
        this.projectForPost.issueingId = this.data.currentUser.id;
        this.toPostPage = this.data.toPostPage;
        //if (this.data.fileuri.primaryUri) {
        this.data.PostNewProject(this.projectForPost)
            .subscribe(function (success) {
            if (success) {
                _this.Close();
                _this.data.NavBackFromProfile = "projects";
                _this.projectForPost = new Project();
                _this.router.navigate(["projectindiv"]);
            }
        }, function (err) { return _this.PrControllMsg = "Failed to Post"; });
        //}
    };
    PostProject.prototype.PostButton = function () {
        if (this.data.numCheckPostProject == 0) {
            this.data.CheckPostingOptions = 3;
        }
        else {
            this.data.numCheckPostProject = 0;
        }
    };
    PostProject.prototype.Close = function () {
        this.data.CheckPostingOptions = 0;
    };
    PostProject.prototype.Listen = function () {
        if (this.data.CheckPostingOptions == 3) {
            return true;
        }
        else {
            return false;
        }
    };
    PostProject.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PostProject.prototype.Clear = function () {
        this.projectForPost = new Project();
    };
    PostProject = __decorate([
        Component({
            selector: "postproject",
            templateUrl: "postProject.component.html",
            styleUrls: ["postProject.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], PostProject);
    return PostProject;
}());
export { PostProject };
//# sourceMappingURL=PostProject.component.js.map