var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DataLights } from "./lights";
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        //PlayBack State / 0 = off, 1= playback last entry, 2= ?
        this.playBackFlag = 0;
        this.playBackModel = new DataLights();
        //Recording State / 0 = off, 1= recording, 2= recorded
        this.RecordingSt = 0;
        this.StopLoad = 0;
        //Reference Timer
        this.TenthsReflect = 0;
        //Active lights 
        this.activeLight = 0;
        //Active Lights from playlist
        this.activePlay = [];
        this.activeColour = [];
        this.activeDirection = [];
        //Light entries to the database list
        this.lightEntriesList = [];
        //Record of the last returned entry from the database
        this.lightsEntriesReturnInst = new DataLights();
        //current UI lights snapshot - this is changed on change in variables caused by user activity
        this.lightsSnapshot = new DataLights();
    }
    DataService.prototype.getAllEntriesLights = function () {
        var _this = this;
        return this.http.get("/api/lights")
            .map(function (data) {
            _this.lightEntriesList = data;
            return true;
        });
    };
    DataService.prototype.NewEntrieLights = function () {
        var _this = this;
        return this.http.post("/api/lights/newEntrie", this.lightsSnapshot)
            .map(function (data) {
            _this.lightsEntriesReturnInst = data;
            return true;
        });
    };
    DataService.prototype.UpdateEntriesLights = function (newEntrie) {
        var _this = this;
        return this.http.post("/api/lights/updateEntrie", newEntrie)
            .map(function (data) {
            _this.lightsEntriesReturnInst = data;
            return true;
        });
    };
    DataService.prototype.deleteEntrieLights = function (id) {
        return this.http.delete("/api/lights", {
            params: new HttpParams().set('id', id)
        })
            .map(function (data) {
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