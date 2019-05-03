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
import { Member, CircleUser, Circle, Susasss } from "../shared/member";
import { Router } from "@angular/router";
import { Invite, CircleDMInvite } from "../shared/invite";
import { CircleDM, CircleDMHopOns } from "../shared/Circle";
import { ExplorePost } from "../shared/Explore";
var userUI = /** @class */ (function () {
    function userUI(data, router) {
        this.data = data;
        this.router = router;
        //ControllMsg
        this.ControllMsg = "";
        this.personalMsg = "";
        this.ctrlPerMsg = 0;
        this.InvitesMsg = "";
        this.RequestsMsg = "";
        this.testMsg = "";
        this.CircleMsg = "";
        this.orangeBoxNumber = 0;
        this.ornageBoxLoadLimit = 0;
        this.loadLimitCircle = 5;
        this.circlesLoadLimitCntr = 0;
        this.loadLimitInvites = 5;
        this.invitesLoadLimitCntr = 0;
        this.loadLimitRequest = 5;
        this.requestsLoadLimitCntr = 0;
        this.loadLimitCircleInv = 5;
        this.circlesInvLoadLimitCntr = 0;
        this.loadLimitCircleDM = 5;
        this.circlesDMLoadLimitCntr = 0;
        this.buildProfileBolDeclare = 0;
        this.SwitchNotF = 1;
        this.CollapseUI = 1;
        this.susasssrsp = new Susasss();
        this.invitesList = [];
        this.requestsList = [];
        this.CircleinvitesList = [];
        this.invitesFromMbrs = [];
        this.requestsToMbrs = [];
        this.circlesToMbrs = [];
        this.myCircleMemberFr = [];
        this.myCircleInvPer = [];
        this.notificationsEx = [];
        this.notificationsCls = [];
        //public members: Member[] = [];
        this.currentUser = new Member();
        //New notification counters
        this.notificationsExNew = 0;
        this.notificationsClsNew = 0;
        this.NotfShow = 1;
        this.notificationLoadLimit = 50;
    }
    //list of add buttons that should be showed
    userUI.prototype.ngOnInit = function () {
    };
    userUI.prototype.Listen = function () {
        if (this.data.susasssrsp != null) {
            this.susasssrsp = this.data.susasssrsp;
        }
        this.buildProfileBolDeclare = this.data.buildProfileBolDeclare;
        if (this.data.currentUser != null) {
            this.CircleinvitesList = this.data.CircleinvitesList;
            this.currentUser = this.data.currentUser;
            this.invitesList = this.data.invitesList;
            this.InvitesMsg = (this.data.invitesList.length).toString();
            this.requestsList = this.data.requestsList;
            this.circlesToMbrs = this.data.circlesToMbrs;
            this.testMsg = this.data.targetAddButtonView.toString();
            this.notificationsEx = this.data.notificationsEx;
            this.notificationsCls = this.data.notificationsCls;
            this.SwitchNotF = this.data.SwitchNotF;
            this.notificationsClsNew = this.data.notificationsClsNew;
            this.notificationsExNew = this.data.notificationsExNew;
            this.MsgNewCount = this.data.MsgNewCount;
            return true;
        }
        else {
            return true;
        }
    };
    userUI.prototype.CollapseFunction = function () {
        if (this.CollapseUI == 1) {
            this.CollapseUI = 0;
        }
        else {
            this.CollapseUI = 1;
        }
    };
    userUI.prototype.CheckLogin = function () {
        if (this.data.susasssrsp.email != null) {
            return true;
        }
        else {
            return false;
        }
    };
    userUI.prototype.ProfilePage = function (newMember) {
        if (this.data.toProfilePage) {
            this.data.toProfilePage = new Member();
        }
        this.data.toProfilePage = newMember;
        if (this.data.toProfilePage) {
            this.data.NavBackFromProfile = "circle";
            this.router.navigate(["profile"]);
        }
    };
    userUI.prototype.LoadMoreCircles = function () {
        this.ornageBoxLoadLimit += 10;
    };
    userUI.prototype.LoadMoreInvites = function () {
        this.ornageBoxLoadLimit += 5;
    };
    userUI.prototype.LoadMoreRequests = function () {
        this.ornageBoxLoadLimit += 5;
    };
    //____________________________________________IMPORT USER CTRL PACKAGE Adjusted_________________________________________________
    //------------------------------------------------------------------------------------------------ReviewSection = allows dynamic loading;
    // in this section find the member cards by the ids found in invitesList/RequestsList
    //integrate a toggle button with a check whether to load invites list or not
    userUI.prototype.selectRequestingMbrById = function () {
        var _this = this;
        if (this.orangeBoxNumber == 1) {
            this.orangeBoxNumber = 0;
        }
        else {
            //for each literation over the list from .data from the api Member() is pushed into the invitesFromMbrs list
            this.invitesFromMbrs = [];
            this.orangeBoxNumber = 1;
            this.ornageBoxLoadLimit = 5;
            for (var _i = 0, _a = this.invitesList; _i < _a.length; _i++) {
                var value = _a[_i];
                this.data.selectRequestingMbr(value.requestingMbr)
                    .subscribe(function (success) {
                    if (success) {
                        //NB this.invitesFromMbrs = [] and this.data.invitesFromMbrs = new Member()
                        _this.invitesFromMbrs.push(_this.data.invitesFromMbrs);
                        if (_this.invitesFromMbrs.length == _this.invitesList.length) {
                            _this.invitesLoadLimitCntr = _this.invitesFromMbrs.length;
                        }
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get my invites"; });
            }
        }
    };
    //integrate a toggle button with a check whether to load my requests list or not
    userUI.prototype.selectInvitedMbrsById = function () {
        var _this = this;
        if (this.orangeBoxNumber == 2) {
            this.orangeBoxNumber = 0;
        }
        else {
            this.orangeBoxNumber = 2;
            this.requestsToMbrs = [];
            this.ornageBoxLoadLimit = 5;
            for (var _i = 0, _a = this.requestsList; _i < _a.length; _i++) {
                var value = _a[_i];
                this.data.selectInvitedMbr(value.invitedMbr)
                    .subscribe(function (success) {
                    if (success) {
                        //NB this.requestsToMbrs = [] and this.data.requestsToMbrs = new Member()
                        _this.requestsToMbrs.push(_this.data.requestsToMbrs);
                        if (_this.requestsToMbrs.length == _this.requestsList.length) {
                            _this.requestsLoadLimitCntr = _this.requestsToMbrs.length;
                        }
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get my requests"; });
            }
        }
    };
    userUI.prototype.OperatinOnCircles = function (sendValue) {
        var _this = this;
        this.data.selectCircleFriends(sendValue)
            .subscribe(function (success) {
            if (success) {
                //NB this.myCircleMemberFr = [] and this.data.myCircleMemberFr = new Member()
                // function verifyies that there are no missing members and allows loading tracking
                _this.myCircleMemberFr.push(_this.data.myCircleMemberFr);
                if (_this.myCircleMemberFr.length == _this.circlesToMbrs.length) {
                    _this.circlesLoadLimitCntr = _this.myCircleMemberFr.length;
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to get my invites"; });
    };
    userUI.prototype.OnCircles = function () {
        if (this.orangeBoxNumber == 3) {
            this.orangeBoxNumber = 0;
        }
        else {
            this.orangeBoxNumber = 3;
            this.ornageBoxLoadLimit = 5;
            this.myCircleMemberFr = [];
            for (var _i = 0, _a = this.circlesToMbrs; _i < _a.length; _i++) {
                var value = _a[_i];
                if (value.circleFriend == this.currentUser.id && value.circleUser != this.currentUser.id) {
                    this.OperatinOnCircles(value.circleUser);
                }
                else if (value.circleUser == this.currentUser.id && value.circleFriend != this.currentUser.id) {
                    this.OperatinOnCircles(value.circleFriend);
                }
                ;
            }
        }
    };
    userUI.prototype.OpenCircleInvites = function () {
        if (this.orangeBoxNumber == 4) {
            this.orangeBoxNumber = 0;
        }
        else {
            this.orangeBoxNumber = 4;
            this.ornageBoxLoadLimit = 5;
            this.myCircleInvPer = [];
        }
    };
    //------------------------------------------------------------------------------------------------ReviewSection = allows dynamic loading;
    userUI.prototype.AcceptInvite = function (invitesFromMbrs) {
        var _this = this;
        //declare local variables
        var id = 0;
        var remove = new Invite();
        remove.invitedMbr = this.currentUser.id;
        remove.requestingMbr = invitesFromMbrs.id;
        // stage1 add to Circle
        this.data.getAcceptedMember(invitesFromMbrs);
        this.data.SendInviteToCircle()
            .subscribe(function (success) {
            if (success) {
                _this.data.targetAddButtonView.push(invitesFromMbrs.id);
                _this.RemoveInvite(invitesFromMbrs);
                _this.InvitesMsg = "You are now friends with " + invitesFromMbrs.givenname + " !";
                _this.data.loadcircles(_this.data.currentUser.id)
                    .subscribe(function (success) {
                    if (success) {
                        _this.circlesToMbrs = _this.data.circlesToMbrs;
                    }
                });
            }
        }, function (err) { return _this.ControllMsg = "Failed to accept request, please try again"; });
        //stage 3 all remove code has to declare a new CircleUser because the element is shared with other components
        this.data.circleUser = new CircleUser();
    };
    userUI.prototype.RemoveInvite = function (invitesFromMbrs) {
        var _this = this;
        var remove = new Invite();
        //hard code delete target using UniqueCheck formula
        remove.requestingMbr = this.currentUser.id;
        remove.invitedMbr = invitesFromMbrs.id;
        remove.uniqueCheck = invitesFromMbrs.id + this.currentUser.id;
        this.data.targetAddButtonView.splice(this.data.targetAddButtonView.indexOf(invitesFromMbrs.id), 1);
        this.data.RemoveInviteFromInvts(remove.uniqueCheck)
            .subscribe(function (success) {
            if (success) {
                _this.invitesList.splice(_this.invitesList.indexOf(remove), 1);
                _this.invitesFromMbrs.splice(_this.invitesFromMbrs.indexOf(invitesFromMbrs), 1);
                _this.InvitesMsg = invitesFromMbrs.givenname + "'s request has been removed !";
            }
        }, function (err) { return _this.ControllMsg = "Failed to remove invite, please try again"; });
        this.data.circleUser = new CircleUser();
    };
    userUI.prototype.RemoveRequest = function (invitesFromMbrs) {
        var _this = this;
        var remove = new Invite();
        //hard code delete target using UniqueCheck formula
        remove.requestingMbr = this.currentUser.id;
        remove.invitedMbr = invitesFromMbrs.id;
        remove.uniqueCheck = this.currentUser.id + invitesFromMbrs.id;
        this.data.targetAddButtonView.splice(this.data.targetAddButtonView.indexOf(invitesFromMbrs.id), 1);
        this.data.RemoveInviteFromInvts(remove.uniqueCheck)
            .subscribe(function (success) {
            if (success) {
                _this.requestsToMbrs.splice(_this.requestsToMbrs.indexOf(invitesFromMbrs), 1);
                _this.requestsList.splice(_this.requestsList.indexOf(remove), 1);
                _this.RequestsMsg = "Request to " + invitesFromMbrs.givenname + " " + invitesFromMbrs.familyname + " has been withdrawn";
            }
        }, function (err) { return _this.ControllMsg = "Failed to remove invite, please try again"; });
        this.data.circleUser = new CircleUser();
    };
    userUI.prototype.MyProfile = function () {
        if (this.data.toProfilePage) {
            this.data.toProfilePage = new Member();
        }
        //we are moving the project.member to the profilePage view
        this.data.toProfilePage = this.data.currentUser;
        if (this.data.toProfilePage) {
            this.data.toggle();
            this.router.navigate(["myprofile"]);
        }
    };
    userUI.prototype.Unfriend = function (newMember) {
        var _this = this;
        var remove = new Circle();
        //hard code delete target using UniqueCheck formula
        remove.circleUser = this.currentUser.id;
        remove.circleFriend = newMember.id;
        remove.uniqueCheck = this.currentUser.id + (newMember.id * 2) + newMember.id + (this.currentUser.id * 2);
        this.data.targetAddButtonView.splice(this.data.targetAddButtonView.indexOf(newMember.id), 1);
        this.data.unfriendCircleAction(remove.uniqueCheck)
            .subscribe(function (success) {
            if (success) {
                _this.myCircleMemberFr.splice(_this.myCircleMemberFr.indexOf(newMember), 1);
                _this.circlesToMbrs.splice(_this.circlesToMbrs.indexOf(remove), 1);
                _this.CircleMsg = "Request to " + newMember.givenname + " " + newMember.familyname + " has been withdrawn";
            }
        }, function (err) { return _this.ControllMsg = "Failed to unfriend, please try again"; });
        this.data.circleUser = new CircleUser();
    };
    userUI.prototype.BuildProfile = function () {
        this.data.toggle();
        this.data.buildUserData.email = this.data.susasssrsp.email;
        this.data.buildUserData.givenname = this.data.susasssrsp.firstName;
        this.data.buildUserData.familyname = this.data.susasssrsp.lastName;
        this.router.navigate(["myprofile"]);
    };
    userUI.prototype.MessageUser = function (newMember) {
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
    //Referene for circle invites 
    userUI.prototype.AcceptInviteCircle = function (newCircleInvite) {
        var _this = this;
        //declare local variables
        var id = 0;
        var remove = new CircleDMInvite();
        remove.invitedMbr = this.currentUser.id;
        remove.requestingMbr = newCircleInvite.requestingMbr;
        // stage1 add to Circle
        this.data.getAcceptedCircleInv(newCircleInvite);
        this.data.SendInviteToCircleDM()
            .subscribe(function (success) {
            if (success) {
                _this.RemoveInviteCircle(newCircleInvite);
                _this.InvitesMsg = "You are following " + newCircleInvite.circlePost.title + " !";
                _this.data.loadCircleDMbyIdUserDelFoll(newCircleInvite.postId).subscribe(function (success) {
                    if (success) {
                        _this.data.myListCircleInvited.unshift(_this.data.functionReturnloadCircleUserDel);
                    }
                });
            }
        }, function (err) { return _this.ControllMsg = "Failed to accept request, please try again"; });
        //stage 3 all remove code has to declare a new CircleUser because the element is shared with other components
        this.data.myCircleHopOn = new CircleDMHopOns();
    };
    userUI.prototype.RemoveInviteCircle = function (newInvite) {
        var _this = this;
        var remove = new CircleDMInvite();
        //hard code delete target using UniqueCheck formula
        remove.postId = newInvite.postId;
        remove.invitedMbr = newInvite.invitedMbr;
        remove.uniqueCheck = newInvite.postId + newInvite.invitedMbr;
        this.data.targetAddButtonView.splice(this.data.targetAddButtonView.indexOf(newInvite.id), 1);
        this.data.RemoveInviteFromCircleInvReq(remove.uniqueCheck)
            .subscribe(function (success) {
            if (success) {
                _this.CircleinvitesList.splice(_this.CircleinvitesList.indexOf(remove), 1);
                _this.InvitesMsg = newInvite.circlePost.title + "has been removed!";
            }
        }, function (err) { return _this.ControllMsg = "Failed to remove invite, please try again"; });
        this.data.myCircleHopOn = new CircleDMHopOns();
    };
    userUI.prototype.HideNotificationWind = function () {
        if (this.NotfShow == 1) {
            this.NotfShow = 0;
        }
        else {
            this.NotfShow = 1;
        }
    };
    userUI.prototype.LoadMoreNotifications = function () {
        this.notificationLoadLimit += 50;
    };
    userUI.prototype.SwitchChanelNotf = function () {
        if (this.data.SwitchNotF == 1) {
            this.data.SwitchNotF = 2;
        }
        else {
            this.data.SwitchNotF = 1;
        }
    };
    userUI.prototype.ToCirclePostNotF = function (NewNotF) {
        //Using the search result reirect model
        var _this = this;
        if (NewNotF.uniqueCheck > 0) {
            this.ToCirclePostNotFUnactive(NewNotF);
        }
        if (NewNotF.uniqueCheck == 0) {
            if (this.data.toCirclePage) {
                this.data.toCirclePage = new CircleDM();
            }
            if (this.data.exposts) {
                this.data.myListCircle = [];
            }
            var insertIndex = 0;
            insertIndex = this.notificationsCls.indexOf(NewNotF);
            NewNotF.uniqueCheck = 1;
            this.data.UpdateReadNotfCircle(NewNotF).subscribe(function (success) {
                if (success) {
                    _this.notificationsCls.splice(insertIndex, 1);
                    _this.notificationsCls.splice(insertIndex, 0, _this.data.returnNotF);
                    _this.data.OpenFromNotF = 1;
                    _this.data.getCirclePostForNotF(NewNotF.postId)
                        .subscribe(function (success) {
                        if (success) {
                            _this.data.notificationsClsNew--;
                            _this.data.myListCircle.push(_this.data.toCirclePage);
                            if (_this.data.toExplorePage) {
                                _this.data.NavRedirect = 10;
                                if (_this.data.NavRedirect == 10) {
                                    _this.data.NavBackFromProfile = "circlesC";
                                    _this.router.navigate(["startPage"]);
                                }
                            }
                        }
                    }, function (err) { return _this.ControllMsg = "Failed to get notification"; });
                }
            }, function (err) { return _this.ControllMsg = "Failed to update notification"; });
        }
    };
    userUI.prototype.ToCirclePostNotFUnactive = function (NewNotF) {
        var _this = this;
        //Using the search result reirect model
        if (this.data.toCirclePage) {
            this.data.toCirclePage = new CircleDM();
        }
        if (this.data.myListCircle) {
            this.data.myListCircle = [];
        }
        this.data.OpenFromNotF = 1;
        this.data.getCirclePostForNotF(NewNotF.postId)
            .subscribe(function (success) {
            if (success) {
                _this.data.myListCircle.push(_this.data.toCirclePage);
                if (_this.data.toExplorePage) {
                    _this.data.NavRedirect = 10;
                    if (_this.data.NavRedirect == 10) {
                        _this.data.NavBackFromProfile = "circlesC";
                        _this.router.navigate(["startPage"]);
                    }
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to get notification"; });
    };
    userUI.prototype.ToExplorePostNotF = function (NewNotF) {
        var _this = this;
        //Using the search result reirect model
        if (NewNotF.uniqueCheck > 0) {
            this.ToExplorePostNotFUnActive(NewNotF);
        }
        if (NewNotF.uniqueCheck == 0) {
            if (this.data.toExplorePage) {
                this.data.toExplorePage = new ExplorePost();
            }
            if (this.data.exposts) {
                this.data.exposts = [];
            }
            var insertIndex = 0;
            insertIndex = this.notificationsEx.indexOf(NewNotF);
            NewNotF.uniqueCheck = 1;
            this.data.UpdateReadNotfExplore(NewNotF)
                .subscribe(function (success) {
                if (success) {
                    _this.notificationsEx.splice(insertIndex, 1);
                    _this.notificationsEx.splice(insertIndex, 0, _this.data.returnNotF);
                    _this.data.OpenFromNotF = 1;
                    _this.data.loadExPostForSearchDetails(NewNotF.postId)
                        .subscribe(function (success) {
                        if (success) {
                            _this.data.exposts.push(_this.data.toExplorePage);
                            _this.data.notificationsExNew--;
                            if (_this.data.toExplorePage) {
                                _this.data.NavRedirect = 4;
                                if (_this.data.NavRedirect == 4) {
                                    _this.data.NavBackFromProfile = "circlesC";
                                    _this.router.navigate(["startPage"]);
                                }
                            }
                        }
                    }, function (err) { return _this.ControllMsg = "Failed to get notification"; });
                }
            }, function (err) { return _this.ControllMsg = "Failed to update notification"; });
        }
    };
    userUI.prototype.ToExplorePostNotFUnActive = function (NewNotF) {
        var _this = this;
        //Using the search result reirect model
        if (this.data.toExplorePage) {
            this.data.toExplorePage = new ExplorePost();
        }
        if (this.data.exposts) {
            this.data.exposts = [];
        }
        this.data.OpenFromNotF = 1;
        this.data.loadExPostForSearchDetails(NewNotF.postId)
            .subscribe(function (success) {
            if (success) {
                _this.data.exposts.push(_this.data.toExplorePage);
                if (_this.data.toExplorePage) {
                    _this.data.NavRedirect = 4;
                    if (_this.data.NavRedirect == 4) {
                        _this.data.NavBackFromProfile = "circlesC";
                        _this.router.navigate(["startPage"]);
                    }
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to get notification"; });
    };
    userUI.prototype.DelNotFEx = function (NewNotF) {
        var _this = this;
        this.data.DeleteNotfExplore(NewNotF.id)
            .subscribe(function (success) {
            _this.notificationsEx.splice(_this.notificationsEx.indexOf(NewNotF), 1);
        }, function (err) { return _this.ControllMsg = "Failed to delete notification"; });
    };
    userUI.prototype.DelNotFCls = function (NewNotF) {
        var _this = this;
        this.data.deleteNotfCircle(NewNotF.id)
            .subscribe(function (success) {
            _this.notificationsCls.splice(_this.notificationsCls.indexOf(NewNotF), 1);
        }, function (err) { return _this.ControllMsg = "Failed to delete notification"; });
    };
    userUI.prototype.GotoInvite = function (circleInvites) {
        var _this = this;
        if (this.data.toCirclePage) {
            this.data.toCirclePage = new CircleDM();
        }
        if (this.data.myListCircle) {
            this.data.myListCircle = [];
        }
        this.data.TransferInvite = circleInvites;
        this.data.OpenFromNotF = 1;
        this.data.OpenInviteAccept = 1;
        this.data.getCirclePostForNotF(circleInvites.postId)
            .subscribe(function (success) {
            if (success) {
                _this.data.myListCircle.push(_this.data.toCirclePage);
                if (_this.data.toExplorePage) {
                    _this.data.NavRedirect = 10;
                    if (_this.data.NavRedirect == 10) {
                        _this.data.NavBackFromProfile = "circlesC";
                        _this.router.navigate(["startPage"]);
                    }
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to get notification"; });
    };
    userUI = __decorate([
        Component({
            selector: "userUI",
            templateUrl: "userInterface.component.html",
            styleUrls: ["userInterface.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], userUI);
    return userUI;
}());
export { userUI };
//# sourceMappingURL=userInterface.component.js.map