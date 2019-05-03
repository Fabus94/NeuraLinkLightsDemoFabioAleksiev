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
import { ExploreComment, ExploreHashTag, RegisterComment, ExploreReply, ExploreHopOns, ExploreLike } from "../shared/Explore";
import { DomSanitizer } from "@angular/platform-browser";
var ExploreDetailPage = /** @class */ (function () {
    function ExploreDetailPage(data, router, sanitizer) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        //ControllMsg
        this.ControllMsg = "";
        this.MathMss = "";
        // Global variables
        this.checkPostCom = 0;
        this.checkPostReply = 0;
        this.TestStrSp = "";
        this.loadLimit = 5;
        this.loadLimitPage = 20;
        this.replyloadLimit = 5;
        //EqualizeReplyView: ExploreReply[] = [];
        this.EqualizeCommentView = [];
        this.TrackPostSt = 0;
        this.expostsDetailPage = [];
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
        this.sendHopOn = new ExploreHopOns();
        this.checkFollowersCtrlBut = [];
        //for Likes
        this.likes = [];
        this.sendLike = new ExploreLike();
        this.checkLikesCtrlBut = [];
        this.searchresultCommentButton = 0;
        this.PrControllMsg = "";
        this.uploadButtonCancel = 0;
        //ControllMsg
        this.CommentOn = [];
        this.ReplyOn = [];
        this.holdFile = 0;
    }
    ExploreDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.expostsDetailPage = this.data.expostsDetailPage;
        if (this.data.searchresultCommentButton > 0) {
            this.searchresultCommentButton = this.data.searchresultCommentButton;
            this.checkPostCom = this.searchresultCommentButton;
            this.TargetBox.push(this.searchresultCommentButton);
            this.ControllMsg = this.TargetBox.toString();
        }
        if (this.data.currentUser) {
            this.currentUser = this.data.currentUser;
        }
        else {
            this.data.GetCurrentUser()
                .subscribe(function (success) {
                if (success) {
                    _this.currentUser = _this.data.currentUser;
                }
            }, function (err) { return _this.ControllMsg = "Failed to get current user"; });
        }
        this.checkPostCom = 0;
    };
    ExploreDetailPage.prototype.uploadSelectProject = function (event) {
        this.selectedFiles = event.target.files[0];
    };
    ExploreDetailPage.prototype.FileUploadRun = function (ident) {
        var _this = this;
        if (this.selectedFiles) {
            //spec blob storage folder
            var blobDstnt = "accounts-comments";
            var formData = new FormData();
            formData.append('filemy', this.selectedFiles, this.selectedFiles.name);
            // form data submit
            this.PrControllMsg = "Uploading...";
            this.data.toggle();
            this.uploadButtonCancel = ident;
            this.data.uploadFile(formData, blobDstnt)
                .subscribe(function (success) {
                if (success) {
                    _this.PrControllMsg = "File upload success!";
                    _this.uploadButtonCancel = 0;
                    _this.holdFile = ident;
                    _this.data.toggle();
                }
                else {
                    _this.data.toggle();
                    _this.holdFile = ident;
                }
            }, function (err) { return _this.PrControllMsg = "File upload failed, please try again"; });
        }
    };
    ExploreDetailPage.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url).toString();
    };
    //REPLY CTRL
    //call api from the reply form
    ExploreDetailPage.prototype.PostReplyForm = function (newExploreComment) {
        var _this = this;
        // take the CurrentUser Id as the comment issueingMember
        this.postReply.issueingMember = this.currentUser.id;
        //load the uploaded file to the comment
        this.postReply.document = this.data.fileuri.primaryUri;
        this.postReply.replyTo = newExploreComment.id;
        this.uploadButtonCancel = 0;
        this.data.PostReply(this.postReply)
            .subscribe(function (success) {
            if (success) {
                //this.GetReplies(newExploreComment);
                //this.EqualizeReplyView.push(this.postReply);
                _this.TrackPostSt = 1;
                _this.Replies(newExploreComment);
                _this.GetTheCommentsWithIssuing(newExploreComment);
                //load post hashtag model
                _this.postahashtag.tag = _this.postReply.comment;
                //issuing id of comment is the explore post id
                _this.postahashtag.issueingPost = newExploreComment.issueingId;
                _this.postahashtag.isueingComment = _this.data.exPostReplyId.id;
                _this.data.PostNewHashTag(_this.postahashtag)
                    .subscribe(function (success) {
                    if (success) {
                    }
                });
                //clear variables for next method
                _this.exPostReplyId = new ExploreReply();
                _this.postReply = new ExploreReply();
                _this.Replies(newExploreComment);
            }
        }, function (err) { return _this.ControllMsg = "Failed to get replies, please try again"; });
    };
    //pre load comment reply && open form
    ExploreDetailPage.prototype.Replies = function (newExploreComment) {
        this.replyloadLimit = 5;
        var addCommentOpenWindow = newExploreComment.id;
        if (this.TargetComment.includes(addCommentOpenWindow)) {
            // find the the position in the array to remove the item and remove just one item staring from that position, thus removing just the selected item
            this.TargetComment.splice(this.TargetComment.indexOf(addCommentOpenWindow), 1);
            this.replyButCtrl = 0;
            this.checkPostReply = 0;
        }
        else {
            this.TargetComment.push(addCommentOpenWindow);
            this.replyButCtrl = 1;
        }
    };
    ExploreDetailPage.prototype.GetReplies = function (newExploreComment) {
        var _this = this;
        this.data.getReplyForEx(newExploreComment)
            .subscribe(function (success) {
            if (success) {
                _this.replies = _this.data.replies;
                _this.ReplyOn.push(newExploreComment.id);
            }
        }, function (err) { return _this.ControllMsg = "Failed to get Replies"; });
    };
    ExploreDetailPage.prototype.OpenPostReply = function (newExploreComment) {
        this.replyButCtrl = 1;
        this.checkPostReply = newExploreComment.id;
    };
    //COMMENTS CTRL
    ExploreDetailPage.prototype.PostComment = function (newExplorePost) {
        var _this = this;
        this.data.toggle();
        // take the ExplorePost Id as the comment IssueingId
        this.postComment.issueingId = newExplorePost.id;
        // take the CurrentUser Id as the comment issueingMember
        this.postComment.issueingMember = this.currentUser.id;
        //load the uploaded file to the comment
        this.postComment.document = this.data.fileuri.primaryUri;
        this.uploadButtonCancel = 0;
        this.data.PostNewComment(this.postComment)
            .subscribe(function (success) {
            if (success) {
                _this.GetTheComments(newExplorePost);
                _this.exPostComId = _this.data.exPostComId;
                _this.checkPostCom = newExplorePost.id;
                //eq the comm counter
                _this.EqualizeCommentView.push(_this.postComment);
                if (_this.data.exPostComId.id) {
                    //load the register new comment issueingId and memberId from as done above
                    // this is because by default a 3rd party user accessing the comments does not have both
                    _this.registerComment.issueingId = newExplorePost.id;
                    _this.registerComment.memberId = _this.currentUser.id;
                    _this.registerComment.commentId = _this.data.exPostComId.id;
                    _this.data.RegisterNewComment(_this.registerComment)
                        .subscribe(function (success) {
                        if (success) {
                        }
                    }, function (err) { return _this.ControllMsg = "Network error, pls try again"; });
                    //load post hashtag model
                    _this.postahashtag.tag = _this.postComment.comment;
                    _this.postahashtag.issueingPost = newExplorePost.id;
                    _this.postahashtag.isueingComment = _this.data.exPostComId.id;
                    _this.data.PostNewHashTag(_this.postahashtag)
                        .subscribe(function (success) {
                        if (success) {
                            //clear variables for next method
                            _this.exPostComId = new ExploreComment();
                            _this.postComment = new ExploreComment();
                            _this.TrackPostSt = 1;
                        }
                    }, function (err) { return _this.ControllMsg = ""; });
                }
            }
        }, function (err) { return _this.ControllMsg = "Network error, pls try again"; });
    };
    // add value of box where comment button is pressed to an array, in order to open comment section just on that box
    ExploreDetailPage.prototype.CommentsButton = function (newExplorePost) {
        var addOpenWindow = newExplorePost.id;
        if (this.TargetBox.includes(addOpenWindow)) {
            // find the the position in the array to remove the item and remove just one item staring from that position, thus removing just the selected item
            this.checkPostCom = 0;
            this.loadLimit = 5;
            this.TargetBox.splice(this.TargetBox.indexOf(addOpenWindow), 1);
            this.CheckPostComment(newExplorePost);
        }
        else {
            this.checkPostCom = newExplorePost.id;
            this.TargetBox.push(addOpenWindow);
            this.CheckPostComment(newExplorePost);
        }
    };
    ExploreDetailPage.prototype.CommentsButtonLoad = function (newExplorePost) {
        var _this = this;
        var addOpenWindow = newExplorePost.id;
        if (this.TargetBox.includes(addOpenWindow)) {
            // find the the position in the array to remove the item and remove just one item staring from that position, thus removing just the selected item
            this.checkPostCom = 0;
            this.loadLimit = 5;
            this.TargetBox.splice(this.TargetBox.indexOf(addOpenWindow), 1);
            this.CheckPostComment(newExplorePost);
        }
        else {
            this.data.getCommentsForEx(newExplorePost.id)
                .subscribe(function (success) {
                if (success) {
                    _this.comments = _this.data.comments;
                    _this.checkPostCom = newExplorePost.id;
                    _this.TargetBox.push(addOpenWindow);
                    _this.CheckPostComment(newExplorePost);
                }
            }, function (err) { return _this.ControllMsg = "Failed to get comments"; });
        }
    };
    ExploreDetailPage.prototype.GetTheComments = function (newExplorePost) {
        var _this = this;
        this.data.getCommentsForEx(newExplorePost.id)
            .subscribe(function (success) {
            if (success) {
                _this.comments = _this.data.comments;
                _this.CommentOn.push(newExplorePost.id);
            }
        }, function (err) { return _this.ControllMsg = "Failed to get comments"; });
    };
    ExploreDetailPage.prototype.GetTheCommentsWithIssuing = function (newExploreComment) {
        var _this = this;
        this.data.toggle();
        this.data.getCommentsForEx(newExploreComment.issueingId)
            .subscribe(function (success) {
            if (success) {
                _this.comments = _this.data.comments;
                _this.CommentOn.push(newExploreComment.issueingId);
                _this.data.toggle();
            }
        }, function (err) { return _this.ControllMsg = "Failed to get comments"; });
    };
    //put the number of the opened comment post in var checkPostCom
    ExploreDetailPage.prototype.CheckPostComment = function (newExplorePost) {
        if (this.ComButCtrl == 1) {
            this.checkPostCom = 0;
            this.ComButCtrl = 0;
            this.checkPostCom = 0;
            this.postComment.comment = null;
        }
        else {
            this.checkPostCom = newExplorePost.id;
            this.ComButCtrl = 1;
            this.checkPostCom = newExplorePost.id;
        }
    };
    //load more Comments
    ExploreDetailPage.prototype.LoadMoreCom = function () {
        this.loadLimit += 7;
    };
    //&&
    ExploreDetailPage.prototype.LoadMoreRep = function () {
        this.replyloadLimit += 7;
    };
    ExploreDetailPage.prototype.LoadMoreExposts = function () {
        this.loadLimitPage += 20;
    };
    //nav to profile page
    ExploreDetailPage.prototype.ProfilePage = function (newReply) {
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
    ExploreDetailPage.prototype.ProfilePageFCom = function (newComment) {
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
    ExploreDetailPage.prototype.ProfilePageFExPost = function (newExplorePost) {
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
    ExploreDetailPage.prototype.ProfilePageHopOns = function (newHopOn) {
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
    ExploreDetailPage.prototype.ProfilePageLikes = function (newLike) {
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
    //POPULAR SERVICES CTRL
    ExploreDetailPage.prototype.ViewFollowersCtrlBut = function (newExplorePost) {
        if (this.checkFollowersCtrlBut.includes(newExplorePost.id)) {
            this.checkFollowersCtrlBut.splice(this.checkFollowersCtrlBut.indexOf(newExplorePost.id), 1);
        }
        else {
            if (this.checkLikesCtrlBut.includes(newExplorePost.id)) {
                this.checkLikesCtrlBut.splice(this.checkLikesCtrlBut.indexOf(newExplorePost.id), 1);
            }
            this.checkFollowersCtrlBut.push(newExplorePost.id);
            this.ViewFollowers(newExplorePost);
        }
    };
    ExploreDetailPage.prototype.ViewFollowers = function (newExplorePost) {
        var _this = this;
        this.data.GetHopOns(newExplorePost)
            .subscribe(function (success) {
            if (success) {
                _this.expostHopOns = _this.data.expostHopOns;
            }
        }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
    };
    ExploreDetailPage.prototype.Follow = function (newExplorePost) {
        var _this = this;
        this.sendHopOn.memberId = this.data.currentUser.id;
        this.sendHopOn.explorePostId = newExplorePost.id;
        //check that user cannot Like twice NB summing the two unique id's by multiplying one side gurantees unique result in a two variables scenario
        this.sendHopOn.uniqueCheck = this.currentUser.id + (newExplorePost.id * 2);
        this.data.PostNewHopOn(this.sendHopOn)
            .subscribe(function (success) {
            if (success) {
                _this.LikeMsg = "Following!";
            }
        }, function (err) { return _this.ControllMsg = "Failed to post New Follower"; });
    };
    ExploreDetailPage.prototype.Like = function (newExplorePost) {
        var _this = this;
        this.sendLike.postId = newExplorePost.id;
        this.sendLike.memberId = this.data.currentUser.id;
        //check that user cannot HopOn twice NB summing the two unique id's by multiplying one side gurantees unique result in a two variables scenario
        this.sendLike.uniqueCheck = this.currentUser.id + (newExplorePost.id * 2);
        this.data.PostNewLike(this.sendLike)
            .subscribe(function (success) {
            if (success) {
                _this.LikeMsg = "Liked!";
            }
        }, function (err) { return _this.ControllMsg = "Failed to like Post, error"; });
    };
    ExploreDetailPage.prototype.ViewLikesCtrlBut = function (newExplorePost) {
        if (this.checkLikesCtrlBut.includes(newExplorePost.id)) {
            this.checkLikesCtrlBut.splice(this.checkLikesCtrlBut.indexOf(newExplorePost.id), 1);
        }
        else {
            if (this.checkFollowersCtrlBut.includes(newExplorePost.id)) {
                this.checkFollowersCtrlBut.splice(this.checkFollowersCtrlBut.indexOf(newExplorePost.id), 1);
            }
            this.checkLikesCtrlBut.push(newExplorePost.id);
            this.ViewLike(newExplorePost);
        }
    };
    ExploreDetailPage.prototype.ViewLike = function (newExplorePost) {
        var _this = this;
        this.data.GetExLike(newExplorePost)
            .subscribe(function (success) {
            if (success) {
                _this.likes = _this.data.likes;
            }
        }, function (err) { return _this.ControllMsg = "Failed to get likes, error"; });
    };
    //Functions View Balance Results use *ngIf
    ExploreDetailPage.prototype.RoundUpCom = function (newExplorePost) {
        var Equlibrium = 0;
        for (var _i = 0, _a = this.EqualizeCommentView; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.issueingId == newExplorePost.id) {
                Equlibrium++;
            }
        }
        return Equlibrium;
    };
    ExploreDetailPage.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    //___________MessagesImport____________
    ExploreDetailPage.prototype.MessageUser = function (newExplorePost) {
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
        this.data.MessCtrl = 1;
        this.data.toMessage = newExplorePost.member;
    };
    ExploreDetailPage.prototype.ZoomIn = function (zoom) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = zoom;
        if (this.data.DocumentFull) {
            this.data.NavBackFromProfile = "exploreposts";
            this.router.navigate(["docfull"]);
        }
    };
    ExploreDetailPage.prototype.PostButton = function () {
        if (this.data.numCheckPost == 0) {
            this.data.numCheckPost = 1;
        }
        else {
            this.data.numCheckPost = 0;
        }
    };
    ExploreDetailPage.prototype.CheckShowPost = function () {
        if (this.data.numCheckPost == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ExploreDetailPage = __decorate([
        Component({
            selector: "explorepostDetail-page",
            templateUrl: "ExplorePostdetailsPage.html",
            styleUrls: ["ExplorePostdetailsPage.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer])
    ], ExploreDetailPage);
    return ExploreDetailPage;
}());
export { ExploreDetailPage };
//# sourceMappingURL=ExplorePostdetailsPage.js.map