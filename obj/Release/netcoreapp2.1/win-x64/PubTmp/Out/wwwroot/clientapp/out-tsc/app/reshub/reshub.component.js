var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/dataService';
import { Susasss } from '../shared/member';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CountdownService } from '../shared/Timer';
var Reshub = /** @class */ (function () {
    function Reshub(countdownService, data, router) {
        this.countdownService = countdownService;
        this.data = data;
        this.router = router;
        this.hideButtonM = 1;
    }
    //lv1
    Reshub.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data.CountStarted == 0) {
            this.data.CountStarted = 1;
            this.countdownService.start(6000);
            this.countdownService.countdown().subscribe(function (t) {
                _this.data.CountTest++;
                if (_this.CheckLogin) {
                    if (_this.data.CountTest > 2700) {
                        _this.data.showLogoutScr = 1;
                        _this.LogOut();
                    }
                }
                if (_this.data.showLoginScr == 1) {
                    if (_this.data.CountTest > 15) {
                        _this.data.showLoginScr = 0;
                    }
                }
                if (_this.data.showLogoutScr == 1) {
                    if (_this.data.CountTest > 30) {
                        _this.data.showLogoutScr = 0;
                    }
                }
            });
        }
        if (this.data.NavRedirect == 0) {
            this.data.getsusasss()
                .subscribe(function (success) {
                if (success) {
                    _this.router.navigate(["circlesC"]);
                }
            }, function (err) { return _this.router.navigate(["login"]); });
        }
        if (this.data.NavRedirect == 1) {
            this.data.NavBackFromProfile = "messages";
            this.router.navigate(["docfull"]);
        }
        if (this.data.NavRedirect == 7) {
            this.data.NavBackFromProfile = "circlesC";
            this.router.navigate(["docfull"]);
        }
        if (this.data.NavRedirect == 3) {
            this.router.navigate(["projects"]);
        }
        if (this.data.NavRedirect == 4) {
            this.router.navigate(["exploreposts"]);
        }
        if (this.data.NavRedirect == 5) {
            this.router.navigate(["profile"]);
        }
        if (this.data.NavRedirect == 6) {
            this.router.navigate(["aftercicrlepost"]);
        }
        if (this.data.NavRedirect == 10) {
            this.router.navigate(["circleNotF"]);
        }
    };
    Reshub.prototype.CloseNotF = function () {
        this.data.showLoginScr = 0;
        this.data.showLogoutScr = 0;
    };
    Reshub.prototype.HideButtons = function () {
        if (this.hideButtonM == 1) {
            this.hideButtonM = 0;
        }
        else {
            this.hideButtonM = 1;
        }
    };
    Reshub.prototype.Listen = function () {
        var main = document.getElementById("MyMain");
        var head = document.getElementById("header");
        if (this.data.MessCtrl == 1 && this.CheckLogin() || this.data.OpenSienavInvites == 1 && this.CheckLogin() || this.data.OpenGroupChat == 1 && this.CheckLogin()) {
            main.style.marginLeft = "306px";
            head.style.marginLeft = "306px";
            main.style.transition = "0.5s";
            head.style.transition = "0.5s";
            return true;
        }
        else {
            main.style.marginLeft = "0";
            head.style.marginLeft = "0";
            return false;
        }
    };
    Object.defineProperty(Reshub.prototype, "stateName", {
        get: function () {
            return this.data.show ? 'contra' : 'spin';
        },
        enumerable: true,
        configurable: true
    });
    //NAVBAR 
    Reshub.prototype.OnCreateCircle = function () {
        this.router.navigate(["circlesC"]);
    };
    Reshub.prototype.OnCircle = function () {
        this.router.navigate(["circle"]);
    };
    Reshub.prototype.OnProjects = function () {
        this.router.navigate(["projects"]);
    };
    Reshub.prototype.OnExplore = function () {
        this.router.navigate(["exploreposts"]);
    };
    Reshub.prototype.OnConversations = function () {
        this.router.navigate(["messages"]);
    };
    Reshub.prototype.LogOut = function () {
        var _this = this;
        this.data.logout()
            .subscribe(function (success) {
            if (success) {
                _this.data.susasssrsp = new Susasss();
                _this.data.CountTest = 0;
                _this.router.navigate(["login"]);
            }
        });
    };
    Reshub.prototype.Login = function () {
        this.router.navigate(["login"]);
    };
    Reshub.prototype.CheckLogin = function () {
        if (this.data.susasssrsp.email != null) {
            return true;
        }
        else {
            return false;
        }
    };
    Reshub.prototype.CheckNewConverstions = function () {
        for (var _i = 0, _a = this.data.conversations; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.openedread == 1 && value.recipientRef == this.data.currentUser.id && value.mailingList.senderRef != this.data.currentUser.id) {
                return true;
            }
        }
    };
    Reshub.prototype.GetName = function () {
        return this.data.susasssrsp.firstName;
    };
    Reshub.prototype.SettingsCircle = function () {
        if (this.OpenSettingsCircleP == 1) {
            this.OpenSettingsCircleP = 0;
        }
        else {
            this.OpenSettingsCircleP = 1;
        }
    };
    //PostingOptions
    Reshub.prototype.PostCircle = function () {
        this.data.CheckPostingOptions = 1;
        this.SettingsCircle();
    };
    Reshub.prototype.PostProject = function () {
        this.data.CheckPostingOptions = 3;
        this.SettingsCircle();
    };
    Reshub.prototype.PostExplore = function () {
        this.data.CheckPostingOptions = 2;
        this.SettingsCircle();
    };
    Reshub.prototype.CheckPostCircle = function () {
        if (this.data.CheckPostingOptions == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Reshub.prototype.CheckPostExplore = function () {
        if (this.data.CheckPostingOptions == 2) {
            return true;
        }
        else {
            return false;
        }
    };
    Reshub.prototype.CheckPostProject = function () {
        if (this.data.CheckPostingOptions == 3) {
            return true;
        }
        else {
            return false;
        }
    };
    Reshub.prototype.Time = function () {
        return this.data.CountTest;
    };
    Reshub.prototype.CheckLoginNotF = function () {
        if (this.data.showLoginScr == 1) {
            return true;
        }
    };
    Reshub.prototype.CheckLogoutNotF = function () {
        if (this.data.showLogoutScr == 1) {
            return true;
        }
    };
    Reshub = __decorate([
        Component({
            selector: "the-Rhub",
            templateUrl: "reshub.component.html",
            styleUrls: ["reshub.component.css"],
            animations: [
                trigger('photoState', [
                    state('contra', style({
                        transform: 'rotate(0)',
                    })),
                    state('spin', style({
                        transform: 'rotate(180deg)',
                    })),
                    transition('spin => contra', [style({ transform: 'rotate(-1080deg)' }), animate('60000ms ease-out')]),
                    transition('contra => spin', [style({ transform: 'rotate(10deg)' }), animate('300ms ease-in')])
                ])
            ]
        })
        //USE page for Redirection execeptional cases and RedirectionHub
        ,
        __metadata("design:paramtypes", [CountdownService, DataService, Router])
    ], Reshub);
    return Reshub;
}());
export { Reshub };
//# sourceMappingURL=reshub.component.js.map