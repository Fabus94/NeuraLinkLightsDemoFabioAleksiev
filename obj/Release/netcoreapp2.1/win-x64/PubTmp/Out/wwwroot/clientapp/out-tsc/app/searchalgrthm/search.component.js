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
import { FormControl } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import { ExplorePost } from "../shared/Explore";
import { Project } from "../shared/Project";
import { Member } from "../shared/member";
var SearchElement = /** @class */ (function () {
    function SearchElement(data, router) {
        this.data = data;
        this.router = router;
        this.searchresultMember = [];
        this.searchresultProject = [];
        this.searchresultExplore = [];
        this.searchresultComment = [];
        this.searchresultHashTag = [];
        this.NavSearchTerm = "";
        this.myControl = new FormControl();
        this.ZoomValDef = 1;
        this.ZoomVal = 1;
        this.ImgW = 612;
        this.ImgH = 572;
        this.ImgWDef = 612;
        this.ImgHDef = 572;
    }
    SearchElement.prototype.ngOnInit = function () {
        var _this = this;
        this.NavSearchTerm = this.data.NavSearchTerm;
        if (this.NavSearchTerm != null && this.myControl.value == null && this.data.SearchTermCheckBack == 1) {
            this.data.SearchMember(this.NavSearchTerm)
                .subscribe(function (success) {
                if (success) {
                    _this.searchresultMember = _this.data.searchresultMember;
                }
            }, function (err) { return _this.ControllMsg = "Failed to gety search"; });
            this.data.SearchProject(this.NavSearchTerm)
                .subscribe(function (success) {
                if (success) {
                    _this.searchresultProject = _this.data.searchresultProject;
                }
            }, function (err) { return _this.ControllMsg = "Failed to gety search"; });
            this.data.SearchComment(this.NavSearchTerm)
                .subscribe(function (success) {
                if (success) {
                    _this.searchresultComment = _this.data.searchresultComment;
                }
            }, function (err) { return _this.ControllMsg = "Failed to gety search"; });
            this.data.SearchExplore(this.NavSearchTerm)
                .subscribe(function (success) {
                if (success) {
                    _this.searchresultExplore = _this.data.searchresultExplore;
                }
            }, function (err) { return _this.ControllMsg = "Failed to gety search"; });
            this.data.SearchHashTag(this.NavSearchTerm)
                .subscribe(function (success) {
                if (success) {
                    _this.searchresultHashTag = _this.data.searchresultHashTag;
                }
            }, function (err) { return _this.ControllMsg = "Failed to gety search"; });
        }
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
            .subscribe(function (myControl) { return _this.data.SearchProject(myControl)
            .subscribe(function (success) {
            if (success) {
                _this.searchresultProject = _this.data.searchresultProject;
            }
        }, function (err) { return _this.ControllMsg = "Failed to gety search"; }); });
        this.myControl.valueChanges
            .pipe(debounceTime(400))
            .subscribe(function (myControl) { return _this.data.SearchComment(myControl)
            .subscribe(function (success) {
            if (success) {
                _this.searchresultComment = _this.data.searchresultComment;
            }
        }, function (err) { return _this.ControllMsg = "Failed to gety search"; }); });
        this.myControl.valueChanges
            .pipe(debounceTime(400))
            .subscribe(function (myControl) { return _this.data.SearchExplore(myControl)
            .subscribe(function (success) {
            if (success) {
                _this.searchresultExplore = _this.data.searchresultExplore;
            }
        }, function (err) { return _this.ControllMsg = "Failed to gety search"; }); });
        this.myControl.valueChanges
            .pipe(debounceTime(400))
            .subscribe(function (myControl) { return _this.data.SearchHashTag(myControl)
            .subscribe(function (success) {
            if (success) {
                _this.searchresultHashTag = _this.data.searchresultHashTag;
            }
        }, function (err) { return _this.ControllMsg = "Failed to gety search"; }); });
        this.myControl.valueChanges
            .pipe(debounceTime(400))
            .subscribe(function (myControl) { return _this.data.NavSearchTerm = ""; });
    };
    SearchElement.prototype.SearchResults = function () {
        this.data.SearchTermCheckBack = 1;
        this.data.NavSearchTerm = this.myControl.value;
        this.myControl.reset();
        this.router.navigate(["searchResult"]);
    };
    SearchElement.prototype.callRestService = function () {
    };
    SearchElement.prototype.Clear = function () {
        this.myControl.reset();
    };
    SearchElement.prototype.Listen = function () {
    };
    SearchElement.prototype.OpenLinkResVars = function () {
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.myControl.reset();
    };
    //NAV FUNCTIONS
    SearchElement.prototype.ProfilePage = function (newMember) {
        if (this.data.toProfilePage) {
            this.data.toProfilePage = new Member();
        }
        this.data.toProfilePage = newMember;
        if (this.data.toProfilePage) {
            this.data.NavBackFromProfile = "circle";
            this.OpenLinkResVars();
            this.data.NavRedirect = 5;
            if (this.data.NavRedirect == 5) {
                this.data.NavBackFromProfile = "searchResult";
                this.router.navigate(["startPage"]);
            }
        }
    };
    SearchElement.prototype.ProjectPage = function (newProject) {
        var _this = this;
        if (this.data.toProjectPage) {
            this.data.toProjectPage = new Project();
        }
        this.data.loadProjectFromsearch(newProject.id)
            .subscribe(function (success) {
            if (success) {
                _this.data.projects.push(_this.data.toProjectPage);
                if (_this.data.toProjectPage) {
                    _this.data.NavRedirect = 3;
                    _this.OpenLinkResVars();
                    if (_this.data.NavRedirect == 3) {
                        _this.data.NavBackFromProfile = "searchResult";
                        _this.router.navigate(["startPage"]);
                    }
                }
            }
        });
    };
    SearchElement.prototype.ExplorePage = function (newExplore) {
        var _this = this;
        if (this.data.toExplorePage) {
            this.data.toExplorePage = new ExplorePost();
        }
        if (this.data.exposts) {
            this.data.exposts = [];
        }
        this.data.OpenFromNotF = 0;
        this.data.loadExPostForSearchDetails(newExplore.id)
            .subscribe(function (success) {
            if (success) {
                _this.data.exposts.push(_this.data.toExplorePage);
                if (_this.data.toExplorePage) {
                    _this.data.NavRedirect = 4;
                    _this.OpenLinkResVars();
                    if (_this.data.NavRedirect == 4) {
                        _this.data.NavBackFromProfile = "searchResult";
                        _this.router.navigate(["startPage"]);
                    }
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to get search"; });
    };
    SearchElement.prototype.CommentsData = function (newComment) {
        var _this = this;
        this.data.loadExPostForSearchDetails(newComment.issueingId)
            .subscribe(function (success) {
            if (success) {
                _this.data.exposts.push(_this.data.toExplorePage);
                if (_this.data.toExplorePage) {
                    _this.data.NavRedirect = 4;
                    _this.OpenLinkResVars();
                    if (_this.data.NavRedirect == 4) {
                        _this.data.NavBackFromProfile = "searchResult";
                        _this.router.navigate(["startPage"]);
                    }
                }
            }
        }, function (err) { return _this.ControllMsg = "Failed to get search"; });
    };
    SearchElement.prototype.HashTagData = function (newHashtag) {
        var _this = this;
        if (newHashtag.isueingComment > 0) {
            this.data.loadHahsTagsForSearchDetails(newHashtag.isueingComment)
                .subscribe(function (success) {
                if (success) {
                    for (var _i = 0, _a = _this.data.CommentByHashtag; _i < _a.length; _i++) {
                        var f = _a[_i];
                        _this.data.loadExPostForSearchDetails(f.issueingId)
                            .subscribe(function (success) {
                            _this.data.exposts.push(_this.data.toExplorePage);
                            if (_this.data.toExplorePage) {
                                _this.data.NavRedirect = 4;
                                _this.OpenLinkResVars();
                                if (_this.data.NavRedirect == 4) {
                                    _this.data.NavBackFromProfile = "searchResult";
                                    _this.router.navigate(["startPage"]);
                                }
                            }
                        }, function (err) { return _this.ControllMsg = "Failed to get search"; });
                    }
                }
            }, function (err) { return _this.ControllMsg = "Failed to get search"; });
        }
        else if (newHashtag.issueingPost > 0) {
            if (this.data.toExplorePage) {
                this.data.toExplorePage = new ExplorePost();
            }
            this.data.loadExPostForSearchDetails(newHashtag.issueingPost)
                .subscribe(function (success) {
                _this.data.exposts.push(_this.data.toExplorePage);
                if (_this.data.toExplorePage) {
                    _this.data.NavRedirect = 4;
                    _this.OpenLinkResVars();
                    if (_this.data.NavRedirect == 4) {
                        _this.data.NavBackFromProfile = "searchResult";
                        _this.router.navigate(["startPage"]);
                    }
                }
            }, function (err) { return _this.ControllMsg = "Failed to get search"; });
        }
    };
    SearchElement.prototype.CheckGen = function () {
        if (this.data.SearchTermCheckBack == 1) {
            return true;
        }
    };
    SearchElement.prototype.CheckGOBack = function () {
        var searchRes = document.getElementById("PdfViewer-Master-Wrapper_SearchRes");
        var ratio = document.getElementById("responsive-wrapper-wxh-572x612_SearchRes");
        if (this.data.SearchTermCheckBack == 1) {
            searchRes.style.width = window.innerWidth.toString() + "px";
            searchRes.style.height = window.innerHeight.toString() + "px";
            searchRes.style.opacity = "0.99";
            ratio.style.paddingBottom = "37%";
            return true;
        }
        else {
            searchRes.style.width = "572px";
            searchRes.style.height = "612px";
            ratio.style.paddingBottom = "107%";
            searchRes.style.opacity = "0.95";
            return false;
        }
    };
    SearchElement.prototype.GoBack = function () {
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.myControl.reset();
        this.router.navigate(["circle"]);
    };
    SearchElement.prototype.CheckMain = function () {
        if (this.searchresultMember.length > 0 ||
            this.searchresultProject.length > 0 ||
            this.searchresultExplore.length > 0 ||
            this.searchresultComment.length > 0 ||
            this.searchresultHashTag.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    SearchElement.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    SearchElement.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    SearchElement.prototype.OpenFull = function (newExplorePost) {
        if (this.data.DocumentFull) {
            this.data.DocumentFull = "";
        }
        this.data.DocumentFull = newExplorePost.document;
        if (this.data.DocumentFull) {
            this.data.NavBackFromProfile = "projects";
            this.router.navigate(["docfull"]);
        }
    };
    SearchElement.prototype.ZoomInImg = function () {
        this.ImgW *= 1.2;
        this.ImgH *= 1.2;
    };
    SearchElement.prototype.ZoomOutImg = function () {
        this.ImgW /= 1.2;
        this.ImgH /= 1.2;
    };
    SearchElement.prototype.ReturnParameterPdf = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ZoomVal;
        }
        else {
            return this.ZoomValDef;
        }
    };
    SearchElement.prototype.ReturnParameterImgW = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgW;
        }
        else {
            return this.ImgWDef;
        }
    };
    SearchElement.prototype.ReturnParameterImgH = function (newPost) {
        if (this.PostClicked == newPost.id) {
            return this.ImgH;
        }
        else {
            return this.ImgHDef;
        }
    };
    SearchElement.prototype.AddPostClick = function (newPost) {
        if (newPost.id != this.PostClicked) {
            this.ImgW = this.ImgWDef;
            this.ImgH = this.ImgHDef;
            this.ZoomVal = this.ZoomValDef;
            this.PostClicked = newPost.id;
        }
    };
    SearchElement = __decorate([
        Component({
            selector: "search-element",
            templateUrl: "search.component.html",
            styleUrls: ["search.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], SearchElement);
    return SearchElement;
}());
export { SearchElement };
/* ngOnInit() {
this.queryField.valueChanges
.debounceTime(200)
.distinctUntilChanged()
.switchMap((query) =>  this._searchService.search(query))
.subscribe( result => { if (result.status === 400) { return; } else {   this.results = result.json().artists.items; }
});
}
}
*/ 
//# sourceMappingURL=search.component.js.map