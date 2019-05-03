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
import { Member } from "../shared/member";
import { Router } from "@angular/router";
import { Invite } from "../shared/invite";
//IN CONTRAST TO EXPLOREPOSTLIST JOINT DATABASE QUERIES THIS PAGE LOADS JUST NUMBER TABLES TO REPRESENT INFORMATION ABOUT
//USER FRIENDS AND CIRCLE COUNTS => THEN LOADS THE CORESPONDING USER CARDS TO THE NUMBERS IN THE TABLES UPON CLICKS, KEEPING DATABASE STRESS TO THE MINIMUM 
var MembersList = /** @class */ (function () {
    function MembersList(data, router) {
        this.data = data;
        this.router = router;
        //ControllMsg
        this.personalMsg = "";
        this.ctrlPerMsg = 0;
        //LoadLimiters && DynamicLoading options 
        this.loadLimitPage = 20;
        this.members = [];
        this.currentUser = new Member();
    }
    //Member Cards view control
    MembersList.prototype.ngOnInit = function () {
        var _this = this;
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.currentUser = this.data.currentUser;
        this.data.toggle();
        this.data.loadMembers()
            .subscribe(function (success) {
            if (success) {
                _this.members = _this.data.members;
                _this.data.toggle();
                //--call algoritm to mark redundant add buttons                   
                //--
            }
        }, function (err) { return _this.data.toggle(); });
    };
    MembersList.prototype.CheckLogin = function () {
        if (this.data.susasssrsp.email != null) {
            return true;
        }
        else {
            return false;
        }
    };
    //send friend request
    MembersList.prototype.SelectId = function (member) {
        var _this = this;
        this.data.getMemberId(member);
        this.data.SendRequest()
            .subscribe(function (success) {
            if (success) {
                var req = new Invite();
                req.invitedMbr = member.id;
                req.requestingMbr = _this.currentUser.id;
                _this.ctrlPerMsg = member.id;
                _this.personalMsg = "a friend request was sent to  " + member.givenname + " " + member.familyname;
                _this.data.targetAddButtonView.push(member.id);
                _this.data.requestsList.push(req);
            }
        }, function (err) { return _this.personalMsg = "Failed to send friend request, please try again"; });
    };
    MembersList.prototype.CheckActiveAddButton = function (newMember) {
        //CHECK VARIABLES
        //remove redundant add buttons algorithm
        if (this.data.targetAddButtonView.includes(newMember.id)) {
            return true;
        }
        else {
            return false;
        }
    };
    MembersList.prototype.ProfilePage = function (newMember) {
        if (this.data.toProfilePage) {
            this.data.toProfilePage = new Member();
        }
        this.data.toProfilePage = newMember;
        if (this.data.toProfilePage) {
            this.data.NavBackFromProfile = "circle";
            this.router.navigate(["profile"]);
        }
    };
    MembersList.prototype.ProjectPageFromMembers = function (newMember) {
        var _this = this;
        this.data.projectsFromMembersListAvatar = newMember;
        this.data.loadProjectsFromMemberPage(newMember)
            .subscribe(function (success) {
            if (success) {
                if (_this.data.projectsFromMembersList) {
                    _this.router.navigate(["projectsmbr"]);
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to get my projects"; });
    };
    MembersList.prototype.LoadMoreMembers = function () {
        this.loadLimitPage += 20;
    };
    MembersList.prototype.MessageUser = function (newMember) {
        // format: email, senderEmail
        var _this = this;
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
        this.data.OpenSienavInvites = 0;
        this.data.MessCtrl = 1;
        this.data.OpenGroupChat = 0;
        this.data.OpenGroupChat = 0;
        this.data.toMessage = newMember;
    };
    MembersList = __decorate([
        Component({
            selector: "members-list",
            templateUrl: "memberList.component.html",
            styleUrls: ["memberList.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], MembersList);
    return MembersList;
}());
export { MembersList };
//# sourceMappingURL=memberList.component.js.map