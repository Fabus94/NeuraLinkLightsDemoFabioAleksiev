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
var TransitionLightsTestComponent = /** @class */ (function () {
    function TransitionLightsTestComponent(data, router) {
        this.data = data;
        this.router = router;
    }
    TransitionLightsTestComponent.prototype.ngOnInit = function () {
        this.router.navigate(["lights"]);
    };
    TransitionLightsTestComponent = __decorate([
        Component({
            selector: 'app-transition-lights-test',
            templateUrl: './transition-lightsTest.component.html',
            styleUrls: ['./transition-lightsTest.component.css']
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], TransitionLightsTestComponent);
    return TransitionLightsTestComponent;
}());
export { TransitionLightsTestComponent };
//# sourceMappingURL=transition-lightsTest.component.js.map