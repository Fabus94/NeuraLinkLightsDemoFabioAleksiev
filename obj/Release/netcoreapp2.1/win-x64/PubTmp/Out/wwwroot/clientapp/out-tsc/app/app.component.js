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
import { DataService } from './shared/dataService';
import { Router } from '@angular/router';
import { Member, Susasss } from './shared/member';
var AppComponent = /** @class */ (function () {
    function AppComponent(data, router) {
        this.data = data;
        this.router = router;
        this.susasssrsp = new Susasss();
        this.currentUser = new Member();
        this.controlMsg = "";
        //ControllMsg
        this.ControllMsg = "";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.show = this.data.show;
        this.data.checkLogin();
        //lv1
        this.data.getsusasss()
            .subscribe(function (success) {
            if (success) {
            }
        });
        this.data.GetCurrentUser()
            .subscribe(function (success) {
            if (success) {
                _this.ControllMsg = "Welcome";
                _this.currentUser = _this.data.currentUser;
                _this.data.buildProfileBolDeclare = 1;
                if (_this.currentUser.id != 0) {
                    //lv3
                    _this.data.loadInvites(_this.currentUser.id)
                        .subscribe(function (success) {
                        if (success) {
                            _this.data.ValidateAddButtonInvite();
                            //lv4
                            _this.data.loadrequests(_this.currentUser.id)
                                .subscribe(function (success) {
                                if (success) {
                                    _this.data.ValidateAddButtonRequest();
                                    //lv5
                                    _this.data.loadcircles(_this.currentUser.id)
                                        .subscribe(function (success) {
                                        if (success) {
                                            _this.data.ValidateAddButtonCircle();
                                            _this.data.loadMessageConversations()
                                                .subscribe(function (success) {
                                                if (success) {
                                                    _this.data.RunFilterConversations();
                                                    _this.data.loadCircleInvites(_this.currentUser.id)
                                                        .subscribe(function (success) {
                                                        if (success) {
                                                            _this.data.getNotificationsCircle(_this.currentUser.id)
                                                                .subscribe(function (success) {
                                                                if (success) {
                                                                    _this.data.getNotificationsExplore(_this.currentUser.id)
                                                                        .subscribe(function (success) {
                                                                        if (success) {
                                                                            _this.router.navigate(["startPage"]);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }, function (err) { return _this.router.navigate(["exploreposts"]); });
                                }
                            }, function (err) { return _this.router.navigate(["exploreposts"]); });
                        }
                    }, function (err) { return _this.router.navigate(["exploreposts"]); });
                }
            }
        }, function (err) { return "Network failure, please retry"; });
        this.router.navigate(["exploreposts"]);
    };
    AppComponent = __decorate([
        Component({
            selector: 'my-reshub',
            templateUrl: "./app.component.html"
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map