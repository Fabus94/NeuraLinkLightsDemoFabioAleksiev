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
//check
var ExplorePageFromProfile = /** @class */ (function () {
    function ExplorePageFromProfile(data, router) {
        this.data = data;
        this.router = router;
        //initlz the general variables
        this.ControllMsg = "";
        this.exploreFromUserProfile = [];
    }
    ExplorePageFromProfile.prototype.ngOnInit = function () {
        this.data.SearchTermCheckBack = 0;
        this.data.NavSearchTerm = "";
        this.exploreFromUserProfile = this.data.exploreFromUserProfile;
    };
    ExplorePageFromProfile.prototype.BackFromMyProfile = function () {
        this.router.navigate(["/"]);
    };
    ExplorePageFromProfile.prototype.CheckPDF = function (check) {
        if (check.search(".pdf") > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ExplorePageFromProfile = __decorate([
        Component({
            selector: "exploredetail-page",
            templateUrl: "ExplorePageFromProfile.component.html",
            styleUrls: ["ExplorePageFromProfile.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], ExplorePageFromProfile);
    return ExplorePageFromProfile;
}());
export { ExplorePageFromProfile };
//check
//# sourceMappingURL=ExplorePageFromProfile.component.js.map