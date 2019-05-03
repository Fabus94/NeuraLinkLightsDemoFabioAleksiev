var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule } from "@angular/core";
import { DataService } from "../shared/dataService";
import { Router } from "@angular/router";
import { ExplorePost, ExploreComment, ExploreHashTag, RegisterComment, ExploreReply, ExploreHopOns, ExploreLike, HighlightPipe } from "../shared/Explore";
import { Member } from "../shared/member";
import { DomSanitizer } from "@angular/platform-browser";
import { CircleDM_MailingList, UserEmail } from "../shared/Email";
import { CircleDM, CircleDMHopOns } from "../shared/Circle";
import { debounceTime } from 'rxjs/operators';
import { FormControl } from "@angular/forms";
import { InviteCircle, CircleDMInvite } from "../shared/invite";
import { Notifications } from "../shared/Notification";
import { CountdownService } from "../shared/Timer";
//Html Module is build to access comments from explore so the replies are not opened properly because the HTML lacks structure NEEDS OPTIMIZATION .TS and .HTML
var CircleSingle = /** @class */ (function () {
    function CircleSingle(countdownService, data, router, sanitizer) {
        this.countdownService = countdownService;
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.showexpost = 0;
        this.lrReplySwitch = 0;
        this.PrControllMsg = "";
        this.uploadButtonCancel = 0;
        //ControllMsg
        this.ControllMsg = "";
        this.MathMss = "";
        this.MessageOn = [];
        this.ReplyOn = [];
        // Global variables
        this.checkPostCom = [];
        this.checkPostReply = 0;
        this.loadLimit = 5;
        this.loadLimitPage = 20;
        this.MessageloadLimit = 5;
        //EqualizeReplyView: ExploreReply[] = [];
        this.EqualizeCommentView = [];
        this.TrackPostSt = 0;
        this.myListCircle = [];
        this.myListCircleInvited = [];
        this.currentUser = new Member();
        this.postahashtag = new ExploreHashTag();
        this.selectedFiles = null;
        //for Comments
        this.ComButCtrl = 0;
        this.exPostComId = new ExploreComment();
        this.comments = [];
        this.postComment = new ExploreComment();
        this.registerComment = new RegisterComment();
        this.TargetBox = [];
        //for Replies
        this.replyButCtrl = 0;
        this.TargetComment = [];
        this.replies = [];
        this.postReply = new ExploreReply();
        this.exPostReplyId = new ExploreReply();
        //for HopOns
        this.expostHopOns = [];
        this.myFollowingPosts = [];
        this.userFollowingPosts = [];
        this.sendHopOn = new ExploreHopOns();
        this.checkFollowersCtrlBut = [];
        //for Likes
        this.myLiked = [];
        this.userLiked = [];
        this.likes = [];
        this.sendLike = new ExploreLike();
        this.checkLikesCtrlBut = [];
        this.mycirclescol = 1;
        this.circleDMHopOns = [];
        this.exposts = [];
        this.circleForPost = new CircleDM();
        this.toCirclePage = new CircleDM();
        this.InvitedMembersListC = [];
        this.InvitedEmailList = [];
        //Import Search
        this.searchresultMember = [];
        this.myControl = new FormControl();
        this.NavSearchTerm = "";
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
        this.showPost = 0;
        this.OpenInviteAccept = 0;
        this.CircleLoadMsgVal = new CircleDM();
        //POPULAR SERVICES CTRL
        this.DelCtrl = 0;
        this.userOnBoardPosts = [];
        this.checkOnBoardCtrlBut = [];
        //___________MessagesImport____________
        this.mailS = new CircleDM_MailingList();
        this.toMessage = new Member();
        this.circlemessages = [];
        //Update menu
        this.ExploreUpdateButCtrl = 0;
        this.ExpostToRemove = new CircleDM;
        this.updateExplore = new CircleDM();
        this.showaccept = 0;
    }
    CircleSingle.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    CircleSingle.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    CircleSingle.prototype.OpenFull = function (newExplorePost) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newExplorePost.document;
        if (this.data.DocumentFull) {
            this.data.NavBackFromProfile = "circlesC";
            this.router.navigate(["docfull"]);
        }
    };
    CircleSingle.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    CircleSingle.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    CircleSingle.prototype.ReturnParameterPdf = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    CircleSingle.prototype.ReturnParameterImgW = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    CircleSingle.prototype.ReturnParameterImgH = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    CircleSingle.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    CircleSingle.prototype.AddPostClickCom = function (newPost) {
        if (newPost.id != this.PostClickedCom) {
            this.PostClicked = 0;
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClickedCom = newPost.id;
        }
    };
    CircleSingle.prototype.ReturnParameterImgWCom = function (newPost) {
        if (this.PostClickedCom == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    CircleSingle.prototype.ReturnParameterImgHCom = function (newPost) {
        if (this.PostClickedCom == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    CircleSingle.prototype.ReturnParameterPdfCom = function (newPost) {
        if (this.PostClickedCom == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    CircleSingle.prototype.AddPostClickRep = function (newPost) {
        if (newPost.id != this.PostClickedRep) {
            this.PostClicked = 0;
            this.PostClickedCom = 0;
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClickedRep = newPost.id;
        }
    };
    CircleSingle.prototype.ReturnParameterImgWRep = function (newPost) {
        if (this.PostClickedRep == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    CircleSingle.prototype.ReturnParameterImgHRep = function (newPost) {
        if (this.PostClickedRep == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    CircleSingle.prototype.ReturnParameterPdfRep = function (newPost) {
        if (this.PostClickedRep == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    //MODAL------------------------------------------------------
    //Check whether post is a pdf or other image file
    CircleSingle.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    //Graphical controllers_________________________________________________________________
    //NB Work client-side save server energy and company resources
    CircleSingle.prototype.SelectMyCircleCol = function () {
        this.mycirclescol = 1;
    };
    CircleSingle.prototype.SelectMyInvitedCol = function () {
        this.mycirclescol = 0;
    };
    CircleSingle.prototype.ngOnInit = function () {
        var _this = this;
        this.data.toggle();
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.myListCircle = this.data.myListCircle;
        for (var _i = 0, _a = this.myListCircle; _i < _a.length; _i++) {
            var value = _a[_i];
            this.MsgButton(value);
        }
        this.showPost = 1;
        this.OpenInviteAccept = this.data.OpenInviteAccept;
        this.data.OpenInviteAccept = 0;
        if (this.data.susasssrsp) {
            this.data.GetCurrentUser().subscribe(function (success) {
                if (success) {
                    _this.currentUser = _this.data.currentUser;
                    _this.data.GetExMyLikedDM(_this.currentUser.id)
                        .subscribe(function (success) {
                        if (success) {
                            for (var _i = 0, _a = _this.data.myLiked; _i < _a.length; _i++) {
                                var value = _a[_i];
                                _this.myLiked.push(value.postId);
                            }
                        }
                    }, function (err) { return _this.ControllMsg = "Failed to get my liked"; });
                    _this.data.GetFollowingCircleDMs(_this.currentUser.id)
                        .subscribe(function (success) {
                        if (success) {
                            for (var _i = 0, _a = _this.data.myCircleDMFollowing; _i < _a.length; _i++) {
                                var value = _a[_i];
                                _this.data.loadCircleDMbyId(value.circlePostId).subscribe(function (success) {
                                    if (success) {
                                        _this.myListCircleInvited = _this.data.myListCircleInvited;
                                        _this.showexpost = 1;
                                        _this.data.toggle();
                                    }
                                });
                            }
                        }
                    }, function (err) { return _this.ControllMsg = "Failed to get my hopons"; });
                }
            });
        }
        this.checkPostCom = [];
        this.data.myListCircle = [];
        this.data.toExplorePage = new ExplorePost();
        //Add Search User Ctrl
        this.myControl.valueChanges
            .pipe(debounceTime(400))
            .subscribe(function (myControl) { return _this.data.SearchMember(myControl)
            .subscribe(function (success) {
            if (success) {
                _this.searchresultMember = _this.data.searchresultMember;
            }
        }, function (err) { return _this.ControllMsg = "Failed to gety search"; }); });
        this.myControl.valueChanges
            .pipe(debounceTime(400))
            .subscribe(function (myControl) { return _this.ValueClone = myControl; });
        this.countdownService.countdown().subscribe(function (t) {
            if (_this.data.CountTest % 8 == 0) {
                if (_this.CircleLoadMsgVal.id > 0) {
                    _this.data.loadMessageCirclePost(_this.CircleLoadMsgVal)
                        .subscribe(function (success) {
                        if (success) {
                            _this.circlemessages = _this.data.circlemessages;
                        }
                    });
                }
            }
        });
    };
    CircleSingle.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url).toString();
    };
    CircleSingle.prototype.CheckLogin = function () {
        if (this.data.susasssrsp.email != null) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle.prototype.LoadAll = function () {
        var _this = this;
        this.data.loadExplorePosts()
            .subscribe(function (success) {
            if (success) {
                _this.myListCircle = _this.data.myListCircle;
                _this.showexpost = 1;
                _this.data.toggle();
            }
        });
    };
    CircleSingle.prototype.LoadMoremyListCircle = function () {
        this.loadLimitPage += 20;
    };
    CircleSingle.prototype.LoadMoremyMsg = function () {
        this.MessageloadLimit += 5;
    };
    //nav to profile page
    CircleSingle.prototype.ProfilePage = function (newReply) {
        if (newReply.member.id == this.currentUser.id) {
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
            this.data.toProfilePage = newReply.member;
            if (this.data.toProfilePage) {
                this.data.NavBackFromProfile = "exploreposts";
                this.router.navigate(["profile"]);
            }
        }
    };
    CircleSingle.prototype.ProfilePageFCom = function (newComment) {
        if (newComment.member.id == this.currentUser.id) {
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
            this.data.toProfilePage = newComment.member;
            if (this.data.toProfilePage) {
                this.data.NavBackFromProfile = "exploreposts";
                this.router.navigate(["profile"]);
            }
        }
    };
    CircleSingle.prototype.ProfilePageFExPost = function (newExplorePost) {
        if (newExplorePost.member.id == this.currentUser.id) {
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
            this.data.toProfilePage = newExplorePost.member;
            if (this.data.toProfilePage) {
                this.data.NavBackFromProfile = "exploreposts";
                this.router.navigate(["profile"]);
            }
        }
    };
    CircleSingle.prototype.ProfilePageHopOns = function (newHopOn) {
        if (newHopOn.member.id == this.currentUser.id) {
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
            this.data.toProfilePage = newHopOn.member;
            if (this.data.toProfilePage) {
                this.data.NavBackFromProfile = "exploreposts";
                this.router.navigate(["profile"]);
            }
        }
    };
    CircleSingle.prototype.ProfilePageLikes = function (newLike) {
        if (newLike.member.id == this.currentUser.id) {
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
            this.data.toProfilePage = newLike.member;
            if (this.data.toProfilePage) {
                this.data.NavBackFromProfile = "exploreposts";
                this.router.navigate(["profile"]);
            }
        }
    };
    CircleSingle.prototype.CancelDelete = function () {
        this.DelCtrl = 0;
    };
    CircleSingle.prototype.CheckDel = function (newExplore) {
        this.DelCtrl = newExplore.id;
    };
    CircleSingle.prototype.DeleteExplore = function (newExplore) {
        var _this = this;
        this.data.DeleteCircleAction(newExplore.id)
            .subscribe(function (success) {
            if (success) {
                _this.myListCircle.splice(_this.myListCircle.indexOf(newExplore), 1);
                _this.data.myListCircle = _this.myListCircle;
                _this.ControllMsg = "Project Deleted";
                _this.DelCtrl = 0;
            }
        });
    };
    //Arbitrary use of function checking whether a value has changed to perform an action on such an occasion
    //Note these *ngIf functions are always listening and refresh at many times per second
    CircleSingle.prototype.CheckIncludeFollowing = function (newExplorePost) {
        if (this.userFollowingPosts.includes(newExplorePost.id)) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle.prototype.ViewFollowersCtrlBut = function (newExplorePost) {
        if (this.checkFollowersCtrlBut.includes(newExplorePost.id)) {
            this.checkFollowersCtrlBut.splice(this.checkFollowersCtrlBut.indexOf(newExplorePost.id), 1);
        }
        else {
            if (this.checkLikesCtrlBut.includes(newExplorePost.id)) {
                this.checkLikesCtrlBut.splice(this.checkLikesCtrlBut.indexOf(newExplorePost.id), 1);
            }
            if (this.checkOnBoardCtrlBut.includes(newExplorePost.id)) {
                this.checkOnBoardCtrlBut.splice(this.checkOnBoardCtrlBut.indexOf(newExplorePost.id), 1);
            }
            this.checkFollowersCtrlBut.push(newExplorePost.id);
            this.ViewFollowers(newExplorePost);
        }
    };
    CircleSingle.prototype.ViewFollowers = function (newExplorePost) {
        //this.data.GetHopOns(newExplorePost)
        //    .subscribe(success => {
        //        if (success) {
        //            this.expostHopOns = this.data.expostHopOns;
        //        }
        //    }, err => this.ControllMsg = "Failed to get follewers");
    };
    CircleSingle.prototype.CheckIncludeOnBoard = function (newExplorePost) {
        if (this.userOnBoardPosts.includes(newExplorePost.id)) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle.prototype.ViewOnBoardCtrlBut = function (newExplorePost) {
        if (this.checkOnBoardCtrlBut.includes(newExplorePost.id)) {
            this.checkOnBoardCtrlBut.splice(this.checkFollowersCtrlBut.indexOf(newExplorePost.id), 1);
        }
        else {
            if (this.checkLikesCtrlBut.includes(newExplorePost.id)) {
                this.checkLikesCtrlBut.splice(this.checkLikesCtrlBut.indexOf(newExplorePost.id), 1);
            }
            if (this.checkFollowersCtrlBut.includes(newExplorePost.id)) {
                this.checkFollowersCtrlBut.splice(this.checkFollowersCtrlBut.indexOf(newExplorePost.id), 1);
            }
            this.checkOnBoardCtrlBut.push(newExplorePost.id);
            this.ViewOnBoard(newExplorePost);
        }
    };
    CircleSingle.prototype.ViewOnBoard = function (newExplorePost) {
        //this.data.GetHopOns(newExplorePost)
        //    .subscribe(success => {
        //        if (success) {
        //            this.expostHopOns = this.data.expostHopOns;
        //        }
        //    }, err => this.ControllMsg = "Failed to get follewers");
    };
    CircleSingle.prototype.Follow = function (newExplorePost) {
        var _this = this;
        this.sendHopOn.memberId = this.data.currentUser.id;
        this.sendHopOn.explorePostId = newExplorePost.id;
        //check that user cannot Like twice NB summing the two unique id's by multiplying one side gurantees unique result in a two variables scenario
        this.sendHopOn.uniqueCheck = this.currentUser.id + (newExplorePost.id * 2);
        this.data.PostNewHopOn(this.sendHopOn)
            .subscribe(function (success) {
            if (success) {
                _this.myFollowingPosts.push(newExplorePost.id);
                _this.userFollowingPosts.push(newExplorePost.id);
            }
        }, function (err) { return _this.ControllMsg = "Failed to post New Follower"; });
    };
    CircleSingle.prototype.UnFollowReq = function (newExplorePost) {
        var _this = this;
        this.data.UnFollowCircleDM(this.currentUser.id + newExplorePost.id)
            .subscribe(function (success) {
            if (success) {
                _this.myListCircleInvited.splice(_this.myListCircleInvited.indexOf(newExplorePost), 1);
                _this.data.myListCircleInvited = _this.myListCircleInvited;
            }
        }, function (err) { return _this.ControllMsg = "Failed to Unlike Post"; });
    };
    CircleSingle.prototype.ListenUpdate = function () {
        this.myListCircleInvited = this.data.myListCircleInvited;
        return true;
    };
    // operate over a number of lists to remove an entry, update it and return it back in the most efficent way
    //note the API returns a jason list of entries with ICollections attached that are hard to update without removing the entry
    //insted remove the entry and load it again
    CircleSingle.prototype.UnFollowReqCircle = function (newExplorePost) {
        var _this = this;
        this.data.UnFollowCircleDM(newExplorePost.circlePostId + newExplorePost.memberId)
            .subscribe(function (success) {
            if (success) {
                var listIterate = [];
                var indexIndicUserDel = 0;
                listIterate = _this.myListCircle;
                for (var _i = 0, listIterate_1 = listIterate; _i < listIterate_1.length; _i++) {
                    var value = listIterate_1[_i];
                    if (value.id == newExplorePost.circlePostId) {
                        indexIndicUserDel = _this.data.myListCircle.indexOf(value);
                        _this.data.myListCircle.splice(_this.data.myListCircle.indexOf(value), 1);
                    }
                }
                _this.data.loadCircleDMbyIdUserDelFoll(newExplorePost.circlePostId).subscribe(function (success) {
                    if (success) {
                        _this.data.myListCircle.splice(indexIndicUserDel, 0, _this.data.functionReturnloadCircleUserDel);
                        _this.myListCircle = _this.data.myListCircle;
                    }
                });
            }
        }, function (err) { return _this.ControllMsg = "Failed to Unlike Post"; });
    };
    //New Remove Invt
    CircleSingle.prototype.RemoveInvReqC = function (invitesFromMbrs) {
        var _this = this;
        var remove = new CircleDMInvite();
        //hard code delete target using UniqueCheck formula
        remove.invitedMbr = invitesFromMbrs.invitedMbr;
        remove.postId = invitesFromMbrs.postId;
        remove.uniqueCheck = invitesFromMbrs.invitedMbr + invitesFromMbrs.postId;
        var listIterate = [];
        var indexIndicUserDel = 0;
        listIterate = this.myListCircle;
        for (var _i = 0, listIterate_2 = listIterate; _i < listIterate_2.length; _i++) {
            var value = listIterate_2[_i];
            if (value.id == invitesFromMbrs.postId) {
                indexIndicUserDel = this.data.myListCircle.indexOf(value);
                this.data.myListCircle.splice(this.data.myListCircle.indexOf(value), 1);
            }
        }
        this.data.RemoveInviteFromCircleInvReq(remove.uniqueCheck)
            .subscribe(function (success) {
            if (success) {
                _this.data.loadCircleDMbyIdUserDelFoll(invitesFromMbrs.postId).subscribe(function (success) {
                    if (success) {
                        _this.data.myListCircle.splice(indexIndicUserDel, 0, _this.data.functionReturnloadCircleUserDel);
                        _this.myListCircle = _this.data.myListCircle;
                    }
                });
            }
        }, function (err) { return _this.ControllMsg = "Failed to remove invite, please try again"; });
    };
    //--------------------------------------------Remove from lists section
    CircleSingle.prototype.CheckIncludeLike = function (newExplorePost) {
        if (this.userLiked.includes(newExplorePost.id)) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle.prototype.Like = function (newPost) {
        var _this = this;
        this.sendLike.postId = newPost.id;
        this.sendLike.memberId = this.data.currentUser.id;
        //check that user cannot HopOn twice NB summing the two unique id's by multiplying one side gurantees unique result in a two variables scenario
        this.sendLike.uniqueCheck = this.currentUser.id + (newPost.id * 2);
        this.data.PostNewLikeDM(this.sendLike)
            .subscribe(function (success) {
            if (success) {
                _this.myLiked.push(newPost.id);
                _this.userLiked.push(newPost.id);
                _this.data.GetCircleDMHopOns(newPost.id)
                    .subscribe(function (success) {
                    if (success) {
                        _this.circleDMHopOns = _this.data.circleDMHopOns;
                        for (var _i = 0, _a = _this.circleDMHopOns; _i < _a.length; _i++) {
                            var value = _a[_i];
                            var SendNot = new Notifications();
                            SendNot.postId = newPost.id;
                            SendNot.recipientRef = value.memberId;
                            SendNot.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " liked " + newPost.title;
                            SendNot.valueTitle = "New Like on a post you are following";
                            _this.data.SendNotCircle(SendNot)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
                        }
                        if (newPost.issueingId != _this.currentUser.id) {
                            var SendNotPer = new Notifications();
                            SendNotPer.postId = newPost.id;
                            SendNotPer.recipientRef = newPost.issueingId;
                            SendNotPer.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " liked " + newPost.title;
                            SendNotPer.valueTitle = "New Like on your Explore Post";
                            _this.data.SendNotCircle(SendNotPer)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
                        }
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
            }
        }, function (err) { return _this.ControllMsg = "Failed to like Post, error"; });
    };
    CircleSingle.prototype.UnLikeReq = function (newPost) {
        var _this = this;
        this.data.UnlikeDM(this.currentUser.id + newPost.id * 2)
            .subscribe(function (success) {
            if (success) {
                _this.myLiked.splice(_this.myLiked.indexOf(newPost.id), 1);
                if (_this.userLiked.includes(newPost.id)) {
                    _this.userLiked.splice(_this.userLiked.indexOf(newPost.id), 1);
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to Unlike Post"; });
    };
    CircleSingle.prototype.ViewLikesCtrlBut = function (newPost) {
        if (this.checkLikesCtrlBut.includes(newPost.id)) {
            this.checkLikesCtrlBut.splice(this.checkLikesCtrlBut.indexOf(newPost.id), 1);
        }
        else {
            if (this.checkFollowersCtrlBut.includes(newPost.id)) {
                this.checkFollowersCtrlBut.splice(this.checkFollowersCtrlBut.indexOf(newPost.id), 1);
            }
            this.checkLikesCtrlBut.push(newPost.id);
            this.ViewLike(newPost);
        }
    };
    CircleSingle.prototype.ViewLike = function (newPost) {
        var _this = this;
        this.data.GetExLikeCircle(newPost)
            .subscribe(function (success) {
            if (success) {
                _this.likes = _this.data.likes;
            }
        }, function (err) { return _this.ControllMsg = "Failed to get likes, error"; });
    };
    //Functions View Balance Results use *ngIf
    CircleSingle.prototype.RoundUpCom = function (newPost) {
        var Equlibrium = 0;
        for (var _i = 0, _a = this.EqualizeCommentView; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.issueingId == newPost.id) {
                Equlibrium++;
            }
        }
        return Equlibrium;
    };
    CircleSingle.prototype.MessageUser = function (newExplorePost) {
        var _this = this;
        // format: email, senderEmail
        this.openMsgWindow = newExplorePost.id;
        this.data.loadMessage(newExplorePost.member.email, this.currentUser.email)
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
        this.data.toMessage = newExplorePost.member;
    };
    CircleSingle.prototype.OpenFullConversation = function (newExplorePost) {
        var _this = this;
        // format: email, senderEmail
        this.openMsgWindow = newExplorePost.id;
        this.data.loadMessageCirclePostSidenav(newExplorePost)
            .subscribe(function (success) {
            if (success) {
                _this.data.toMessageGroup = newExplorePost;
                _this.data.OpenSienavInvites = 0;
                _this.data.MessCtrl = 0;
                _this.data.OpenGroupChat = 1;
            }
        });
    };
    CircleSingle.prototype.AddSelectedFileNumber = function (id) {
        this.selectedVerifyFile = id;
        if (this.selectedFiles != null) {
            this.selectedFiles = null;
        }
    };
    CircleSingle.prototype.Clear = function () {
        this.mailS = new CircleDM_MailingList();
        this.selectedFiles = null;
    };
    CircleSingle.prototype.uploadSelectProfile = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
        }
    };
    CircleSingle.prototype.uploadSelectProject = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
        }
    };
    CircleSingle.prototype.OpenFullCom = function (newMsg) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newMsg.document;
        if (this.data.DocumentFull) {
            this.data.NavRedirect = 7;
            if (this.data.NavRedirect == 7) {
                this.router.navigate(["startPage"]);
            }
        }
    };
    CircleSingle.prototype.CheckReleaseUpload = function () {
        if (this.data.DisableUploadButton == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle.prototype.FileUploadRun = function () {
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
                    _this.data.DisableUploadButton = 0;
                    if (_this.updateExplore.id != null) {
                        _this.updateExplore.document = _this.data.fileuri.primaryUri;
                    }
                }
                else {
                    _this.data.toggle();
                    _this.uploadButtonCancel = 0;
                    _this.data.DisableUploadButton = 0;
                }
            }, function (err) { return _this.data.DisableUploadButton = 0; });
        }
    };
    CircleSingle.prototype.PostMessage = function (newPost) {
        var _this = this;
        var NotMsg = "";
        NotMsg = this.mailS.message;
        this.mailS.senderEmail = this.currentUser.email;
        this.mailS.senderRef = this.currentUser.id;
        this.mailS.circleDMid = newPost.id;
        this.mailS.senderName = this.currentUser.title + " " + this.currentUser.givenname + " " + this.currentUser.familyname;
        this.data.toggle();
        this.data.EmailCircleDM(this.mailS)
            .subscribe(function (success) {
            if (success) {
                //Notifications
                _this.data.GetCircleDMHopOns(newPost.id)
                    .subscribe(function (success) {
                    if (success) {
                        _this.circleDMHopOns = _this.data.circleDMHopOns;
                        for (var _i = 0, _a = _this.circleDMHopOns; _i < _a.length; _i++) {
                            var value = _a[_i];
                            var SendNot = new Notifications();
                            SendNot.postId = newPost.id;
                            SendNot.recipientRef = value.memberId;
                            SendNot.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " wrote: " + NotMsg;
                            SendNot.valueTitle = "New Group Chat message on " + newPost.title;
                            _this.data.SendNotCircle(SendNot)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
                            if (newPost.issueingId != _this.currentUser.id) {
                                var SendNotPer = new Notifications();
                                SendNotPer.postId = newPost.id;
                                SendNotPer.recipientRef = newPost.issueingId;
                                SendNotPer.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " wrote: " + NotMsg;
                                SendNotPer.valueTitle = "New Group Chat message on your Circle: " + newPost.title;
                                _this.data.SendNotCircle(SendNotPer)
                                    .subscribe(function (success) {
                                    if (success) {
                                    }
                                }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
                            }
                        }
                        _this.EqualizeCommentView.unshift(newPost);
                        _this.data.loadMessageCirclePost(newPost)
                            .subscribe(function (success) {
                            if (success) {
                                _this.mailS.message = "";
                                _this.MessageOn.push(newPost.id);
                                _this.circlemessages = _this.data.circlemessages;
                            }
                        });
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
            }
        });
    };
    CircleSingle.prototype.Close = function () {
        this.mailS = new CircleDM_MailingList();
        this.selectedFiles = null;
        this.data.MessCtrl = 0;
    };
    CircleSingle.prototype.MsgButton = function (newPost) {
        var addOpenWindow = newPost.id;
        if (this.TargetBox.includes(addOpenWindow)) {
            // find the the position in the array to remove the item and remove just one item staring from that position, thus removing just the selected item
            this.checkPostCom.splice(this.checkPostCom.indexOf(newPost.id), 1);
            this.MessageloadLimit = 5;
            this.TargetBox.splice(this.TargetBox.indexOf(addOpenWindow), 1);
            this.ComButCtrl = 0;
            this.mailS.message = null;
            this.showPost = 0;
        }
        else {
            this.showPost = 1;
            this.TargetBox.push(addOpenWindow);
            this.CheckPostComment(newPost);
            this.CircleLoadMsgVal = newPost;
        }
    };
    CircleSingle.prototype.ClearCtrlS = function () {
        this.myControl.reset();
    };
    CircleSingle.prototype.MsgButtonLoad = function (newPost) {
        var _this = this;
        var addOpenWindow = newPost.id;
        if (this.TargetBox.includes(addOpenWindow)) {
            // find the the position in the array to remove the item and remove just one item staring from that position, thus removing just the selected item
            this.checkPostCom.splice(this.checkPostCom.indexOf(newPost.id), 1);
            this.MessageloadLimit = 5;
            this.TargetBox.splice(this.TargetBox.indexOf(addOpenWindow), 1);
            this.ComButCtrl = 0;
            this.mailS.message = null;
            this.showPost = 0;
        }
        else {
            this.showPost = 1;
            this.TargetBox.push(addOpenWindow);
            this.CheckPostComment(newPost);
            this.data.loadMessageCirclePost(newPost)
                .subscribe(function (success) {
                if (success) {
                    _this.circlemessages = _this.data.circlemessages;
                }
            });
            this.CircleLoadMsgVal = newPost;
        }
    };
    CircleSingle.prototype.CheckPostComment = function (newPost) {
        this.checkPostCom.push(newPost.id);
        this.ComButCtrl = 1;
    };
    CircleSingle.prototype.PostButton = function () {
        if (this.data.numCheckPost == 0) {
            this.data.numCheckPost = 1;
        }
        else {
            this.data.numCheckPost = 0;
        }
    };
    CircleSingle.prototype.CheckShowPost = function () {
        if (this.data.numCheckPost == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle.prototype.UpdateExploreCtrl = function (newExplore) {
        this.updateExplore = newExplore;
        this.ExpostToRemove = newExplore;
        this.ExploreUpdateButCtrl = newExplore.id;
    };
    CircleSingle.prototype.ClearIMG = function () {
        this.updateExplore.document = null;
        this.selectedFiles = null;
    };
    CircleSingle.prototype.UpdateMyExplorePost = function () {
        var _this = this;
        //if (this.data.fileuri.primaryUri) {
        if (this.data.fileuri.primaryUri != null) {
            this.updateExplore.document = this.data.fileuri.primaryUri;
        }
        this.updateExplore.datetime = this.ExpostToRemove.datetime;
        this.data.UpdateCirclePost(this.updateExplore)
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
                for (var _b = 0, _c = _this.data.InvitedEmailList; _b < _c.length; _b++) {
                    var value = _c[_b];
                    var NewMail = new CircleDM_MailingList();
                    NewMail.circleDMid = _this.data.toCirclePage.id;
                    NewMail.senderEmail = _this.data.currentUser.email;
                    NewMail.senderRef = _this.data.currentUser.id;
                    NewMail.senderName = _this.data.currentUser.title + " "
                        + _this.data.currentUser.givenname + " " + _this.data.currentUser.familyname;
                    NewMail.email = value.email;
                    NewMail.document = _this.circleForPost.document;
                    _this.data.SendRequestCircleEmail(NewMail)
                        .subscribe(function (success) {
                        if (success) {
                            _this.PrControllMsg = "Check";
                        }
                    }, function (err) { return _this.PrControllMsg = "Failed to send friend request, please try again"; });
                }
                // section end
                _this.data.InvitedMembersListC = _this.InvitedMembersListC;
                _this.data.InvitedEmailList = _this.InvitedEmailList;
                _this.data.OpenSienavInvites = 0;
                _this.data.InvitedMembersListC = [];
                _this.data.InvitedEmailList = [];
                _this.showexpost = 0;
                var listIterate = [];
                var indexIndicUserDel = 0;
                listIterate = _this.myListCircle;
                for (var _d = 0, listIterate_3 = listIterate; _d < listIterate_3.length; _d++) {
                    var value = listIterate_3[_d];
                    if (value.id == _this.updateExplore.id) {
                        indexIndicUserDel = _this.data.myListCircle.indexOf(value);
                        _this.data.myListCircle.splice(_this.data.myListCircle.indexOf(value), 1);
                    }
                }
                _this.data.loadCircleDMbyIdUserDelFoll(_this.updateExplore.id).subscribe(function (success) {
                    if (success) {
                        _this.data.myListCircle.splice(indexIndicUserDel, 0, _this.data.functionReturnloadCircleUserDel);
                        _this.myListCircle = _this.data.myListCircle;
                        _this.showexpost = 1;
                        _this.data.toggle();
                        _this.ExploreUpdateButCtrl = 0;
                        _this.updateExplore = new CircleDM();
                    }
                });
            }
        }, function (err) { return _this.ControllMsg = "Failed to Post"; });
        //}
    };
    //SearchBarUpdateFunctionallity
    //Cancel Buttons
    CircleSingle.prototype.CancelExpostUpdate = function () {
        this.ExpostToRemove = new CircleDM;
        this.ExploreUpdateButCtrl = 0;
        this.updateExplore = new CircleDM;
    };
    //Now Add Controll to append the InviteLists
    CircleSingle.prototype.AddToInvitedMembersListC = function (newMember) {
        this.InvitedMembersListC.push(newMember);
        this.data.OpenSienavInvites = 1;
        this.data.MessCtrl = 0;
        this.data.OpenGroupChat = 0;
        this.data.InvitedMembersListC = this.InvitedMembersListC;
    };
    //Use this check to synchronize this Invites list with the data Servise Ones, this function is called 60x per second
    //so the list will be accurate
    CircleSingle.prototype.CheckShowInvtBtn = function () {
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
    CircleSingle.prototype.ShowInvtsSect = function () {
        this.data.OpenSienavInvites = 1;
        this.data.MessCtrl = 0;
        this.data.OpenGroupChat = 0;
    };
    CircleSingle.prototype.SearchResults = function () {
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
    CircleSingle.prototype.CheckMain = function () {
        if (this.searchresultMember.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle.prototype.CheckSecondary = function () {
        if (this.ValueClone != null) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle.prototype.SettingsCircle = function (newPost) {
        if (this.OpenSettingsCircleP == newPost.id) {
            this.OpenSettingsCircleP = 0;
        }
        else {
            this.OpenSettingsCircleP = newPost.id;
        }
    };
    //Referene for circle invites 
    CircleSingle.prototype.AcceptInviteCircle = function () {
        var _this = this;
        //declare local variables
        var id = 0;
        var remove = new CircleDMInvite();
        remove.invitedMbr = this.currentUser.id;
        remove.requestingMbr = this.data.TransferInvite.requestingMbr;
        // stage1 add to Circle
        this.data.getAcceptedCircleInv(this.data.TransferInvite);
        this.data.SendInviteToCircleDM()
            .subscribe(function (success) {
            if (success) {
                _this.RemoveInviteCircle(_this.data.TransferInvite);
                _this.InvitesMsg = "You are following " + _this.data.TransferInvite.circlePost.title + " !";
                _this.showaccept = 1;
                _this.data.loadCircleDMbyIdUserDelFoll(_this.data.TransferInvite.postId).subscribe(function (success) {
                    if (success) {
                        _this.data.myListCircleInvited.unshift(_this.data.functionReturnloadCircleUserDel);
                    }
                });
            }
        }, function (err) { return _this.ControllMsg = "Failed to accept request, please try again"; });
        //stage 3 all remove code has to declare a new CircleUser because the element is shared with other components
        this.data.myCircleHopOn = new CircleDMHopOns();
    };
    CircleSingle.prototype.RemoveInviteCircle = function (newInvite) {
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
                _this.data.CircleinvitesList.splice(_this.data.CircleinvitesList.indexOf(remove), 1);
            }
        }, function (err) { return _this.ControllMsg = "Failed to remove invite, please try again"; });
        this.data.myCircleHopOn = new CircleDMHopOns();
    };
    CircleSingle.prototype.CheckSignatureInvite = function () {
        if (this.OpenInviteAccept == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    CircleSingle = __decorate([
        Component({
            selector: "circleSingle",
            templateUrl: "circleSingleView.component.html",
            styleUrls: ["circleSList.component.css"]
        }),
        NgModule({
            imports: [
                HighlightPipe
            ],
            declarations: [],
            exports: []
        }),
        __metadata("design:paramtypes", [CountdownService, DataService, Router, DomSanitizer])
    ], CircleSingle);
    return CircleSingle;
}());
export { CircleSingle };
//# sourceMappingURL=circleSingleView.component.js.map