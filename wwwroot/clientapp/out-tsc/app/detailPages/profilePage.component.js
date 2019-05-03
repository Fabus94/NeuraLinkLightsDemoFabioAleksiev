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
import { ExplorePost, ExploreComment, ExploreHashTag, RegisterComment, ExploreReply, ExploreHopOns, ExploreLike } from "../shared/Explore";
import { DomSanitizer } from "@angular/platform-browser";
import { Invite } from "../shared/invite";
import { Notifications } from "../shared/Notification";
import { CountdownService } from "../shared/Timer";
var Profile = /** @class */ (function () {
    function Profile(data, router, sanitizer, countdownService) {
        this.data = data;
        this.router = router;
        this.sanitizer = sanitizer;
        this.countdownService = countdownService;
        //initlz the general variables
        this.ControllMsg = "";
        this.showexpost = 0;
        this.currentUser = new Member();
        this.toProfilePage = new Member();
        this.PrControllMsg = "";
        this.uploadButtonCancel = 0;
        //ControllMsg
        this.MathMss = "";
        this.CommentOn = [];
        this.ReplyOn = [];
        // Global variables
        this.checkPostCom = 0;
        this.checkPostReply = 0;
        this.loadLimit = 5;
        this.loadLimitPage = 20;
        this.replyloadLimit = 5;
        //EqualizeReplyView: ExploreReply[] = [];
        this.EqualizeCommentView = [];
        this.TrackPostSt = 0;
        this.expostsDetailPage = [];
        this.postahashtag = new ExploreHashTag();
        this.selectedFiles = null;
        //for Comments
        this.ComButCtrl = 0;
        this.exPostComId = new ExploreComment();
        this.comments = [];
        this.postComment = new ExploreComment();
        this.registerComment = new RegisterComment();
        this.TargetBox = 0;
        //for Replies
        this.replyButCtrl = 0;
        this.TargetComment = 0;
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
        this.holdFile = 0;
        //import from memberList
        this.personalMsg = "";
        this.ctrlPerMsg = 0;
        this.targetAddButtonView = [];
        //_________________CONTROLLS EXPLOREPOST___________________________________________________________________________________________________________________
        this.lrReplySwitch = 0;
        this.exposts = [];
        this.myFollowingPosts = [];
        this.userFollowingPosts = [];
        //for Likes
        this.myLiked = [];
        this.userLiked = [];
        //Graphical controllers_________________________________________________________________
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
        this.commentToTrack = new ExploreComment();
        // add value of box where comment button is pressed to an array, in order to open comment section just on that box
        this.addOpenWindow = 0;
    }
    //forPdf viewer
    //page: number = 1;
    //totalPages: number;
    //isLoaded: boolean = false;
    Profile.prototype.ngOnInit = function () {
        var _this = this;
        this.data.toggle();
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.toProfilePage = this.data.toProfilePage;
        this.targetAddButtonView = this.data.targetAddButtonView;
        this.countdownService.countdown().subscribe(function (t) {
            if (_this.data.CountTest % 14 == 0) {
                if (_this.addOpenWindow > 0) {
                    _this.data.getCommentsForEx(_this.addOpenWindow)
                        .subscribe(function (success) {
                        if (success) {
                            _this.comments = _this.data.comments;
                        }
                    }, function (err) { return _this.ControllMsg = "Failed to get comments"; });
                }
            }
        });
        this.countdownService.countdown().subscribe(function (t) {
            if (_this.data.CountTest % 14 == 0) {
                if (_this.addCommentOpenWindow > 0) {
                    _this.data.getReplyForEx(_this.commentToTrack)
                        .subscribe(function (success) {
                        if (success) {
                            _this.replies = _this.data.replies;
                            _this.ReplyOn.push(_this.commentToTrack);
                        }
                    }, function (err) { return _this.ControllMsg = "Failed to get Comment"; });
                }
            }
        });
        this.data.loadExPostForUserDetailP(this.toProfilePage)
            .subscribe(function (success) {
            if (success) {
                _this.expostsDetailPage = _this.data.expostsDetailPage;
                _this.showexpost = 1;
                _this.data.toggle();
            }
        });
        if (this.data.susasssrsp != null) {
            this.currentUser = this.data.currentUser;
            if (this.currentUser != null) {
                this.data.GetExMyLiked(this.currentUser.id)
                    .subscribe(function (success) {
                    if (success) {
                        for (var _i = 0, _a = _this.data.myLiked; _i < _a.length; _i++) {
                            var value = _a[_i];
                            _this.myLiked.push(value.postId);
                        }
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get my liked"; });
                this.data.GetFollowingPosts(this.currentUser.id)
                    .subscribe(function (success) {
                    if (success) {
                        for (var _i = 0, _a = _this.data.followingPosts; _i < _a.length; _i++) {
                            var value = _a[_i];
                            _this.myFollowingPosts.push(value.explorePostId);
                        }
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get my liked"; });
            }
            if (this.currentUser != null) {
                this.data.GetCurrentUser()
                    .subscribe(function (success) {
                    if (success) {
                        _this.currentUser = _this.data.currentUser;
                        _this.data.GetExMyLiked(_this.currentUser.id)
                            .subscribe(function (success) {
                            if (success) {
                                for (var _i = 0, _a = _this.data.myLiked; _i < _a.length; _i++) {
                                    var value = _a[_i];
                                    _this.myLiked.push(value.postId);
                                }
                            }
                        }, function (err) { return _this.ControllMsg = "Failed to get my liked"; });
                        _this.data.GetFollowingPosts(_this.currentUser.id)
                            .subscribe(function (success) {
                            if (success) {
                                for (var _i = 0, _a = _this.data.followingPosts; _i < _a.length; _i++) {
                                    var value = _a[_i];
                                    _this.myFollowingPosts.push(value.explorePostId);
                                }
                            }
                        }, function (err) { return _this.ControllMsg = "Failed to get my liked"; });
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get current user"; });
            }
        }
        this.checkPostCom = 0;
        this.data.toProfilePage = new Member();
        this.data.NavRedirect = 0;
    };
    //send friend request
    Profile.prototype.SelectId = function (member) {
        var _this = this;
        this.data.getMemberId(member);
        this.data.SendRequest()
            .subscribe(function (success) {
            if (success) {
                var req = new Invite();
                req.invitedMbr = member.id;
                req.requestingMbr = _this.currentUser.id;
                _this.ctrlPerMsg = member.id;
                _this.personalMsg = "A friend request was sent to  " + member.givenname;
                _this.targetAddButtonView.push(member.id);
                _this.data.requestsList.push(req);
            }
        }, function (err) { return _this.personalMsg = "Failed to send friend request, please try again"; });
    };
    //ProfilePageOptionsCtrls
    Profile.prototype.ProjectPageFromProfile = function () {
        this.data.projectsFromMembersListAvatar = this.toProfilePage;
        this.data.NavBackFromProfile = "myprofile";
        this.router.navigate(["projectsmbr"]);
    };
    Profile.prototype.BackFromProfile = function () {
        this.router.navigate([this.data.NavBackFromProfile]);
    };
    Profile.prototype.CheckActiveAddButton = function (newMember) {
        //CHECK VARIABLES
        //remove redundant add buttons algorithm
        if (this.data.targetAddButtonView.includes(newMember.id)) {
            return true;
        }
        else {
            return false;
        }
    };
    Profile.prototype.AddSelectedFileNumber = function (id) {
        this.selectedVerifyFile = id;
        if (this.selectedFiles != null) {
            this.selectedFiles = null;
        }
    };
    Profile.prototype.Clear = function () {
        this.postReply = new ExploreReply();
        this.postComment = new ExploreComment();
        this.selectedFiles = null;
    };
    Profile.prototype.uploadSelectProfile = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
        }
    };
    Profile.prototype.uploadSelectProject = function (event) {
        this.selectedFiles = event.target.files[0];
        if (this.selectedFiles != null) {
            this.FileUploadRun();
        }
    };
    Profile.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    Profile.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    Profile.prototype.OpenFull = function (newExplorePost) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newExplorePost.document;
        if (this.data.DocumentFull) {
            this.data.NavBackFromProfile = "profile";
            this.router.navigate(["docfull"]);
        }
    };
    Profile.prototype.OpenFullCom = function (newCom) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newCom.document;
        if (this.data.DocumentFull) {
            this.data.NavBackFromProfile = "exploreposts";
            this.router.navigate(["docfull"]);
        }
    };
    Profile.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    Profile.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    Profile.prototype.ReturnParameterPdf = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    Profile.prototype.ReturnParameterImgW = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    Profile.prototype.ReturnParameterImgH = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    Profile.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    Profile.prototype.AddPostClickCom = function (newPost) {
        if (newPost.id != this.PostClickedCom) {
            this.PostClicked = 0;
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClickedCom = newPost.id;
        }
    };
    Profile.prototype.ReturnParameterImgWCom = function (newPost) {
        if (this.PostClickedCom == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    Profile.prototype.ReturnParameterImgHCom = function (newPost) {
        if (this.PostClickedCom == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    Profile.prototype.ReturnParameterPdfCom = function (newPost) {
        if (this.PostClickedCom == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    Profile.prototype.AddPostClickRep = function (newPost) {
        if (newPost.id != this.PostClickedRep) {
            this.PostClicked = 0;
            this.PostClickedCom = 0;
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClickedRep = newPost.id;
        }
    };
    Profile.prototype.ReturnParameterImgWRep = function (newPost) {
        if (this.PostClickedRep == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    Profile.prototype.ReturnParameterImgHRep = function (newPost) {
        if (this.PostClickedRep == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    Profile.prototype.ReturnParameterPdfRep = function (newPost) {
        if (this.PostClickedRep == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    //MODAL------------------------------------------------------
    //Check whether post is a pdf or other image file
    Profile.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    //Graphical controllers_________________________________________________________________
    Profile.prototype.CheckReleaseUpload = function () {
        if (this.data.DisableUploadButton == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Profile.prototype.FileUploadRun = function () {
        var _this = this;
        if (this.selectedFiles) {
            //spec blob storage folder
            var blobDstnt = "accounts-comments";
            var formData = new FormData();
            formData.append('filemy', this.selectedFiles, this.selectedFiles.name);
            // form data submit
            this.PrControllMsg = "Uploading...";
            this.data.toggle();
            this.data.DisableUploadButton = 1;
            this.data.uploadFile(formData, blobDstnt)
                .subscribe(function (success) {
                if (success) {
                    _this.PrControllMsg = "File upload success!";
                    _this.uploadButtonCancel = 0;
                    _this.data.toggle();
                    _this.data.DisableUploadButton = 0;
                }
                else {
                    _this.data.toggle();
                    _this.data.DisableUploadButton = 0;
                }
            }, function (err) { return _this.data.DisableUploadButton = 0; });
        }
    };
    Profile.prototype.getSantizeUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url).toString();
    };
    Profile.prototype.CheckLogin = function () {
        if (this.data.susasssrsp.email != null) {
            return true;
        }
        else {
            return false;
        }
    };
    //REPLY CTRL
    //call api from the reply form
    Profile.prototype.PostReplyForm = function (newExploreComment) {
        var _this = this;
        // take the CurrentUser Id as the comment issueingMember
        this.postReply.issueingMember = this.currentUser.id;
        //load the uploaded file to the comment
        this.postReply.document = this.data.fileuri.primaryUri;
        this.postReply.replyTo = newExploreComment.id;
        this.postReply.issueingId = newExploreComment.issueingId;
        this.uploadButtonCancel = 0;
        this.data.PostReply(this.postReply)
            .subscribe(function (success) {
            if (success) {
                //this.GetReplies(newExploreComment);
                //this.EqualizeReplyView.push(this.postReply);
                _this.TrackPostSt = 1;
                _this.Replies(newExploreComment);
                _this.GetTheCommentsWithIssuing(newExploreComment);
                _this.data.GetHopOnsIdIn(newExploreComment.issueingId)
                    .subscribe(function (success) {
                    if (success) {
                        var SendPostCom = new ExplorePost();
                        //find the post in the list
                        for (var _i = 0, _a = _this.exposts; _i < _a.length; _i++) {
                            var value = _a[_i];
                            if (newExploreComment.issueingId == value.id) {
                                SendPostCom = value;
                            }
                        }
                        _this.expostHopOns = _this.data.expostHopOns;
                        for (var _b = 0, _c = _this.expostHopOns; _b < _c.length; _b++) {
                            var value = _c[_b];
                            var SendNot = new Notifications();
                            SendNot.postId = newExploreComment.issueingId;
                            SendNot.recipientRef = value.memberId;
                            //This can be improved => the reply information given is hardly precise
                            SendNot.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " replied to " + newExploreComment.comment + " by " + newExploreComment.member.familyname + " " + newExploreComment.member.givenname + " in " + SendPostCom.title;
                            SendNot.valueTitle = "New Replies on a post you are following";
                            _this.data.SendNotExplore(SendNot)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
                        }
                        var SendNotPer = new Notifications();
                        SendNotPer.postId = newExploreComment.issueingId;
                        SendNotPer.recipientRef = newExploreComment.issueingMember;
                        SendNotPer.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " replied to " + newExploreComment.comment + " in " + SendPostCom.title;
                        SendNotPer.valueTitle = "New Reply on your comment";
                        _this.data.SendNotExplore(SendNotPer)
                            .subscribe(function (success) {
                            if (success) {
                            }
                        }, function (err) { return _this.ControllMsg = "Failed to send notification"; });
                        if (newExploreComment.explorePost.issueingId != _this.currentUser.id) {
                            var SendNotPerMaster = new Notifications();
                            SendNotPerMaster.postId = newExploreComment.issueingId;
                            SendNotPerMaster.recipientRef = SendPostCom.issueingId;
                            SendNotPerMaster.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " replied to " + newExploreComment.comment + " by " + newExploreComment.member.familyname + " " + newExploreComment.member.givenname + " in " + SendPostCom.title;
                            SendNotPerMaster.valueTitle = "New Replies on your Explore post";
                            _this.data.SendNotExplore(SendNotPerMaster)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to send notification"; });
                        }
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
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
    Profile.prototype.Replies = function (newExploreComment) {
        this.replyloadLimit = 5;
        this.commentToTrack = newExploreComment;
        this.addCommentOpenWindow = newExploreComment.id;
        if (this.TargetComment == newExploreComment.id) {
            // find the the position in the array to remove the item and remove just one item staring from that position, thus removing just the selected item
            this.addCommentOpenWindow = 0;
            this.TargetComment = 0;
            this.replyButCtrl = 0;
            this.checkPostReply = 0;
        }
        else {
            this.TargetComment = newExploreComment.id;
            this.replyButCtrl = 1;
            this.lrReplySwitch = 1;
        }
    };
    Profile.prototype.GetReplies = function (newExploreComment) {
        var _this = this;
        this.data.getReplyForEx(newExploreComment)
            .subscribe(function (success) {
            if (success) {
                _this.replies = _this.data.replies;
                _this.ReplyOn.push(newExploreComment.id);
            }
        }, function (err) { return _this.ControllMsg = "Failed to get Replies"; });
    };
    Profile.prototype.OpenPostReply = function (newExploreComment) {
        this.replyButCtrl = 1;
        this.checkPostReply = newExploreComment.id;
        this.lrReplySwitch = 1;
    };
    //COMMENTS CTRL
    Profile.prototype.PostComment = function (newExplorePost) {
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
                if (_this.checkPostCom != newExplorePost.id) {
                    _this.checkPostCom = newExplorePost.id;
                }
                //eq the comm counter
                _this.EqualizeCommentView.unshift(_this.postComment);
                _this.postComment.comment = null;
                if (_this.data.exPostComId.id) {
                    //load the register new comment issueingId and memberId from as done above
                    // this is because by default a 3rd party user accessing the comments does not have both
                    _this.registerComment.issueingId = newExplorePost.id;
                    _this.registerComment.memberId = _this.currentUser.id;
                    _this.registerComment.commentId = _this.data.exPostComId.id;
                    _this.data.RegisterNewComment(_this.registerComment)
                        .subscribe(function (success) {
                        if (success) {
                            _this.data.GetHopOns(newExplorePost)
                                .subscribe(function (success) {
                                if (success) {
                                    _this.expostHopOns = _this.data.expostHopOns;
                                    for (var _i = 0, _a = _this.expostHopOns; _i < _a.length; _i++) {
                                        var value = _a[_i];
                                        var SendNot = new Notifications();
                                        SendNot.postId = newExplorePost.id;
                                        SendNot.recipientRef = value.memberId;
                                        SendNot.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " commented on " + newExplorePost.title;
                                        SendNot.valueTitle = "New Comment on a post you are following";
                                        _this.data.SendNotExplore(SendNot)
                                            .subscribe(function (success) {
                                            if (success) {
                                            }
                                        }, function (err) { return _this.ControllMsg = "Failed to send notification"; });
                                    }
                                    if (newExplorePost.issueingId != _this.currentUser.id) {
                                        var SendNotPer = new Notifications();
                                        SendNotPer.postId = newExplorePost.id;
                                        SendNotPer.recipientRef = newExplorePost.issueingId;
                                        SendNotPer.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " commented on " + newExplorePost.title;
                                        SendNotPer.valueTitle = "New Comment on your Explore post";
                                        _this.data.SendNotExplore(SendNotPer)
                                            .subscribe(function (success) {
                                            if (success) {
                                            }
                                        }, function (err) { return _this.ControllMsg = "Failed to send notification"; });
                                    }
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
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
    Profile.prototype.CommentsButton = function (newExplorePost) {
        this.addOpenWindow = newExplorePost.id;
        if (this.TargetBox == newExplorePost.id) {
            // find the the position in the array to remove the item and remove just one item staring from that position, thus removing just the selected item
            this.checkPostCom = 0;
            this.loadLimit = 5;
            this.TargetBox = 0;
            this.ComButCtrl = 0;
            this.postComment.comment = null;
            this.addOpenWindow = 0;
        }
        else {
            this.lrReplySwitch = 0;
            this.TargetBox = this.addOpenWindow;
            this.CheckPostComment(newExplorePost);
        }
    };
    Profile.prototype.CommentsButtonLoad = function (newExplorePost) {
        var _this = this;
        this.addOpenWindow = newExplorePost.id;
        if (this.TargetBox == newExplorePost.id) {
            // find the the position in the array to remove the item and remove just one item staring from that position, thus removing just the selected item
            this.checkPostCom = 0;
            this.loadLimit = 5;
            this.TargetBox = 0;
            this.ComButCtrl = 0;
            this.postComment.comment = null;
        }
        else {
            this.lrReplySwitch = 0;
            this.TargetBox = this.addOpenWindow;
            this.CheckPostComment(newExplorePost);
            this.data.getCommentsForEx(newExplorePost.id)
                .subscribe(function (success) {
                if (success) {
                    _this.comments = _this.data.comments;
                }
            }, function (err) { return _this.ControllMsg = "Failed to get comments"; });
        }
    };
    //put the number of the opened comment post in var checkPostCom
    Profile.prototype.CheckPostComment = function (newExplorePost) {
        this.checkPostCom = 0;
        this.ComButCtrl = 0;
        this.checkPostCom = newExplorePost.id;
        this.ComButCtrl = 1;
    };
    Profile.prototype.GetTheComments = function (newExplorePost) {
        var _this = this;
        this.data.getCommentsForEx(newExplorePost.id)
            .subscribe(function (success) {
            if (success) {
                _this.comments = _this.data.comments;
                _this.CommentOn.push(newExplorePost.id);
            }
        }, function (err) { return _this.ControllMsg = "Failed to get comments"; });
    };
    Profile.prototype.GetTheCommentsWithIssuing = function (newExploreComment) {
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
    //load more Comments
    Profile.prototype.LoadMoreCom = function () {
        this.loadLimit += 7;
    };
    //&&
    Profile.prototype.LoadMoreRep = function () {
        this.replyloadLimit += 7;
    };
    Profile.prototype.LoadMoreExposts = function () {
        this.loadLimitPage += 20;
    };
    //nav to profile page
    Profile.prototype.ProfilePage = function (newReply) {
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
    Profile.prototype.ProfilePageFCom = function (newComment) {
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
    Profile.prototype.ProfilePageFExPost = function (newExplorePost) {
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
    Profile.prototype.ProfilePageHopOns = function (newHopOn) {
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
    Profile.prototype.ProfilePageLikes = function (newLike) {
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
    Profile.prototype.CheckIncludeFollowing = function (newExplorePost) {
        if (this.userFollowingPosts.includes(newExplorePost.id)) {
            return true;
        }
        else {
            return false;
        }
    };
    Profile.prototype.ViewFollowersCtrlBut = function (newExplorePost) {
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
    Profile.prototype.ViewFollowers = function (newExplorePost) {
        var _this = this;
        this.data.GetHopOns(newExplorePost)
            .subscribe(function (success) {
            if (success) {
                _this.expostHopOns = _this.data.expostHopOns;
            }
        }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
    };
    Profile.prototype.Follow = function (newExplorePost) {
        var _this = this;
        this.sendHopOn.memberId = this.data.currentUser.id;
        this.sendHopOn.explorePostId = newExplorePost.id;
        //check that user cannot Like twice NB summing the two unique id's by multiplying one side gurantees unique result in a two variables scenario
        this.sendHopOn.uniqueCheck = (this.currentUser.id * newExplorePost.id) + (newExplorePost.issueingId + newExplorePost.id);
        this.data.PostNewHopOn(this.sendHopOn)
            .subscribe(function (success) {
            if (success) {
                _this.myFollowingPosts.push(newExplorePost.id);
                _this.userFollowingPosts.push(newExplorePost.id);
                //find the issuing Id here and send a owner notification
                var SendNot = new Notifications();
                SendNot.postId = newExplorePost.id;
                SendNot.recipientRef = newExplorePost.issueingId;
                SendNot.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " is following " + newExplorePost.title;
                SendNot.valueTitle = "New following on your Explore post";
                _this.data.SendNotExplore(SendNot)
                    .subscribe(function (success) {
                    if (success) {
                    }
                }, function (err) { return _this.ControllMsg = "Failed to get follewers"; });
            }
        }, function (err) { return _this.ControllMsg = "Failed to post New Follower"; });
    };
    Profile.prototype.UnFollowReq = function (newExplorePost) {
        var _this = this;
        this.data.UnFollow((this.currentUser.id * newExplorePost.id) + (newExplorePost.issueingId + newExplorePost.id))
            .subscribe(function (success) {
            if (success) {
                _this.myFollowingPosts.splice(_this.myFollowingPosts.indexOf(newExplorePost.id), 1);
                if (_this.userFollowingPosts.includes(newExplorePost.id)) {
                    _this.userFollowingPosts.splice(_this.userFollowingPosts.indexOf(newExplorePost.id), 1);
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to Unlike Post"; });
    };
    Profile.prototype.CheckIncludeLike = function (newExplorePost) {
        if (this.userLiked.includes(newExplorePost.id)) {
            return true;
        }
        else {
            return false;
        }
    };
    Profile.prototype.Like = function (newExplorePost) {
        var _this = this;
        this.sendLike.postId = newExplorePost.id;
        this.sendLike.memberId = this.data.currentUser.id;
        //check that user cannot HopOn twice NB summing the two unique id's by multiplying one side gurantees unique result in a two variables scenario
        this.sendLike.uniqueCheck = this.currentUser.id + (newExplorePost.id * 2);
        this.data.PostNewLike(this.sendLike)
            .subscribe(function (success) {
            if (success) {
                _this.data.GetHopOns(newExplorePost)
                    .subscribe(function (success) {
                    if (success) {
                        _this.expostHopOns = _this.data.expostHopOns;
                        for (var _i = 0, _a = _this.expostHopOns; _i < _a.length; _i++) {
                            var value = _a[_i];
                            var SendNot = new Notifications();
                            SendNot.postId = newExplorePost.id;
                            SendNot.recipientRef = value.memberId;
                            SendNot.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " liked " + newExplorePost.title;
                            SendNot.valueTitle = "New Like on a post you are following";
                            _this.data.SendNotExplore(SendNot)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to send notification"; });
                        }
                        if (newExplorePost.issueingId != _this.currentUser.id) {
                            var SendNotPer = new Notifications();
                            SendNotPer.postId = newExplorePost.id;
                            SendNotPer.recipientRef = newExplorePost.issueingId;
                            SendNotPer.valueMessage = _this.currentUser.givenname + " " + _this.currentUser.familyname + " liked " + newExplorePost.title;
                            SendNotPer.valueTitle = "New Like on your Explore post";
                            _this.data.SendNotExplore(SendNotPer)
                                .subscribe(function (success) {
                                if (success) {
                                }
                            }, function (err) { return _this.ControllMsg = "Failed to send notification"; });
                        }
                    }
                }, function (err) { return _this.ControllMsg = "Failed to send notification"; });
                _this.myLiked.push(newExplorePost.id);
                _this.userLiked.push(newExplorePost.id);
            }
        }, function (err) { return _this.ControllMsg = "Failed to like Post, error"; });
    };
    Profile.prototype.UnLikeReq = function (newExplorePost) {
        var _this = this;
        this.data.Unlike(this.currentUser.id + newExplorePost.id * 2)
            .subscribe(function (success) {
            if (success) {
                _this.myLiked.splice(_this.myLiked.indexOf(newExplorePost.id), 1);
                if (_this.userLiked.includes(newExplorePost.id)) {
                    _this.userLiked.splice(_this.userLiked.indexOf(newExplorePost.id), 1);
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to Unlike Post"; });
    };
    Profile.prototype.ViewLikesCtrlBut = function (newExplorePost) {
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
    Profile.prototype.ViewLike = function (newExplorePost) {
        var _this = this;
        this.data.GetExLike(newExplorePost)
            .subscribe(function (success) {
            if (success) {
                _this.likes = _this.data.likes;
            }
        }, function (err) { return _this.ControllMsg = "Failed to get likes, error"; });
    };
    //Functions View Balance Results use *ngIf
    Profile.prototype.RoundUpCom = function (newExplorePost) {
        var Equlibrium = 0;
        for (var _i = 0, _a = this.EqualizeCommentView; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.issueingId == newExplorePost.id) {
                Equlibrium++;
            }
        }
        return Equlibrium;
    };
    //___________MessagesImport____________
    Profile.prototype.MessageUser = function (newMember) {
        // format: email, senderEmail
        var _this = this;
        this.data.loadMessage(newMember.email, this.currentUser.email)
            .subscribe(function (success) {
            if (success) {
                for (var _i = 0, _a = _this.data.messages; _i < _a.length; _i++) {
                    var s = _a[_i];
                    _this.data.UpdateMsgtoRead();
                }
            }
        });
        this.data.OpenSienavInvites = 0;
        this.data.MessCtrl = 1;
        this.data.OpenGroupChat = 0;
        this.data.toMessage = newMember;
    };
    Profile.prototype.PostButton = function () {
        if (this.data.numCheckPost == 0) {
            this.data.numCheckPost = 1;
        }
        else {
            this.data.numCheckPost = 0;
        }
    };
    Profile.prototype.CheckShowPost = function () {
        if (this.data.numCheckPost == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Profile = __decorate([
        Component({
            selector: "profile-page",
            templateUrl: "profilePage.component.html",
            styleUrls: ["profilePage.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router, DomSanitizer, CountdownService])
    ], Profile);
    return Profile;
}());
export { Profile };
//# sourceMappingURL=profilePage.component.js.map