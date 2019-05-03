var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
var CountdownService = /** @class */ (function () {
    function CountdownService() {
        this._countdown = new Subject();
        this.isCounting = false;
    }
    CountdownService.prototype.countdown = function () {
        return this._countdown.asObservable();
    };
    CountdownService.prototype.start = function (count) {
        var _this = this;
        // Ensure that only one timer is in progress at any given time.
        if (!this.isCounting) {
            this.isCounting = true;
            timer(0, 1000).pipe(takeWhile(function (t) { return t < count; }), map(function (t) { return count - t; })).subscribe(function (t) { return _this._countdown.next(t); }, null, function () {
                _this._countdown.complete();
                _this.isCounting = false;
                // Reset the countdown Subject so that a 
                // countdown can be performed more than once.
                _this._countdown = new Subject();
            });
        }
    };
    CountdownService = __decorate([
        Injectable()
    ], CountdownService);
    return CountdownService;
}());
export { CountdownService };
//# sourceMappingURL=Timer.js.map