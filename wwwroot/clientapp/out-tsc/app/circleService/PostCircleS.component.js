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
import { CircleDM } from "../shared/Circle";
import { InviteCircle } from "../shared/invite";
import { FormControl } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import { CircleDM_MailingList, UserEmail } from "../shared/Email";
import { CountdownService } from "../shared/Timer";
var PostCircle = /** @class */ (function () {
    function PostCircle(data, router, countdownService) {
        this.data = data;
        this.router = router;
        this.countdownService = countdownService;
        this.PrControllMsg = "";
        this.selectedFiles = null;
        this.exposts = [];
        this.circleForPost = new CircleDM();
        this.toCirclePage = new CircleDM();
        this.InvitedMembersListC = [];
        this.InvitedEmailList = [];
        this.uploadButtonCancel = 0;
        //Import Search
        this.searchresultMember = [];
        this.myControl = new FormControl();
        this.DelayResponceCtrl = new FormControl();
        this.NavSearchTerm = "";
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
        //Graphical controllers_________________________________________________________________
        this.userInvitesList = [];
        this.SwitchCountDown = 0;
        this.warn = 0;
    }
    PostCircle.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    PostCircle.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    PostCircle.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    PostCircle.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    PostCircle.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    //Check whether post is a pdf or other image file
    PostCircle.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PostCircle.prototype.LoadPresetList = function (newList) {
        this.data.OpenSienavInvites = 1;
        this.data.ListShowName = newList.name;
        this.InvitedEmailList = JSON.parse(newList.listEmail);
        this.data.InvitedEmailList = this.InvitedEmailList;
        this.InvitedMembersListC = JSON.parse(newList.listMember);
        this.data.InvitedMembersListC = this.InvitedMembersListC;
        this.data.MessCtrl = 0;
        this.data.OpenGroupChat = 0;
    };
    PostCircle.prototype.ngOnInit = function () {
        var _this = this;
        //delay for preview head start API bot
        this.countdownService.countdown().subscribe(function (t) {
            if (_this.SwitchCountDown == 1) {
                if (_this.data.CountTest % 8 == 0) {
                    _this.circleForPost.document = _this.data.fileuri.primaryUri;
                    _this.SwitchCountDown = 0;
                }
            }
        });
        this.NavSearchTerm = this.data.NavSearchTerm;
        if (this.NavSearchTerm != null && this.myControl.value == null && this.data.SearchTermCheckBack == 1) {
            this.data.SearchMember(this.NavSearchTerm)
                .subscribe(function (success) {
                if (success) {
                    _this.searchresultMember = _this.data.searchresultMember;
                }
            }, function (err) { return _this.ControllMsg = "Failed to get search"; });
        }
        //Add Search User Ctrl
        this.myControl.valueChanges
            .pipe(debounceTime(400))
            .subscribe(function (myControl) { return _this.data.SearchMember(myControl)
            .subscribe(function (success) {
            if (success) {
                _this.searchresultMember = _this.data.searchresultMember;
            }
        }, function (err) { return _this.ControllMsg = "Failed to get search"; }); });
        this.myControl.valueChanges
            .pipe(debounceTime(400))
            .subscribe(function (myControl) { return _this.ValueClone = myControl; });
        this.DelayResponceCtrl.valueChanges
            .pipe(debounceTime(7000))
            .subscribe(function (myControl) { return _this.circleForPost.document = _this.data.fileuri.primaryUri; });
    };
    PostCircle.prototype.CheckWORD = function (check) {
        if (check.search(".doc") > 0 && check.search(".docx")) {
            return true;
        }
        else {
            return false;
        }
    };
    PostCircle.prototype.uploadSelectProject = function (event) {
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
    PostCircle.prototype.CheckReleaseUpload = function () {
        if (this.data.DisableUploadButton == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    //
    PostCircle.prototype.delayResponceUp = function () {
    };
    PostCircle.prototype.FileUploadRun = function () {
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
                    _this.data.DisableUploadButton = 0;
                    if (_this.CheckWORD(_this.selectedFiles.name)) {
                        _this.circleForPost.document = _this.data.holdImagePostDoc;
                        _this.DelayResponceCtrl.setValue(1);
                    }
                    if (!_this.CheckWORD(_this.selectedFiles.name)) {
                        _this.circleForPost.document = _this.data.fileuri.primaryUri;
                        _this.DelayResponceCtrl.reset();
                    }
                }
                else {
                    _this.data.DisableUploadButton = 0;
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                }
            }, function (err) { return _this.data.DisableUploadButton = 0; });
        }
    };
    PostCircle.prototype.ConstrMsgFormat = function () {
        /*Notice begining of multi-line*/
        if (this.CheckPDF(this.circleForPost.document)) {
            this.MessageConstr = "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <title>New Circle Invite IriSearchcircle</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width\">\n    <style type=\"text/css\">\n\n        /* CLIENT-SPECIFIC STYLES ------------------- */\n\n\n        /* RESET STYLES --------------------------- */\n\n\n\n        /* MOBILE STYLES ------------------------ */\n\n\n    </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr style=\"background-color:#FF2E03\">\n                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        <img src=\"https://fabioirisdata16.blob.core.windows.net:443/iris-app-files/bfc081de-90d2-466d-a3e9-80d62d24b1bb.png\" width=\"84\" height=\"84\" alt=\"IriSearchcircle\" style=\"font-family:'Dosis', sans-serif;\n    font-size: 30px; color:steelblue\" />\n                                    </td>\n                                    <td style=\"color:#FF2E03; font-family: 'Dosis', sans-serif;\n    font-size: 30px; \">\n                                        New Circle Invite\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td style=\" font-family: 'Dosis', sans-serif;\n    font-size: 22px;\">\n                                        " + this.circleForPost.title + "\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                      " + this.circleForPost.post + "\n                                    </td>\n                                </tr>\n\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr style=\"  margin-left: auto !important;\n    margin-right: auto !important;\">\n                                    <td style=\" text-align: justify;\n    text-justify: inter-word;\n    font-size: 18px;\n    font-family: 'Dosis', sans-serif;\">\n\n\n                                        <p><strong>Caution</strong></p>\n                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n                                        <p> Pdf download available from the green arrow icon below</p>\n                                        <p>\n                                            Remeber STA stop, think, assess whether content is safe before downloading files from your email\n                                        </p>\n\n                                        <br />\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                    <td style=\" text-align: justify;\n    text-justify: inter-word;\n    font-size: 18px;\n    font-family: 'Dosis', sans-serif;\">\n                                        <p style=\"position: relative;\n    overflow: hidden;\n    display: inline-block;\">\n\n\n                                            <a href=\"" + this.circleForPost.document + "\" download=\"dowload file\" alt=\"Download .pdf\">\n                                                <img class=\"img\" src=\"https://fabioirisdata16.blob.core.windows.net/iris-app-files/dW_USE_19120.png\" height=\"60\" width=\"60\" style=\"color:#FF2E03; font-family: 'Dosis', sans-serif;\n    font-size: 30px; text-align:  justify;\n    text-justify: inter-word;\n    font-weight: 400;\n    display:inline-block;\" />\n\n                                            </a>\n\n\n                                        </p>\n\n\n                                        <br />\n                                    </td>\n                                </tr>\n<tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        <p> Author </p>\n                                        <p> <img class=\"img\" src=\"" + this.data.currentUser.avatar + "\" width=\"75\" height=\"75\" alt=\" " + this.data.currentUser.givenname + "\" style=\"color:#FF2E03; font-family: 'Dosis', sans-serif;\n    font-size: 30px; text-align:  justify;\n    text-justify: inter-word;\n    font-weight: 400;\n    display:inline-block;\" /> " + this.data.currentUser.givenname + " " + this.data.currentUser.familyname + "  </p>\n                                      <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>\n                                    <p>" + this.data.currentUser.organization + " </p>\n                                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>\n                                    <p>" + this.data.currentUser.email + " </p>\n                                    </td>\n                                </tr>\n\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr style=\"background-color:#FF2E03\">\n                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td style=\" text-align: justify;\n    text-justify: inter-word;\n    font-size: 18px;\n    font-family: 'Dosis', sans-serif; color:steelblue\">\n                            <p>IriSearchcircle, readable content sharing made easy! Join us to post content, like, message, comment and follow your friends, find our web app on  <a href=\"https://irisearchcircle.com\">www.irisearchcircle.com &rarr;</a></p>\n                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <!-- TWO COLUMNS -->\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        <!-- LEFT COLUMN -->\n                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"57%\" align=\"left\">\n                                            <tr>\n                                                <td>\n                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                        <tr>\n                                                            <td>\n                                                                2019 IriSearchcircle LLC All rights Reserved\n                                                            </td>\n                                                        </tr>\n                                                        <tr>\n                                                            <td>\n                                                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n                                                            </td>\n                                                        </tr>\n                                                    </table>\n                                                </td>\n                                            </tr>\n                                        </table>\n                                        <!-- RIGHT COLUMN -->\n                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"37%\" align=\"right\">\n                                            <tr>\n                                                <td class=\"mobile-column-right\">\n                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                        <tr>\n                                                            <td></td>\n                                                        </tr>\n                                                        <tr>\n                                                            <td align=\"left\">\n                                                                <a style=\"color:#FF2E03\" href=\"https://irisearchcircle.com/contact\">Contact</a> &nbsp;&nbsp;\n\n                                                                <a style=\"color:#FF2E03\" href=\"https://irisearchcircle.com/about\">About</a>\n                                                            </td>\n                                                        </tr>\n\n                                                    </table>\n                                                </td>\n                                            </tr>\n                                        </table>\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- FOOTER -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <p> Do not recieve mail from IriSearchcircle users <a href=\"#\">-Opt out</a></p>\n                        </td>\n                    </tr>  \n                    <tr>\n                        <td>\n                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">                  \n                    <tr>\n                        <td>                          \n                            <p>Company Address Soon</p>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n</body>\n</html>\n\n"; /*Notice end of multi-line*/
        }
        if (!this.CheckPDF(this.circleForPost.document)) {
            this.MessageConstr = "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <title>New Circle Invite IriSearchcircle</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width\">\n    <style type=\"text/css\">\n\n        /* CLIENT-SPECIFIC STYLES ------------------- */\n\n\n        /* RESET STYLES --------------------------- */\n\n\n\n        /* MOBILE STYLES ------------------------ */\n\n\n    </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr style=\"background-color:#FF2E03\">\n                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        <img src=\"https://fabioirisdata16.blob.core.windows.net:443/iris-app-files/bfc081de-90d2-466d-a3e9-80d62d24b1bb.png\" width=\"84\" height=\"84\" alt=\"IriSearchcircle\" style=\"font-family:'Dosis', sans-serif;\n    font-size: 30px; color:steelblue\" />\n                                    </td>\n                                    <td style=\"color:#FF2E03; font-family: 'Dosis', sans-serif;\n    font-size: 30px; \">\n                                        New Circle Invite\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td style=\" font-family: 'Dosis', sans-serif;\n    font-size: 22px;\">\n                                        " + this.circleForPost.title + "\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                      " + this.circleForPost.post + "\n                                    </td>\n                                </tr>\n  <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        <a href=\"" + this.circleForPost.document + "\" download=\"dowload file\">\n                                            <img class=\"img\" src=\"" + this.circleForPost.document + "\" width=\"612\" height=\"572\" alt=\" " + this.circleForPost.title + "\" style=\"color:#FF2E03; font-family: 'Dosis', sans-serif;\n    font-size: 30px; text-align:  justify;\n    text-justify: inter-word;\n    font-weight: 400;\n    display:inline-block;\" />\n                                        </a>\n                                    </td>\n                                </tr>\n\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                              <tr>\n                                    <td>\n                                        <p> Author </p>\n                                        <p> <img class=\"img\" src=\"" + this.data.currentUser.avatar + "\" width=\"75\" height=\"75\" alt=\" " + this.data.currentUser.givenname + "\" style=\"color:#FF2E03; font-family: 'Dosis', sans-serif;\n    font-size: 30px; text-align:  justify;\n    text-justify: inter-word;\n    font-weight: 400;\n    display:inline-block;\" /> " + this.data.currentUser.givenname + " " + this.data.currentUser.familyname + "  </p>\n                                      <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>\n                                    <p>" + this.data.currentUser.organization + " </p>\n                                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>\n                                    <p>" + this.data.currentUser.email + " </p>\n                                    </td>\n                                </tr>\n\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                               \n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr style=\"background-color:#FF2E03\">\n                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td style=\" text-align: justify;\n    text-justify: inter-word;\n    font-size: 18px;\n    font-family: 'Dosis', sans-serif; color:steelblue\">\n                            <p>IriSearchcircle, readable content sharing made easy! Join us to post content, like, message, comment and follow your friends, find our web app on  <a href=\"https://irisearchcircle.com\">www.irisearchcircle.com &rarr;</a></p>\n                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <!-- TWO COLUMNS -->\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        <!-- LEFT COLUMN -->\n                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"57%\" align=\"left\">\n                                            <tr>\n                                                <td>\n                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                        <tr>\n                                                            <td>\n                                                                2019 IriSearchcircle LLC All rights Reserved\n                                                            </td>\n                                                        </tr>\n                                                        <tr>\n                                                            <td>\n                                                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n                                                            </td>\n                                                        </tr>\n                                                    </table>\n                                                </td>\n                                            </tr>\n                                        </table>\n                                        <!-- RIGHT COLUMN -->\n                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"37%\" align=\"right\">\n                                            <tr>\n                                                <td class=\"mobile-column-right\">\n                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                        <tr>\n                                                            <td></td>\n                                                        </tr>\n                                                        <tr>\n                                                            <td align=\"left\">\n                                                                <a style=\"color:#FF2E03\" href=\"https://irisearchcircle.com/contact\">Contact</a> &nbsp;&nbsp;\n\n                                                                <a style=\"color:#FF2E03\" href=\"https://irisearchcircle.com/about\">About</a>\n                                                            </td>\n                                                        </tr>\n\n                                                    </table>\n                                                </td>\n                                            </tr>\n                                        </table>\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- FOOTER -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <p> Do not recieve mail from IriSearchcircle users <a href=\"#\">-Opt out</a></p>\n                        </td>\n                    </tr>  \n                    <tr>\n                        <td>\n                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">                  \n                    <tr>\n                        <td>                          \n                            <p>Company Address Soon</p>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n</body>\n</html>\n\n"; /*Notice end of multi-line*/
        }
    };
    PostCircle.prototype.postMyCirclePost = function () {
        var _this = this;
        this.circleForPost.issueingId = this.data.currentUser.id;
        this.toCirclePage = this.data.toCirclePage;
        //if (this.data.fileuri.primaryUri) {
        this.circleForPost.document = this.data.fileuri.primaryUri;
        this.data.toggle();
        this.PrControllMsg = "Posting...";
        this.data.PostNewCircle(this.circleForPost)
            .subscribe(function (success) {
            if (success) {
                //section send invites for the post
                for (var _i = 0, _a = _this.data.InvitedMembersListC; _i < _a.length; _i++) {
                    var value = _a[_i];
                    var CircleInviteValue = new InviteCircle();
                    CircleInviteValue.postId = _this.data.toCirclePage.id;
                    CircleInviteValue.invitedMbr = value.id;
                    CircleInviteValue.requestingMbr = _this.data.currentUser.id;
                    CircleInviteValue.invitedEmail = value.email;
                    CircleInviteValue.uniqueCheck = _this.data.toCirclePage.id + value.id;
                    _this.data.SendRequestCircle(CircleInviteValue)
                        .subscribe(function (success) {
                        if (success) {
                            _this.PrControllMsg = "Check";
                        }
                    }, function (err) { return _this.PrControllMsg = "Failed to send friend request, please try again"; });
                }
                _this.ConstrMsgFormat();
                for (var _b = 0, _c = _this.data.InvitedEmailList; _b < _c.length; _b++) {
                    var value = _c[_b];
                    var NewMail = new CircleDM_MailingList();
                    NewMail.circleDMid = _this.data.toCirclePage.id;
                    NewMail.senderEmail = _this.data.currentUser.email;
                    NewMail.senderRef = _this.data.currentUser.id;
                    NewMail.senderName = _this.data.currentUser.title + " "
                        + _this.data.currentUser.givenname + " " + _this.data.currentUser.familyname;
                    NewMail.email = value.email;
                    NewMail.message = _this.MessageConstr;
                    _this.data.SendRequestCircleEmail(NewMail)
                        .subscribe(function (success) {
                        if (success) {
                            _this.PrControllMsg = "Check";
                        }
                    }, function (err) { return _this.PrControllMsg = "Failed to send friend request, please try again"; });
                }
                // section end
                _this.circleForPost = new CircleDM();
                _this.Close();
                _this.data.InvitedMembersListC = _this.InvitedMembersListC;
                _this.data.InvitedEmailList = _this.InvitedEmailList;
                _this.data.NavBackFromProfile = "circlesC";
                _this.PrControllMsg = "Post upload success!";
                _this.data.toggle();
                _this.data.OpenSienavInvites = 0;
                _this.data.InvitedMembersListC = [];
                _this.data.InvitedEmailList = [];
                _this.router.navigate(["aftercicrlepost"]);
            }
        }, function (err) { return _this.PrControllMsg = "Failed to Post, please try again"; });
        //}
    };
    PostCircle.prototype.AddFriendsToList = function () {
        var _this = this;
        for (var _i = 0, _a = this.data.circlesToMbrs; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.circleFriend == this.data.currentUser.id && value.circleUser != this.data.currentUser.id) {
                this.data.selectCircleFriends(value.circleUser)
                    .subscribe(function (success) {
                    if (success) {
                        _this.InvitedMembersListC.push(_this.data.myCircleMemberFr);
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get my invites"; });
            }
            else if (value.circleUser == this.data.currentUser.id && value.circleFriend != this.data.currentUser.id) {
                this.data.selectCircleFriends(value.circleUser)
                    .subscribe(function (success) {
                    if (success) {
                        _this.InvitedMembersListC.push(_this.data.myCircleMemberFr);
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get my invites"; });
            }
            ;
        }
        this.data.OpenSienavInvites = 1;
        this.data.MessCtrl = 0;
        this.data.OpenGroupChat = 0;
        this.data.InvitedMembersListC = this.InvitedMembersListC;
    };
    //aux function in this context
    PostCircle.prototype.ClearM = function () {
        this.circleForPost = new CircleDM();
    };
    PostCircle.prototype.Listen = function () {
        if (this.data.CheckPostingOptions == 1) {
            this.userInvitesList = this.data.userInvitesList;
            return true;
        }
        else {
            return false;
        }
    };
    //Now Add Controll to append the InviteLists
    PostCircle.prototype.AddToInvitedMembersListC = function (newMember) {
        this.InvitedMembersListC.push(newMember);
        this.data.OpenSienavInvites = 1;
        this.data.MessCtrl = 0;
        this.data.OpenGroupChat = 0;
        this.data.InvitedMembersListC = this.InvitedMembersListC;
    };
    //Use this check to synchronize this Invites list with the data Servise Ones, this function is called 60x per second
    //so the list will be accurate
    PostCircle.prototype.CheckShowInvtBtn = function () {
        if (this.data.InvitedEmailList.length > 0 && this.data.OpenSienavInvites == 0
            || this.data.InvitedMembersListC.length > 0 && this.data.OpenSienavInvites == 0) {
            this.InvitedMembersListC = this.data.InvitedMembersListC;
            this.InvitedEmailList = this.data.InvitedEmailList;
            return true;
        }
        else {
            return false;
        }
    };
    PostCircle.prototype.ShowInvtsSect = function () {
        this.data.OpenSienavInvites = 1;
        this.data.MessCtrl = 0;
        this.data.OpenGroupChat = 0;
    };
    PostCircle.prototype.SearchResults = function () {
        if (this.searchresultMember.length == 0) {
            var EmailVal = new UserEmail();
            EmailVal.email = this.myControl.value;
            if (this.data.InvitedEmailList.includes(EmailVal)) {
                this.myControl.reset();
            }
            else {
                this.InvitedEmailList.push(EmailVal);
                this.data.OpenSienavInvites = 1;
                this.data.MessCtrl = 0;
                this.data.OpenGroupChat = 0;
                this.data.InvitedEmailList = this.InvitedEmailList;
            }
        }
        this.myControl.reset();
    };
    PostCircle.prototype.PostButton = function () {
        if (this.data.CheckPostingOptions == 0) {
            this.data.CheckPostingOptions = 1;
        }
        else {
            this.data.numCheckPost = 0;
        }
    };
    PostCircle.prototype.CheckMain = function () {
        if (this.searchresultMember.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PostCircle.prototype.CheckSecondary = function () {
        if (this.ValueClone != null) {
            return true;
        }
        else {
            return false;
        }
    };
    PostCircle.prototype.Clear = function () {
        this.myControl.reset();
    };
    PostCircle.prototype.Close = function () {
        this.data.CheckPostingOptions = 0;
    };
    PostCircle = __decorate([
        Component({
            selector: "postcircle",
            templateUrl: "postCircleS.component.html",
            styleUrls: ["postCircleS.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, CountdownService])
    ], PostCircle);
    return PostCircle;
}());
export { PostCircle };
//# sourceMappingURL=PostCircleS.component.js.map