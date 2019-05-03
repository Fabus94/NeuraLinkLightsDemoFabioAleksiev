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
import { MailingList, NewMsgs, CircleDM_MailingList, ListsInvitesMail } from "../shared/Email";
import { Member } from "../shared/member";
import { DomSanitizer } from "@angular/platform-browser";
import { CircleDM } from "../shared/Circle";
import { Notifications } from "../shared/Notification";
import { CountdownService } from "../shared/Timer";
var MsgInterComp = /** @class */ (function () {
    function MsgInterComp(countdownService, data, router, sanitizer) {
        this.countdownService = countdownService;
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        //ControllMsg
        this.ControllMsg = "";
        this.MssMsg = "";
        this.UploadMsg = "";
        this.mailS = new MailingList();
        this.mailSCir = new CircleDM_MailingList();
        this.InvitedMembersListC = [];
        this.InvitedEmailList = [];
        this.currentUser = new Member();
        this.toMessage = new Member();
        this.toMessageGroup = new CircleDM;
        this.messages = [];
        this.circlemessagessidenav = [];
        this.selectedFiles = null;
        this.sendbackBlockedCheck = 0;
        this.uploadButtonCancel = 0;
        //Messages user to user send logic
        this.checkInput = 1;
        this.OpenListSave = 0;
        this.listToSend = new ListsInvitesMail();
        this.ListSavedTransfer = [];
        this.circleDMHopOns = [];
    }
    //Subscribe to timer service to load values every * of seconds 
    MsgInterComp.prototype.ngOnInit = function () {
        var _this = this;
        this.ListShowName = this.data.ListShowName;
        this.countdownService.countdown().subscribe(function (t) {
            if (_this.data.CountTest % 8 == 0) {
                if (_this.toMessage.id > 0) {
                    _this.FunctLoadMsg();
                }
                if (_this.toMessageGroup.id > 0) {
                    _this.FunctionLoadMsgGroup();
                }
            }
        });
    };
    MsgInterComp.prototype.PostMessage = function () {
        var _this = this;
        this.mailS.email = this.toMessage.email;
        this.mailS.senderEmail = this.currentUser.email;
        this.mailS.senderRef = this.currentUser.id;
        this.mailS.uniqueCheck = this.currentUser.id + this.toMessage.id;
        this.data.toggle();
        this.data.EmailRegister(this.mailS)
            .subscribe(function (success) {
            if (success) {
                _this.FunctLoadMsg();
                var _loop_1 = function (value) {
                    if (value.uniqueCheck == _this.mailS.uniqueCheck) {
                        value.recipientRef = _this.toMessage.id;
                        value.issuerRef = _this.currentUser.id;
                        value.headline = _this.currentUser.givenname + ": " + _this.mailS.message;
                        value.openedread = 1;
                        value.newDatetimeCol = new Date();
                        _this.data.toggle();
                        _this.data.UpdateNewMsgHeadline(value)
                            .subscribe(function (success) {
                            if (success) {
                                _this.data.toggle();
                                _this.mailS = new MailingList();
                                //this.FunctLoadMsg();
                                _this.data.conversations.splice(_this.data.conversations.indexOf(value), 1);
                                _this.data.conversations.unshift(value);
                            }
                        });
                    }
                };
                for (var _i = 0, _a = _this.data.conversations; _i < _a.length; _i++) {
                    var value = _a[_i];
                    _loop_1(value);
                }
                for (var _b = 0, _c = _this.data.conversations; _b < _c.length; _b++) {
                    var value = _c[_b];
                    if (value.uniqueCheck == _this.mailS.uniqueCheck) {
                        _this.checkInput = 2;
                    }
                }
                if (_this.checkInput == 1) {
                    var sendMsgVal = new NewMsgs();
                    sendMsgVal.recipientRef = _this.toMessage.id;
                    sendMsgVal.issuerRef = _this.currentUser.id;
                    sendMsgVal.headline = _this.currentUser.givenname + ": " + _this.mailS.message;
                    sendMsgVal.openedread = 1;
                    sendMsgVal.uniqueCheck = _this.mailS.uniqueCheck;
                    _this.data.toggle();
                    _this.data.PostNewMsgs(sendMsgVal)
                        .subscribe(function (success) {
                        if (success) {
                            _this.data.toggle();
                            _this.mailS = new MailingList();
                            //this.FunctLoadMsg();
                            _this.data.conversations.unshift(_this.data.toAppendMsgNew);
                        }
                    });
                }
            }
        });
    };
    MsgInterComp.prototype.OpenSave = function () {
        this.OpenListSave = 1;
    };
    MsgInterComp.prototype.ClearListName = function () {
        this.listToSend.name = "";
    };
    MsgInterComp.prototype.SaveList = function () {
        var _this = this;
        this.listToSend.listMember = JSON.stringify(this.InvitedMembersListC);
        this.listToSend.listEmail = JSON.stringify(this.InvitedEmailList);
        this.listToSend.memberId = this.currentUser.id;
        this.listToSend.length = this.InvitedMembersListC.length + this.InvitedEmailList.length;
        this.data.PostNewList(this.listToSend)
            .subscribe(function (success) {
            if (success) {
                _this.OpenListSave = 0;
                _this.Listlabel = "Saved " + _this.listToSend.name;
                _this.listToSend = new ListsInvitesMail();
                _this.data.loadListsInvites(_this.data.currentUser)
                    .subscribe(function (success) {
                    if (success) {
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get invitesList"; });
            }
        });
    };
    MsgInterComp.prototype.FunctLoadMsg = function () {
        var _this = this;
        this.data.loadMessage(this.toMessage.email, this.currentUser.email)
            .subscribe(function (success) {
            if (success) {
                _this.data.loadMessageConversations()
                    .subscribe(function (success) {
                    if (success) {
                        _this.data.UpdateMsgtoRead();
                        _this.data.toggle();
                    }
                });
            }
        });
    };
    MsgInterComp.prototype.PostMessageGroup = function () {
        var _this = this;
        this.mailSCir.senderEmail = this.currentUser.email;
        this.mailSCir.senderRef = this.currentUser.id;
        this.mailSCir.circleDMid = this.toMessageGroup.id;
        this.mailSCir.senderName = this.currentUser.title + " " + this.currentUser.givenname + " " + this.currentUser.familyname;
        this.data.toggle();
        this.data.EmailCircleDM(this.mailSCir)
            .subscribe(function (success) {
            if (success) {
                var NotfMsg = new CircleDM_MailingList();
                NotfMsg = _this.mailSCir;
                _this.data.GetCircleDMHopOns(_this.toMessageGroup.id)
                    .subscribe(function (success) {
                    if (success) {
                        _this.circleDMHopOns = _this.data.circleDMHopOns;
                        for (var _i = 0, _a = _this.circleDMHopOns; _i < _a.length; _i++) {
                            var value = _a[_i];
                            var SendNot = new Notifications();
                            SendNot.postId = _this.toMessageGroup.id;
                            SendNot.recipientRef = value.memberId;
                            SendNot.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " wrote: " + NotfMsg.message;
                            SendNot.valueTitle = "New Group Chat message on " + _this.toMessageGroup.title;
                            _this.data.SendNotCircle(SendNot)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
                        }
                        if (_this.toMessageGroup.issueingId != _this.currentUser.id) {
                            var SendNotPer = new Notifications();
                            SendNotPer.postId = _this.toMessageGroup.id;
                            SendNotPer.recipientRef = _this.toMessageGroup.issueingId;
                            SendNotPer.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " wrote: " + NotfMsg.message;
                            SendNotPer.valueTitle = "New Group Chat message on your Circle: " + _this.toMessageGroup.title;
                            _this.data.SendNotCircle(SendNotPer)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
                        }
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
                _this.FunctionLoadMsgGroup();
            }
        });
    };
    MsgInterComp.prototype.FunctionLoadMsgGroup = function () {
        var _this = this;
        this.data.loadMessageCirclePostSidenav(this.toMessageGroup)
            .subscribe(function (success) {
            if (success) {
                _this.mailSCir.message = "";
                _this.circlemessagessidenav = _this.data.circlemessagessidenav;
            }
        });
    };
    MsgInterComp.prototype.Close = function () {
        this.data.toMessage = new Member();
        this.toMessage = new Member();
        this.mailS = new MailingList();
        this.selectedFiles = null;
        this.data.MessCtrl = 0;
    };
    MsgInterComp.prototype.CloseGroup = function () {
        this.data.toMessageGroup = new CircleDM();
        this.toMessageGroup = new CircleDM();
        this.mailSCir = new CircleDM_MailingList();
        this.selectedFiles = null;
        this.data.OpenGroupChat = 0;
    };
    MsgInterComp.prototype.CloseInv = function () {
        this.data.OpenSienavInvites = 0;
    };
    MsgInterComp.prototype.ProfilePage = function (newMember) {
        if (this.data.toProfilePage) {
            this.data.toProfilePage = new Member();
        }
        //we are moving the project.member to the profilePage view
        this.data.toProfilePage = newMember;
        if (this.data.toProjectPage) {
            this.router.navigate(["profile"]);
        }
    };
    MsgInterComp.prototype.OpenFullCom = function (newMsg) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newMsg.document;
        if (this.data.DocumentFull) {
            this.data.NavRedirect = 1;
            if (this.data.NavRedirect == 1) {
                this.router.navigate(["startPage"]);
            }
        }
    };
    MsgInterComp.prototype.OpenFullComGroup = function (newMsg) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newMsg.document;
        if (this.data.DocumentFull) {
            this.data.NavRedirect = 1;
            if (this.data.NavRedirect == 1) {
                this.router.navigate(["startPage"]);
            }
        }
    };
    //implementing a listen check and elements import from data service => use instead of onInit in selector intialized components
    MsgInterComp.prototype.Listen = function () {
        if (this.data.MessCtrl == 1 || this.data.OpenSienavInvites == 1 || this.data.OpenGroupChat == 1) {
            this.currentUser = this.data.currentUser;
            this.toMessage = this.data.toMessage;
            this.toMessageGroup = this.data.toMessageGroup;
            this.circlemessagessidenav = this.data.circlemessagessidenav;
            this.messages = this.data.messages;
            this.sendbackBlockedCheck = this.data.sendbackBlockedCheck;
            this.InvitedEmailList = this.data.InvitedEmailList;
            this.InvitedMembersListC = this.data.InvitedMembersListC;
            return true;
        }
        else {
            return false;
        }
    };
    MsgInterComp.prototype.CheckSection = function () {
        if (this.data.OpenSienavInvites == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    MsgInterComp.prototype.CheckSectionGroup = function () {
        if (this.data.OpenGroupChat == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    MsgInterComp.prototype.AddSelectedFileNumber = function (id) {
        this.selectedVerifyFile = id;
        if (this.selectedFiles != null) {
            this.selectedFiles = null;
        }
    };
    MsgInterComp.prototype.Clear = function () {
        this.mailS = new MailingList();
        this.selectedFiles = null;
    };
    MsgInterComp.prototype.ClearGroup = function () {
        this.mailSCir = new CircleDM_MailingList();
        this.selectedFiles = null;
    };
    MsgInterComp.prototype.uploadSelectProfile = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
        }
    };
    MsgInterComp.prototype.uploadSelectProject = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
        }
    };
    MsgInterComp.prototype.CheckReleaseUpload = function () {
        if (this.data.DisableUploadButton == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    MsgInterComp.prototype.FileUploadRun = function () {
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
                    _this.mailS.document = _this.data.fileuri.primaryUri;
                    _this.mailSCir.document = _this.data.fileuri.primaryUri;
                }
                else {
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                }
                _this.data.DisableUploadButton = 0;
            }, function (err) { return _this.data.DisableUploadButton = 0; });
        }
    };
    MsgInterComp.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    MsgInterComp.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    MsgInterComp.prototype.RemoveListI = function (newInvite) {
        this.data.InvitedEmailList.splice(this.data.InvitedEmailList.indexOf(newInvite), 1);
    };
    MsgInterComp.prototype.RemoveUserI = function (newInvite) {
        this.data.InvitedMembersListC.splice(this.data.InvitedMembersListC.indexOf(newInvite), 1);
    };
    MsgInterComp = __decorate([
        Component({
            selector: "msg-service",
            templateUrl: "message.component.html",
            styleUrls: ["message.component.css"]
        }),
        __metadata("design:paramtypes", [CountdownService, DataService, Router, DomSanitizer])
    ], MsgInterComp);
    return MsgInterComp;
}());
export { MsgInterComp };
//# sourceMappingURL=MsgInter.component.js.map