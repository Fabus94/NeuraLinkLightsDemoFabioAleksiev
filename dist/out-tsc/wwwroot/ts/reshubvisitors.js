var ReshubVisitor = /** @class */ (function () {
    function ReshubVisitor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.visits = 0;
    }
    ReshubVisitor.prototype.showName = function () {
        alert(this.firstName + " " + this.lastName);
    };
    Object.defineProperty(ReshubVisitor.prototype, "name", {
        get: function () {
            return this.ourName;
        },
        set: function (val) {
            this.ourName = val;
        },
        enumerable: true,
        configurable: true
    });
    return ReshubVisitor;
}());
//# sourceMappingURL=reshubvisitors.js.map