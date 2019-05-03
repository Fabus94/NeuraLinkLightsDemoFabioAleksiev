var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Member, CircleUser, Circle, Susasss, FileUri } from "./member";
import { CircleDMInvite } from "./invite";
import { Project } from "../shared/Project";
import { ExplorePost, ExploreComment, ExploreHopOns, ExploreHashTag, ExploreLike, ExploreReply } from "./Explore";
import { MailingList, NewMsgs } from "./Email";
import { CircleDM, CircleDMHopOns } from "./Circle";
import { Notifications } from "./Notification";
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        //For Posting
        this.CountStarted = 0;
        this.CountTest = 0;
        this.CheckPostingOptions = 0;
        //global ctrl variables
        this.NavSearchTerm = "";
        this.SearchTermCheckBack = 0;
        this.buildProfileBolDeclare = 0;
        this.DocumentFull = "";
        this.numCheckPost = 0;
        this.numCheckPostProject = 0;
        this.showLoginScr = 0;
        this.showLogoutScr = 0;
        //Redirect application to specific page from pre- root (/) location - Reshub
        this.NavRedirect = 0;
        this.OpenInviteAccept = 0;
        this.TransferInvite = new CircleDMInvite();
        //return from profile page ctrl
        this.NavBackFromProfile = "";
        //variable for the message pop up box
        this.MessCtrl = 0;
        this.toMessage = new Member();
        // use for token issuing
        this.token = "";
        //ipVar: IpAddress = new IpAddress;
        this.susasssrsp = new Susasss();
        //uploads variable
        this.selectedFile = null;
        //use as operational lists class for Invites/Requests
        this.circleUser = new CircleUser();
        this.myCircle = new Circle();
        this.currentUser = new Member(); //public currentUser: Member[] = [];
        //use for upload operations return file uri
        this.fileuri = new FileUri();
        //use as operational lists for ...List.component elements
        this.messages = [];
        this.circlemessages = [];
        this.toMessageGroup = new CircleDM;
        this.OpenGroupChat = 0;
        this.conversationsList = [];
        this.conversations = [];
        this.refMessageDatabase = new MailingList();
        this.members = [];
        this.invitesList = [];
        this.CircleinvitesList = [];
        this.requestsList = [];
        this.invitesFromMbrs = new Member;
        this.requestsToMbrs = new Member();
        this.circlesToMbrs = [];
        this.myCircleMemberFr = new Member();
        this.projects = [];
        this.projectMbrs = [];
        this.exposts = [];
        this.expostsDetailPage = [];
        this.exploreHahsTag = new ExploreHashTag();
        //obsolete can use for email message notification
        this.expostHopOns = [];
        this.followingPosts = [];
        this.comments = [];
        this.CommentByHashtag = [];
        this.singleCommentLoad = new ExploreComment();
        this.replies = [];
        this.postHopOn = new ExploreHopOns();
        this.exPostComId = new ExploreComment();
        this.exPostReplyId = new ExploreReply();
        //for the general animation
        this.show = false;
        this.SwitchNotF = 1;
        //obsolete can use for email message notification
        this.exPostLike = new ExploreLike();
        this.likes = [];
        this.myLiked = [];
        // build profile data transfer
        this.buildUserData = new Member();
        // use for ...detailPage.component elements information transport 
        this.toProfilePage = new Member();
        this.toPostPage = new Project();
        this.toExplorePage = new ExplorePost();
        this.toExplorePageComment = new ExploreComment();
        this.exploreFromUserProfile = [];
        this.toProjectPage = new Project();
        this.projectPageMbrprojects = [];
        this.projectsFromMembersList = [];
        this.projectsFromMembersListAvatar = new Member();
        //checks sections variables 
        this.targetAddButtonView = [];
        this.sendbackBlockedCheck = 0;
        //search algrthm
        this.searchresultMember = [];
        this.searchresultProject = [];
        this.searchresultExplore = [];
        this.searchresultComment = [];
        this.searchresultCommentButton = 0;
        this.searchresultHashTag = [];
        //CircleDM
        this.toCirclePage = new CircleDM();
        this.InvitedMembersListC = [];
        this.myCircleHopOn = new CircleDMHopOns();
        this.InvitedEmailList = [];
        this.myListCircleInvited = [];
        this.myListCircle = [];
        this.myCircleDMFollowing = [];
        //use as indexIndicUserDel index of the insert statement in loadCircleDMbyIdUserDelFoll via splice function
        this.functionReturnloadCircleUserDel = new CircleDM();
        this.circlemessagessidenav = [];
        //this way we have a nice and simple remove the message before the last one 
        this.checkMsgRepeat = new NewMsgs();
        this.OpenFromNotF = 0;
        this.circleDMHopOns = [];
        //notifications
        this.notificationsExNew = 0;
        this.notificationsClsNew = 0;
        this.notificationsEx = [];
        this.notificationsCls = [];
        this.returnNotF = new Notifications();
    }
    DataService.prototype.toggle = function () {
        if (this.show == this.show) {
            this.show = !this.show;
        }
        else {
            this.show = this.show;
        }
    };
    DataService.prototype.loadMembers = function () {
        var _this = this;
        return this.http.get("/api/Members")
            .map(function (data) {
            _this.members = data;
            return true;
        });
    };
    DataService.prototype.loadProjects = function () {
        var _this = this;
        return this.http.get("/api/Projects")
            .map(function (data) {
            _this.projects = data;
            return true;
        });
    };
    DataService.prototype.loadExplorePosts = function () {
        var _this = this;
        return this.http.get("/api/ExplorePost")
            .map(function (data) {
            _this.exposts = data;
            return true;
        });
    };
    DataService.prototype.loadCircleDM = function () {
        var _this = this;
        return this.http.get("/api/circlepost/getcirclepostby", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', this.currentUser.id.toString())
                .append('includeComments', 'true')
        })
            .map(function (data) {
            _this.myListCircle = data;
            return true;
        });
    };
    DataService.prototype.loadCircleDMbyId = function (id) {
        var _this = this;
        return this.http.get("/api/circlepost/getcirclesbypostid", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
                .append('includeComments', 'true')
        })
            .map(function (data) {
            _this.myListCircleInvited.push(data);
            return true;
        });
    };
    DataService.prototype.loadCircleDMbyIdUserDelFoll = function (id) {
        var _this = this;
        return this.http.get("/api/circlepost/getcirclesbypostid", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
                .append('includeComments', 'true')
        })
            .map(function (data) {
            _this.functionReturnloadCircleUserDel = data;
            return true;
        });
    };
    DataService.prototype.getCirclePostForNotF = function (id) {
        var _this = this;
        return this.http.get("/api/circlepost/getcirclesbypostid", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
                .append('includeComments', 'true')
        })
            .map(function (data) {
            _this.toCirclePage = data;
            return true;
        });
    };
    //Messages ctrl timer
    DataService.prototype.loadMessage = function (email, senderEmail) {
        var _this = this;
        return this.http.get("/api/Messages", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('Email', email)
                .append('senderEmail', senderEmail)
        })
            .map(function (data) {
            _this.messages = data;
            return true;
        });
    };
    DataService.prototype.loadMessageCirclePost = function (newPost) {
        var _this = this;
        return this.http.get("/api/circlepostmessages", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', newPost.id.toString())
        })
            .map(function (data) {
            _this.circlemessages = data;
            return true;
        });
    };
    DataService.prototype.loadMessageCirclePostSidenav = function (newPost) {
        var _this = this;
        return this.http.get("/api/circlepostmessages", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', newPost.id.toString())
        })
            .map(function (data) {
            _this.circlemessagessidenav = data;
            return true;
        });
    };
    DataService.prototype.loadMessageConversations = function () {
        var _this = this;
        return this.http.get("/api/Messages/getConversations", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', this.currentUser.id.toString())
        })
            .map(function (data) {
            _this.conversations = data;
            return true;
        });
    };
    DataService.prototype.BlockUser = function (newMsg) {
        return this.http.post("/api/PostMessageDatabase/block", newMsg, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', this.currentUser.id.toString())
        })
            .map(function (response) {
            return true;
        });
    };
    DataService.prototype.UnBlockUser = function (newMsg) {
        return this.http.post("/api/PostMessageDatabase/unblock", newMsg, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (response) {
            return true;
        });
    };
    DataService.prototype.DeleteConversation = function (id) {
        return this.http.delete("/api/Messages/deletemgs", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.UnFollow = function (id) {
        return this.http.delete("/api/HopOn/unfollow", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.UnFollowCircleDM = function (id) {
        return this.http.delete("/api/circledmhopons/unfollow", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.Unlike = function (id) {
        return this.http.delete("/api/Likes/unlike", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.UnlikeDM = function (id) {
        return this.http.delete("/api/circledm_likes/unlike", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            return true;
        });
    };
    //public RemoveMailingList(id): Observable<boolean> {
    //    return this.http.delete("/api/Messages/removeMailing", {
    //        headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
    //        params: new HttpParams().set('id', id.toString())
    //    })
    //        .map((data: any[]) => {
    //            return true;
    //        });
    //}
    //get the latest Messages from corespondence algorithm
    DataService.prototype.RunFilterConversations = function () {
        //run filter with conversations.reverse
        this.conversationsList = this.conversations;
        this.conversationsList.reverse();
        var conversationsList2 = this.conversations;
        var i = 0;
        while (i < this.conversationsList.length) {
            for (var _i = 0, _a = this.conversationsList; _i < _a.length; _i++) {
                var value = _a[_i];
                for (var _b = 0, conversationsList2_1 = conversationsList2; _b < conversationsList2_1.length; _b++) {
                    var check = conversationsList2_1[_b];
                    if (value.uniqueCheck == check.uniqueCheck && value.newDatetimeCol > check.newDatetimeCol) {
                        this.conversations.splice(this.conversations.indexOf(check), 1);
                    }
                }
            }
            i++;
            this.conversationsList.reverse();
        }
        for (var _c = 0, _d = this.conversations; _c < _d.length; _c++) {
            var value = _d[_c];
            this.ListenClear(value);
        }
    };
    DataService.prototype.ListenClear = function (newMsg) {
        if (this.checkMsgRepeat.uniqueCheck != newMsg.uniqueCheck) {
            this.checkMsgRepeat = newMsg;
        }
        if (this.checkMsgRepeat.uniqueCheck == newMsg.uniqueCheck) {
            this.conversations.splice(this.conversations.indexOf(this.checkMsgRepeat), 1);
        }
    };
    //check if open message is blocked!!
    DataService.prototype.CheckMessagesStatusB = function (newMessage) {
        for (var _i = 0, _a = this.conversations; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.messageRef == newMessage.id && value.blocked != 0) {
                this.sendbackBlockedCheck = 1;
            }
        }
    };
    DataService.prototype.UpdateNewMsg = function (id) {
        return this.http.delete("/api/Messages/updateMsg", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.loadExPostForUserDetailP = function (newMember) {
        var _this = this;
        return this.http.get("/api/ExplorePost/getexpostsby", {
            params: new HttpParams().set('id', newMember.id.toString())
                .append('includeComments', 'true')
        })
            .map(function (data) {
            _this.expostsDetailPage = data;
            return true;
        });
    };
    DataService.prototype.loadExPostForSearchDetails = function (id) {
        var _this = this;
        return this.http.get("/api/ExplorePost/getexpostsbypostid", {
            params: new HttpParams().set('id', id.toString())
                .append('includeComments', 'true')
        })
            .map(function (data) {
            _this.toExplorePage = data;
            return true;
        });
    };
    DataService.prototype.loadHahsTagsForSearchDetails = function (id) {
        var _this = this;
        return this.http.get("/api/Comment/getrepfromComid", {
            params: new HttpParams().set('id', id.toString())
                .append('includeHashTags', 'false')
        })
            .map(function (data) {
            _this.CommentByHashtag = data;
            return true;
        });
    };
    DataService.prototype.getCommentsForEx = function (id) {
        var _this = this;
        return this.http.get("/api/comment/getcommentsbyid", {
            params: new HttpParams().set('id', id.toString())
                .append('includeHashTags', 'true')
        })
            .map(function (data) {
            _this.comments = data;
            return true;
        });
    };
    DataService.prototype.getCommentById = function (newExploreComment) {
        var _this = this;
        return this.http.get("/api/comment/getrepfromComid", {
            params: new HttpParams().set('id', newExploreComment.id.toString())
                .append('includeHashTags', 'true')
        })
            .map(function (data) {
            _this.singleCommentLoad = data;
            return true;
        });
    };
    //public getCommentsStr(value): Observable<boolean> {
    //    return this.http.get("/api/comment/getcommentsbyid", {
    //        params: new HttpParams().set('id', value)
    //            .append('includeHashTags', 'false')
    //    })
    //        .map((data: any[]) => {
    //            this.comments = data;
    //            return true;
    //        });
    //}
    DataService.prototype.getReplyForEx = function (newExploreComment) {
        var _this = this;
        return this.http.get("/api/replies/getreply", {
            params: new HttpParams().set('ToReply', newExploreComment.id.toString())
                .append('includeHashTags', 'false')
        })
            .map(function (data) {
            _this.replies = data;
            return true;
        });
    };
    Object.defineProperty(DataService.prototype, "LoginRequired", {
        //use this later on to get last login time from temp folder in used computer 
        get: function () {
            return this.token == null;
        },
        enumerable: true,
        configurable: true
    });
    DataService.prototype.checkLogin = function () {
        this.token = localStorage.getItem('auth_token');
        if (this.token != null) {
        }
    };
    DataService.prototype.ActionRegister = function (newRegister) {
        return this.http
            .post("/account/OnPostAsync", newRegister)
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.login = function (creds) {
        var _this = this;
        return this.http
            .post("/account/CreateToken", creds)
            .map(function (data) {
            _this.token = data.token;
            _this.tokenExpiration = data.expiration;
            localStorage.setItem('auth_token', data.token);
            return true;
        });
    };
    DataService.prototype.resPassword = function (newMail) {
        return this.http
            .post("/account/SendPasswordResetLinkAsync", newMail)
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.logout = function () {
        var _this = this;
        return this.http.get("/account/Logout")
            .map(function (data) {
            _this.token = "";
            localStorage.removeItem('auth_token');
            return true;
        });
    };
    DataService.prototype.GetCurrentUser = function () {
        var _this = this;
        return this.http.get("/api/MembersByUser", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.currentUser = data;
            return true;
        });
    };
    //public getIpClient(): Observable<boolean> {
    //    return this.http.get('http://api.ipify.org/?format=jsonp&callback=JSON_CALLBACK')
    //        .map((data: any) => {
    //            this.ipVar = data
    //            return true;
    //        });
    //}
    //check
    DataService.prototype.GetHopOns = function (newExplorePost) {
        var _this = this;
        return this.http.get("/api/hopon", {
            params: new HttpParams().set('id', newExplorePost.id.toString())
                .append('includeExplorePost', 'false')
        })
            .map(function (data) {
            _this.expostHopOns = data;
            return true;
        });
    };
    DataService.prototype.GetHopOnsIdIn = function (id) {
        var _this = this;
        return this.http.get("/api/hopon", {
            params: new HttpParams().set('id', id.toString())
                .append('includeExplorePost', 'false')
        })
            .map(function (data) {
            _this.expostHopOns = data;
            return true;
        });
    };
    DataService.prototype.GetCircleDMHopOns = function (id) {
        var _this = this;
        return this.http.get("/api/circledmhopons", {
            params: new HttpParams().set('id', id.toString())
                .append('includeExplorePost', 'false')
        })
            .map(function (data) {
            _this.circleDMHopOns = data;
            return true;
        });
    };
    DataService.prototype.GetFollowingPosts = function (id) {
        var _this = this;
        return this.http.get("/api/hopon", {
            params: new HttpParams().set('id', id.toString())
                .append('includeExplorePost', 'true')
        })
            .map(function (data) {
            _this.followingPosts = data;
            return true;
        });
    };
    DataService.prototype.GetFollowingCircleDMs = function (id) {
        var _this = this;
        return this.http.get("/api/circledmhopons", {
            params: new HttpParams().set('id', id.toString())
                .append('includeExplorePost', 'true')
        })
            .map(function (data) {
            _this.myCircleDMFollowing = data;
            return true;
        });
    };
    DataService.prototype.GetExLike = function (newExplorePost) {
        var _this = this;
        return this.http.get("/api/likes", {
            params: new HttpParams().set('id', newExplorePost.id.toString()).append('includeExplorePost', 'false')
        })
            .map(function (data) {
            _this.likes = data;
            return true;
        });
    };
    //Lack of time 
    DataService.prototype.GetExLikeCircle = function (newExplorePost) {
        var _this = this;
        return this.http.get("/api/circledm_likes", {
            params: new HttpParams().set('id', newExplorePost.id.toString()).append('includeExplorePost', 'false')
        })
            .map(function (data) {
            _this.likes = data;
            return true;
        });
    };
    DataService.prototype.GetExMyLiked = function (id) {
        var _this = this;
        return this.http.get("/api/likes", {
            params: new HttpParams().set('id', id.toString()).append('includeExplorePost', 'true')
        })
            .map(function (data) {
            _this.myLiked = data;
            return true;
        });
    };
    DataService.prototype.GetExMyLikedDM = function (id) {
        var _this = this;
        return this.http.get("/api/circledm_likes", {
            params: new HttpParams().set('id', id.toString()).append('includeExplorePost', 'true')
        })
            .map(function (data) {
            _this.myLiked = data;
            return true;
        });
    };
    //check
    DataService.prototype.loadInvites = function (id) {
        var _this = this;
        return this.http.get("/api/FriendRequests/myInvites", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
                .append('switchToRequestingMbr', 'false')
        })
            .map(function (data) {
            _this.invitesList = data;
            return true;
        });
    };
    DataService.prototype.loadCircleInvites = function (id) {
        var _this = this;
        return this.http.get("/api/CircleDMRequests/myCicrleInvites", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
                .append('switchToRequestingMbr', 'false')
        })
            .map(function (data) {
            _this.CircleinvitesList = data;
            return true;
        });
    };
    DataService.prototype.getNotificationsExplore = function (id) {
        var _this = this;
        return this.http.get("/api/notfexplore/getnotifications", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            _this.notificationsEx = data;
            for (var _i = 0, _a = _this.notificationsEx; _i < _a.length; _i++) {
                var value = _a[_i];
                if (value.uniqueCheck == 0) {
                    _this.notificationsExNew++;
                }
            }
            return true;
        });
    };
    DataService.prototype.getNotificationsCircle = function (id) {
        var _this = this;
        return this.http.get("/api/notfcircle/getnotifications", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            _this.notificationsCls = data;
            for (var _i = 0, _a = _this.notificationsCls; _i < _a.length; _i++) {
                var value = _a[_i];
                if (value.uniqueCheck == 0) {
                    _this.notificationsClsNew++;
                }
            }
            return true;
        });
    };
    DataService.prototype.SendNotCircle = function (newNotification) {
        return this.http.post("/api/postnotfcircle", newNotification, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (response) {
            return true;
        });
    };
    DataService.prototype.SendNotExplore = function (newNotification) {
        return this.http.post("/api/postnotfexplore", newNotification, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (response) {
            return true;
        });
    };
    DataService.prototype.deleteNotfCircle = function (id) {
        return this.http.delete("/api/NotFCircle/deletenotifications", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.DeleteNotfExplore = function (id) {
        return this.http.delete("/api/NotFExplore/deletenotifications", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.UpdateReadNotfCircle = function (newNotf) {
        var _this = this;
        return this.http.post("/api/postnotfcircle/updatenotftoread", newNotf, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.returnNotF = data;
            return true;
        });
    };
    DataService.prototype.UpdateReadNotfExplore = function (newNotF) {
        var _this = this;
        return this.http.post("/api/postnotfexplore/updatenotftoread", newNotF, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.returnNotF = data;
            return true;
        });
    };
    //notifications
    DataService.prototype.loadrequests = function (id) {
        var _this = this;
        return this.http.get("/api/FriendRequests/myInvites", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
                .append('switchToRequestingMbr', 'true')
        })
            .map(function (data) {
            _this.requestsList = data;
            return true;
        });
    };
    // we are picking member profiles ids from a list with a foreach loop => changed method in IrisRepository from IEnumerable to firstOrDefaultReturn
    DataService.prototype.selectRequestingMbr = function (id) {
        var _this = this;
        return this.http.get("/api/Members/GetMbr", {
            params: new HttpParams().set('id', id.toString())
                .append('includeProjects', 'false')
        })
            .map(function (data) {
            _this.invitesFromMbrs = data;
            return true;
        });
    };
    // it is a good idea if two get methods on one Controller give them seperate routes
    DataService.prototype.selectInvitedMbr = function (id) {
        var _this = this;
        return this.http.get("/api/Members/GetMbr", {
            params: new HttpParams().set('id', id.toString())
                .append('includeProjects', 'false')
        })
            .map(function (data) {
            _this.requestsToMbrs = data;
            return true;
        });
    };
    DataService.prototype.getMemberId = function (newMember) {
        if (this.circleUser.invitedMbr) {
            this.circleUser = new CircleUser();
        }
        this.circleUser.invitedMbr = newMember.id;
        this.circleUser.requestingMbr = this.currentUser.id;
        this.circleUser.uniqueCheck = this.currentUser.id + newMember.id;
    };
    DataService.prototype.unfriendCircleAction = function (id) {
        return this.http.delete("/api/Circles", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.DeleteProjectAction = function (id) {
        return this.http.delete("/api/Projects", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.DeleteExploreAction = function (id) {
        return this.http.delete("/api/ExplorePost", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.DeleteCircleAction = function (id) {
        return this.http.delete("/api/circlepost", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
            return true;
        });
    };
    //public getUserId(id) {
    //    if (this.circleUser.requestingMbr) {
    //        this.circleUser = new CircleUser()
    //    }
    //    this.circleUser.requestingMbr = id;
    //}
    DataService.prototype.getAcceptedMember = function (invitesFromMbrs) {
        if (this.myCircle) {
            this.myCircle = new Circle();
        }
        // the MyCircle.circleuser can be  recalled from the circleUser class
        // it was loaded with the parameter at calling getUserId above
        this.myCircle.circleUser = this.currentUser.id;
        this.myCircle.circleFriend = invitesFromMbrs.id;
        this.myCircle.uniqueCheck = this.currentUser.id + (invitesFromMbrs.id * 2) + invitesFromMbrs.id + (this.currentUser.id * 2);
    };
    DataService.prototype.getAcceptedCircleInv = function (newCircleInvite) {
        if (this.myCircleHopOn) {
            this.myCircleHopOn = new CircleDMHopOns();
        }
        // the MyCircle.circleuser can be recalled from the circleUser class
        // it was loaded with the parameter at calling getUserId above
        this.myCircleHopOn.circlePostId = newCircleInvite.postId;
        this.myCircleHopOn.memberId = newCircleInvite.invitedMbr;
        this.myCircleHopOn.uniqueCheck = newCircleInvite.postId + newCircleInvite.invitedMbr;
    };
    DataService.prototype.SendRequest = function () {
        var _this = this;
        return this.http.post("/api/postFriendRequests", this.circleUser, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (response) {
            _this.circleUser.invitedMbr;
            _this.circleUser.requestingMbr;
            return true;
        });
    };
    DataService.prototype.SendRequestCircle = function (NewInvite) {
        return this.http.post("/api/postcircledmreq", NewInvite, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (response) {
            return true;
        });
    };
    DataService.prototype.SendRequestCircleEmail = function (newMessage) {
        return this.http.post("/api/postcircledminvmail", newMessage, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (response) {
            return true;
        });
    };
    DataService.prototype.SendInviteToCircle = function () {
        var _this = this;
        return this.http.post("/api/Circles", this.myCircle, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (response) {
            //preloaded data models with values, type safety- export class values
            // are implented before this function was called
            _this.myCircle.circleUser;
            _this.myCircle.circleFriend;
            return true;
        });
    };
    DataService.prototype.SendInviteToCircleDM = function () {
        return this.http.post("/api/postcircledmhopon", this.myCircleHopOn, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (response) {
            return true;
        });
    };
    DataService.prototype.RemoveInviteFromInvts = function (id) {
        return this.http.delete("/api/FriendRequests/myInvites", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.RemoveInviteFromCircleInvReq = function (id) {
        return this.http.delete("/api/circledmrequests/myCircleInvites", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.loadcircles = function (id) {
        var _this = this;
        return this.http.get("/api/Circles", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
        })
            .map(function (data) {
            _this.circlesToMbrs = data;
            return true;
        });
    };
    DataService.prototype.selectCircleFriends = function (id) {
        var _this = this;
        return this.http.get("/api/Members/GetMbr", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('id', id.toString())
                .append('includeProjects', 'false')
        })
            .map(function (data) {
            _this.myCircleMemberFr = data;
            return true;
        });
    };
    DataService.prototype.loadProjectsForProjectPage = function (value) {
        var _this = this;
        return this.http.get("api/Projects/projectd", {
            params: new HttpParams().set('id', value.toString())
                .append('includeMember', 'false')
        })
            .map(function (data) {
            _this.projectPageMbrprojects = data;
            return true;
        });
    };
    DataService.prototype.loadProjectFromsearch = function (value) {
        var _this = this;
        return this.http.get("api/Projects/projectbySingleId", {
            params: new HttpParams().set('id', value.toString())
                .append('includeMember', 'false')
        })
            .map(function (data) {
            _this.toProjectPage = data;
            return true;
        });
    };
    DataService.prototype.loadProjectsFromMemberPage = function (newMember) {
        var _this = this;
        return this.http.get("api/Projects/projectd", {
            params: new HttpParams().set('id', newMember.id.toString())
                .append('includeMember', 'true')
        })
            .map(function (data) {
            _this.projectsFromMembersList = data;
            return true;
        });
    };
    DataService.prototype.PostNewMember = function (newMember) {
        var _this = this;
        return this.http.post("/api/PostMembers", newMember, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.currentUser.id = data.id;
            return true;
        });
    };
    DataService.prototype.UpdateMemberProfile = function (newMember) {
        var _this = this;
        return this.http.post("/api/PostMembers/updateUserProfile", newMember, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.currentUser = data;
            return true;
        });
    };
    DataService.prototype.UpdateProject = function (newProject) {
        return this.http.post("/api/PostProjects/updateProject", newProject, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.UpdateExPost = function (newExpost) {
        return this.http.post("/api/PostExplorePost/updateExpost", newExpost, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.UpdateCirclePost = function (newExpost) {
        var _this = this;
        return this.http.post("/api/postcircledm/updateCircleDM", newExpost, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.toCirclePage = data;
            return true;
        });
    };
    DataService.prototype.PostNewProject = function (newProject) {
        var _this = this;
        return this.http.post("/api/PostProjects", newProject, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            //change this to afterpost page
            _this.toProjectPage = data;
            return true;
        });
    };
    DataService.prototype.PostNewExplore = function (newExplore) {
        var _this = this;
        return this.http.post("/api/postexplorepost", newExplore, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.toExplorePage = data;
            return true;
        });
    };
    DataService.prototype.PostNewCircle = function (newPost) {
        var _this = this;
        return this.http.post("/api/postcircledM", newPost, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.toCirclePage = data;
            return true;
        });
    };
    DataService.prototype.PostNewHopOn = function (newHopOn) {
        return this.http.post("/api/posthopon", newHopOn, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.PostNewHashTag = function (newHahsTag) {
        return this.http.patch("/api/posthashtag", newHahsTag, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            return true;
        });
    };
    //check later
    DataService.prototype.PostNewComment = function (newComment) {
        var _this = this;
        return this.http.post("/api/postcomment", newComment, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.exPostComId = data;
            return true;
        });
    };
    DataService.prototype.PostNewMsgs = function (msgs) {
        return this.http.post("/api/postnewmsgs", msgs, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.PostReply = function (newReply) {
        var _this = this;
        return this.http.post("/api/postreply", newReply, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.exPostComId = data;
            return true;
        });
    };
    //check
    DataService.prototype.PostNewLike = function (newLike) {
        return this.http.post("/api/postlikes", newLike, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            return true;
        });
    };
    //check
    DataService.prototype.PostNewLikeDM = function (newLike) {
        return this.http.post("/api/postcircledmlikes", newLike, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            return true;
        });
    };
    //check
    DataService.prototype.RegisterNewComment = function (newRegisterComment) {
        return this.http.post("/api/postcommentregister", newRegisterComment, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.getsusasss = function () {
        var _this = this;
        return this.http.get("/api/Members/sksihbvd92", {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .map(function (data) {
            _this.susasssrsp = data;
            return true;
        });
    };
    DataService.prototype.reuploadFile = function (form, blobDstnt) {
        var _this = this;
        return this.http.post("/api/uploaddocument", form, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('pftpny', blobDstnt)
        })
            .map(function (data) {
            _this.fileuri.primaryUri = data.primaryUri;
            return true;
        });
    };
    //public doc: string;
    DataService.prototype.uploadFile = function (form, blobDstnt) {
        var _this = this;
        return this.http.post("/api/uploaddocument", form, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
            params: new HttpParams().set('pftpny', blobDstnt)
        })
            .map(function (data) {
            //check if backend returned an html transformed copy of the file 
            _this.fileuri.primaryUri = data.primaryUri;
            //this.doc = data;
            return true;
        });
    };
    //CHECK VARIABLES
    //remove redundant add buttons algorithm
    DataService.prototype.ValidateAddButtonInvite = function () {
        for (var _i = 0, _a = this.invitesList; _i < _a.length; _i++) {
            var value = _a[_i];
            //check if value is match and that there is no duplicate in the list for saving
            if (!this.targetAddButtonView.includes(value.invitedMbr)) {
                this.targetAddButtonView.push(value.invitedMbr);
            }
            if (!this.targetAddButtonView.includes(value.requestingMbr)) {
                this.targetAddButtonView.push(value.requestingMbr);
            }
        }
    };
    DataService.prototype.ValidateAddButtonRequest = function () {
        for (var _i = 0, _a = this.requestsList; _i < _a.length; _i++) {
            var value = _a[_i];
            //check if value is match and that there is no duplicate in the list for saving
            if (!this.targetAddButtonView.includes(value.invitedMbr)) {
                this.targetAddButtonView.push(value.invitedMbr);
            }
            if (!this.targetAddButtonView.includes(value.requestingMbr)) {
                this.targetAddButtonView.push(value.requestingMbr);
            }
        }
    };
    DataService.prototype.ValidateAddButtonCircle = function () {
        for (var _i = 0, _a = this.circlesToMbrs; _i < _a.length; _i++) {
            var value = _a[_i];
            //check if value is match and that there is no duplicate in the list for saving
            if (!this.targetAddButtonView.includes(value.circleFriend)) {
                this.targetAddButtonView.push(value.circleFriend);
            }
            if (!this.targetAddButtonView.includes(value.circleUser)) {
                this.targetAddButtonView.push(value.circleUser);
            }
        }
    };
    //MailingService
    DataService.prototype.Email = function (newEmail) {
        return this.http.post("/api/PostMessage", newEmail)
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.EmailCircleDM = function (newEmail) {
        return this.http.post("/api/postcircledmmsg", newEmail)
            .map(function (data) {
            return true;
        });
    };
    DataService.prototype.EmailRegister = function (newEmail) {
        var _this = this;
        return this.http
            .post("/api/PostMessageDatabase", newEmail)
            .map(function (data) {
            _this.refMessageDatabase = data;
            return true;
        });
    };
    DataService.prototype.SearchMember = function (terms) {
        var _this = this;
        return this.http.get("/api/Search/getMember", {
            params: new HttpParams().set('terms', terms)
        })
            .map(function (data) {
            _this.searchresultMember = data;
            return true;
        });
    };
    DataService.prototype.SearchProject = function (terms) {
        var _this = this;
        return this.http.get("/api/Search/getProject", {
            params: new HttpParams().set('terms', terms)
        })
            .map(function (data) {
            _this.searchresultProject = data;
            return true;
        });
    };
    DataService.prototype.SearchExplore = function (terms) {
        var _this = this;
        return this.http.get("/api/Search/getExplore", {
            params: new HttpParams().set('terms', terms)
        })
            .map(function (data) {
            _this.searchresultExplore = data;
            return true;
        });
    };
    DataService.prototype.SearchComment = function (terms) {
        var _this = this;
        return this.http.get("/api/Search/getComment", {
            params: new HttpParams().set('terms', terms)
        })
            .map(function (data) {
            _this.searchresultComment = data;
            return true;
        });
    };
    DataService.prototype.SearchHashTag = function (terms) {
        var _this = this;
        return this.http.get("/api/Search/getHashTag", {
            params: new HttpParams().set('terms', terms)
        })
            .map(function (data) {
            _this.searchresultHashTag = data;
            return true;
        });
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=dataService.js.map