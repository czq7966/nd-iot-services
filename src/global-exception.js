"use strict";
exports.__esModule = true;
var GlobalExpcetion = /** @class */ (function () {
    function GlobalExpcetion() {
        this.uncaughtException = function (error) {
            console.error('uncaughtException:', error);
            // this.resetNamespaces();
        };
        this.unhandledRejection = function (reason, promise) {
            console.error('unhandledRejection:', reason);
            // this.resetNamespaces();
        };
        this.initEvents();
    }
    GlobalExpcetion.prototype.destroy = function () {
        this.unInitEvents();
    };
    GlobalExpcetion.prototype.initEvents = function () {
        process.on('uncaughtException', this.uncaughtException);
        process.on('unhandledRejection', this.unhandledRejection);
    };
    GlobalExpcetion.prototype.unInitEvents = function () {
        process.off('uncaughtException', this.uncaughtException);
        process.off('unhandledRejection', this.unhandledRejection);
    };
    return GlobalExpcetion;
}());

var globalExpcetion = new GlobalExpcetion();
exports.GlobalExpcetion = globalExpcetion;
