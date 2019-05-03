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
var CircleStart = /** @class */ (function () {
    function CircleStart(data, router) {
        this.data = data;
        this.router = router;
        //ControllMsg
        this.ControllMsg = "";
    }
    CircleStart.prototype.ngOnInit = function () {
    };
    CircleStart = __decorate([
        Component({
            selector: "explore",
            templateUrl: "circleS.component.html",
            styleUrls: ["circleS.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], CircleStart);
    return CircleStart;
}());
export { CircleStart };
//# sourceMappingURL=circleS.component.js.map