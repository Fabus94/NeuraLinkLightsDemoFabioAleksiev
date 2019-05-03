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
import { DataService } from '../shared/dataService';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
var TimerControlLightsTestComponent = /** @class */ (function () {
    function TimerControlLightsTestComponent(data, router) {
        this.data = data;
        this.router = router;
        //Timer components
        this.Tenths = 0;
        this.Seconds = 0;
        this.Minutes = 0;
        this.Hours = 0;
        //List of activated squares - algorithm parameter
        this.sqActivated = [];
        //List of activated colours - algorithm parameter coresponds to sqActivated in index
        this.sqColour = [];
        //List of activated direction Tags - algorithm parameter coresponds to sqActivated in index
        this.sqDirection = [];
        //Switch timer buttons
        this.timerOn = 1;
        //Time Mechanism
        this._countdown = new Subject();
        this.isCounting = false;
    }
    TimerControlLightsTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Sync Tenths with data.Tenths
        this.Tenths = this.data.TenthsReflect;
        //Start time
        this.start(6000);
        this.countdown().subscribe(function (t) {
            _this.Tenths++;
            //Store a copy of the past Tenths for some reference
            _this.data.TenthsReflect++;
            //Timer logic
            //User UI Time
            if (_this.Tenths % 100 == 0) {
                _this.Seconds++;
                //Active Lights Ctrl
                if (_this.data.activeLight == 0) {
                    _this.data.activeLight = 1;
                }
                else if (_this.data.activeLight == 1) {
                    _this.data.activeLight = 2;
                }
                else if (_this.data.activeLight == 2) {
                    _this.data.activeLight = 3;
                }
                else if (_this.data.activeLight == 3) {
                    _this.data.activeLight = 1;
                }
                if (_this.Seconds != null && _this.Seconds % 60 == 0) {
                    _this.Minutes++;
                    _this.Seconds = 0;
                }
                if (_this.Minutes > 0 && _this.Minutes % 60 == 0) {
                    _this.Hours++;
                    _this.Minutes = 0;
                }
                //Update the list from time to time
                if (_this.Seconds % 60 == 0) {
                    _this.data.getAllEntriesLights()
                        .subscribe(function (success) {
                        if (success) {
                            //record the last entry of the list
                            _this.data.lightsEntriesReturnInst = _this.data.lightEntriesList[0];
                        }
                    });
                }
            }
            //Machine Operations Time         
            //Start drawing if playBack is activated
            if (_this.data.playBackFlag == 1) {
                if (_this.sqActivated.length == 0) {
                    var list = JSON.parse("[" + _this.data.playBackModel.algorithmParameter1 + "]");
                    var colour = JSON.parse("[" + _this.data.playBackModel.algorithmParameter2 + "]");
                    var direction = JSON.parse("[" + _this.data.playBackModel.algorithmParameter3 + "]");
                    _this.sqActivated = list;
                    _this.sqColour = colour;
                    _this.sqDirection = direction;
                    //reverese list as we will be sending bits from its which should be the begining for this use with .pop
                    _this.sqActivated.reverse();
                    _this.sqColour.reverse();
                    _this.sqDirection.reverse();
                }
                ;
                //If the last elemet in the playback is executed shutdown
                if (_this.sqActivated.length == 1) {
                    _this.BitsSend();
                    _this.data.playBackFlag = 0;
                    _this.data.PlayBackMsg = null;
                }
                ;
                if (_this.sqActivated.length > 1) {
                    _this.BitsSend();
                }
                ;
            }
            //Clear nottifications 
            if (_this.Seconds % 24 == 0 && _this.data.ControllChange != null) {
                _this.data.ControllChange = null;
            }
        });
    };
    TimerControlLightsTestComponent.prototype.BitsSend = function () {
        //Send 3 bits of drawing code per a tenth of a second
        var portion = this.sqActivated.pop();
        var portionC = this.sqColour.pop();
        var portionD = this.sqDirection.pop();
        //Preload the dependencies of ActivePlay as shape and colour before ActivePlay itself to avoid errors
        this.data.activeColour.push(portionC);
        this.data.activePlay.push(portion);
        this.data.activeDirection.push(portionD);
    };
    TimerControlLightsTestComponent.prototype.StopTimer = function () {
        this.timerOn = 0;
        this.stop();
    };
    //make use of a transition animation by navigating to a loading page and back to the timer
    TimerControlLightsTestComponent.prototype.StartTimer = function () {
        this.router.navigate(["main"]);
    };
    //Restart time function
    TimerControlLightsTestComponent.prototype.RestartTime = function () {
        this.stop();
        this.data.TenthsReflect = 0;
        this.Tenths = 0;
        this.Seconds = 0;
        this.Minutes = 0;
        this.Hours = 0;
        this.StartTimer();
    };
    TimerControlLightsTestComponent.prototype.countdown = function () {
        return this._countdown.asObservable();
    };
    TimerControlLightsTestComponent.prototype.start = function (count) {
        var _this = this;
        // Ensure that only one timer is in progress at any given time.
        if (!this.isCounting) {
            this.isCounting = true;
            timer(0, 10).pipe(takeWhile(function (t) { return t < count; }), map(function (t) { return count - t; })).subscribe(function (t) { return _this._countdown.next(t); }, null, function () {
                _this._countdown.complete();
                _this.isCounting = false;
                // Reset the countdown Subject so that a 
                // countdown can be performed more than once.
                _this._countdown = new Subject();
            });
        }
    };
    //Stop the timer
    TimerControlLightsTestComponent.prototype.stop = function () {
        this._countdown.complete();
        this.isCounting = false;
    };
    TimerControlLightsTestComponent = __decorate([
        Component({
            selector: 'app-timer-control-lights-test',
            templateUrl: './timerControl-lightsTest.component.html',
            styleUrls: ['./timerControl-lightsTest.component.css']
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], TimerControlLightsTestComponent);
    return TimerControlLightsTestComponent;
}());
export { TimerControlLightsTestComponent };
//# sourceMappingURL=timerControl-lightsTest.component.js.map