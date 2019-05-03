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
import { MailingList, NewMsgs } from "../shared/Email";
import { Member } from "../shared/member";
import { DomSanitizer } from "@angular/platform-browser";
var messageMainPage = /** @class */ (function () {
    function messageMainPage(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        //ControllMsg
        this.ControllMsg = "";
        this.MssMsg = "";
        this.UploadMsg = "";
        this.OpenConversation = 0;
        this.mailS = new MailingList();
        this.currentUser = new Member();
        this.toMessage = new Member();
        this.messages = [];
        this.selectedFiles = null;
        this.conversations = [];
        this.messageReturn = new NewMsgs();
    }
    messageMainPage.prototype.ngOnInit = function () {
        this.currentUser = this.data.currentUser;
        this.conversations = this.data.conversations;
        this.toMessage = this.data.toMessage;
    };
    messageMainPage.prototype.PostMessage = function () {
        var _this = this;
        this.mailS.email = this.toMessage.email;
        this.mailS.senderEmail = this.currentUser.email;
        this.mailS.document = this.data.fileuri.primaryUri;
        this.mailS.senderRef = this.currentUser.id;
        this.mailS.uniqueCheck = this.currentUser.id + this.toMessage.id;
        //this.data.Email(this.mailS)
        //    .subscribe(success => {
        //        if (success) {
        //            this.mailS = new MailingList();
        this.data.EmailRegister(this.mailS)
            .subscribe(function (success) {
            if (success) {
                for (var _i = 0, _a = _this.data.conversations; _i < _a.length; _i++) {
                    var value = _a[_i];
                    if (value.uniqueCheck != _this.mailS.uniqueCheck) {
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
                                _this.FunctLoadMsg();
                            }
                        });
                    }
                }
            }
        });
        //    }
        //}, err => this.MssMsg = "Network error, please try again");
    };
    messageMainPage.prototype.FunctLoadMsg = function () {
        var _this = this;
        this.data.loadMessage(this.toMessage.email, this.currentUser.email)
            .subscribe(function (success) {
            if (success) {
                _this.data.UpdateMsgtoRead();
            }
        });
    };
    messageMainPage.prototype.Clear = function () {
        var _this = this;
        this.data.loadMessageConversations()
            .subscribe(function (success) {
            if (success) {
                _this.data.UpdateMsgtoRead();
                _this.conversations = _this.data.conversations;
            }
        });
        this.mailS = new MailingList();
        this.OpenConversation = 0;
    };
    messageMainPage.prototype.ProfilePage = function (newMember) {
        if (this.data.toProfilePage) {
            this.data.toProfilePage = new Member();
        }
        this.data.toProfilePage = newMember;
        if (this.data.toProfilePage) {
            this.data.NavBackFromProfile = "messages";
            this.data.NavRedirect = 5;
            if (this.data.NavRedirect == 5) {
                this.data.NavBackFromProfile = "messages";
                this.router.navigate(["startPage"]);
            }
        }
    };
    //implementing a listen check and elements import from data service => use instead of onInit in selector intialized components
    messageMainPage.prototype.ListenMain = function () {
        this.conversations = this.data.conversations;
        return true;
    };
    messageMainPage.prototype.uploadSelectProject = function (event) {
        this.selectedFiles = event.target.files[0];
    };
    messageMainPage.prototype.CheckReleaseUpload = function () {
        if (this.data.DisableUploadButton == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    messageMainPage.prototype.FileUploadRun = function () {
        var _this = this;
        if (this.selectedFiles) {
            //spec blob storage folder
            var blobDstnt = "accounts-projects";
            var formData = new FormData();
            formData.append('filemy', this.selectedFiles, this.selectedFiles.name);
            // form data submit
            this.data.DisableUploadButton = 1;
            this.data.uploadFile(formData, blobDstnt)
                .subscribe(function (success) {
                if (success) {
                    _this.UploadMsg = "File upload Success!";
                    _this.data.DisableUploadButton = 0;
                }
            }, function (err) { return _this.data.DisableUploadButton = 0; });
        }
    };
    messageMainPage.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    messageMainPage.prototype.setOpenMsgNum = function (newCon) {
        this.convSelNum = newCon.id;
    };
    messageMainPage.prototype.MessageUser = function (newMember) {
        var _this = this;
        // format: email, senderEmail
        this.data.loadMessage(newMember.email, this.currentUser.email)
            .subscribe(function (success) {
            if (success) {
                _this.data.UpdateMsgtoRead();
            }
        });
        this.data.OpenSienavInvites = 0;
        this.data.MessCtrl = 1;
        this.data.OpenGroupChat = 0;
        this.data.toMessage = newMember;
    };
    messageMainPage.prototype.Block = function (newMsg) {
        var _this = this;
        var _loop_1 = function (value) {
            if (value.uniqueCheck == newMsg.uniqueCheck) {
                this_1.data.BlockUser(newMsg)
                    .subscribe(function (success) {
                    if (success) {
                        value.blocked = _this.currentUser.id;
                        _this.conversations.splice(_this.conversations.indexOf(newMsg), 1);
                        _this.conversations.push(newMsg);
                    }
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.conversations; _i < _a.length; _i++) {
            var value = _a[_i];
            _loop_1(value);
        }
    };
    messageMainPage.prototype.Unblock = function (newMsg) {
        var _this = this;
        var _loop_2 = function (value) {
            if (value.uniqueCheck == newMsg.uniqueCheck) {
                this_2.data.UnBlockUser(newMsg)
                    .subscribe(function (success) {
                    if (success) {
                        value.blocked = 0;
                        _this.conversations.splice(_this.conversations.indexOf(newMsg), 1);
                        _this.conversations.push(newMsg);
                    }
                });
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = this.conversations; _i < _a.length; _i++) {
            var value = _a[_i];
            _loop_2(value);
        }
    };
    messageMainPage.prototype.DeleteMsg = function (newMsg) {
        var _this = this;
        this.data.DeleteConversation(newMsg.uniqueCheck)
            .subscribe(function (success) {
            if (success) {
                //for (let value of this.data.conversationsList) {
                //    if (value.uniqueCheck = newMsg.uniqueCheck) {
                //        this.data.RemoveMailingList(value.messageRef)
                //            .subscribe(success => {
                //                if (success) {
                //                }
                //            });
                //    }
                //}
                for (var _i = 0, _a = _this.conversations; _i < _a.length; _i++) {
                    var value = _a[_i];
                    if (value.uniqueCheck == newMsg.uniqueCheck) {
                        _this.OpenConversation = 0;
                        _this.conversations.splice(_this.conversations.indexOf(value), 1);
                    }
                }
            }
        });
    };
    messageMainPage = __decorate([
        Component({
            selector: "messageMain-service",
            templateUrl: "messageMain.component.html",
            styleUrls: ["messageMain.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], messageMainPage);
    return messageMainPage;
}());
export { messageMainPage };
//# sourceMappingURL=messageMain.component.js.map