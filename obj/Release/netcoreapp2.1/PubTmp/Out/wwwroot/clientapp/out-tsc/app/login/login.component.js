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
import { Register } from "../shared/member";
import { UserEmail } from "../shared/Email";
var Login = /** @class */ (function () {
    function Login(data, router) {
        this.data = data;
        this.router = router;
        this.SwitchOffReg = 0;
        this.PasswordReset = 0;
        this.ctrlPasswordRes = "";
        this.ctrlMessage = "";
        this.errorMessage = "";
        this.passwordError = 0;
        this.loginError = "";
        this.PasswordReq = "Password must be at least 6 characters long\n    and contain one Uppercase character, one Digit and one Non-alphanumeric character from the following: ! # & ( ) \u2013[{}] : ; ', ? / *\";";
        this.passwordResEmail = new UserEmail();
        this.creds = {
            username: "",
            password: "",
        };
        this.register = new Register();
        this.intro = "https://fabioirisdata16.blob.core.windows.net/iris-app-files/Welcome_Irisearch19213_Use.pdf";
        this.ZoomVal = 1.2;
        this.reg1sendmsResPass = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <title>Password Reset IriSearchcircle</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width\">\n    <style type=\"text/css\">\n\n        /* CLIENT-SPECIFIC STYLES ------------------- */\n\n\n        /* RESET STYLES --------------------------- */\n\n\n\n        /* MOBILE STYLES ------------------------ */\n\n\n    </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr style=\"background-color:#FF2E03\">\n                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        <img src=\"https://fabioirisdata16.blob.core.windows.net:443/iris-app-files/bfc081de-90d2-466d-a3e9-80d62d24b1bb.png\" width=\"84\" height=\"84\" alt=\"IriSearchcircle\" style=\"font-family:'Dosis', sans-serif;\n    font-size: 30px; color:steelblue\" />\n                                    </td>\n                                    <td style=\"color:#FF2E03; font-family: 'Dosis', sans-serif;\n    font-size: 30px; \">\n                                        Password Reset\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td style=\" font-family: 'Dosis', sans-serif;\n    font-size: 22px;\">";
        this.reg1sendms = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <title>Email Confirm</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width\">\n    <style type=\"text/css\">\n\n        /* CLIENT-SPECIFIC STYLES ------------------- */\n\n\n        /* RESET STYLES --------------------------- */\n\n\n\n        /* MOBILE STYLES ------------------------ */\n\n\n    </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr style=\"background-color:#FF2E03\">\n                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        <img src=\"https://fabioirisdata16.blob.core.windows.net:443/iris-app-files/bfc081de-90d2-466d-a3e9-80d62d24b1bb.png\" width=\"84\" height=\"84\" alt=\"IriSearchcircle\" style=\"font-family:'Dosis', sans-serif;\n    font-size: 30px; color:steelblue\" />\n                                    </td>\n                                    <td style=\"color:#FF2E03; font-family: 'Dosis', sans-serif;\n    font-size: 30px; \">\n                                        Welcome please confirm your email\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td style=\" font-family: 'Dosis', sans-serif;\n    font-size: 22px;\">";
        this.reg2sendms = "\n                                    </td>\n                                </tr>\n                               \n\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>                                \n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                                <tr>\n                                   \n                                </tr>\n<tr>\n                                    <td>\n                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    </td>\n                                </tr>\n                              \n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <!-- LOGO/PREHEADER TEXT -->\n                    <tr>\n                        <td>\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr style=\"background-color:#FF2E03\">\n                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n\n\n    <!-- CONTAINER TABLE -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                    <tr>\n                        <td>\n                            <!-- TWO COLUMNS -->\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                <tr>\n                                    <td>\n                                        <!-- LEFT COLUMN -->\n                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"57%\" align=\"left\">\n                                            <tr>\n                                                <td>\n                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                        <tr>\n                                                            <td>\n                                                                2019 IriSearchcircle LLC All rights Reserved\n                                                            </td>\n                                                        </tr>\n                                                        <tr>\n                                                            <td>\n                                                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n                                                            </td>\n                                                        </tr>\n                                                    </table>\n                                                </td>\n                                            </tr>\n                                        </table>\n                                        <!-- RIGHT COLUMN -->\n                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"37%\" align=\"right\">\n                                            <tr>\n                                                <td class=\"mobile-column-right\">\n                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                                        <tr>\n                                                            <td></td>\n                                                        </tr>\n                                                        <tr>\n                                                            <td align=\"left\">\n                                                                <a style=\"color:#FF2E03\" href=\"https://irisearchcircle.com/contact\">Contact</a> &nbsp;&nbsp;\n\n                                                                <a style=\"color:#FF2E03\" href=\"https://irisearchcircle.com/about\">About</a>\n                                                            </td>\n                                                        </tr>\n\n                                                    </table>\n                                                </td>\n                                            </tr>\n                                        </table>\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n    <!-- FOOTER -->\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n                  \n                        <td>\n                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\">\n        <tr>\n            <td>\n                <!-- WRAPPER TABLE -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">                  \n                    <tr>\n                        <td>                          \n                            <p>Company Address Soon</p>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n\n</body>\n</html>\n\n"; /*Notice end of multi-line*/
    }
    Login.prototype.ZoomInAction = function () {
        this.ZoomVal += 0.2;
    };
    Login.prototype.ZoomOutAction = function () {
        this.ZoomVal -= 0.2;
    };
    Login.prototype.onLogin = function () {
        var _this = this;
        this.passwordError = 0;
        this.data.toggle();
        this.data.login(this.creds)
            .subscribe(function (success) {
            if (success) {
                {
                    _this.data.CountTest = 0;
                    //this.data.ShowLogo = 1;
                    _this.data.toggle();
                    _this.data.showLoginScr = 1;
                    _this.router.navigate(["/"]);
                }
            }
            else {
                _this.data.toggle();
            }
        }, function (err) { return _this.loginError = "Failed to login, please check password, username and network connection"; });
    };
    Login.prototype.onRegister = function () {
        var _this = this;
        this.data.toggle();
        this.passwordError = 0;
        this.register.message1 = this.reg1sendms;
        this.register.message2 = this.reg2sendms;
        this.data.ActionRegister(this.register)
            .subscribe(function (success) {
            if (success) {
                {
                    _this.ctrlMessage = "Welcome " + _this.register.firstName + ", a confirmation link has been sent to your email!";
                    _this.register = new Register();
                    _this.SwitchOffReg = 1;
                    _this.data.toggle();
                }
            }
        }, function (err) { return _this.passwordError = 1; });
    };
    Login.prototype.Clear = function () {
        this.passwordError = 0;
        this.register = new Register();
    };
    Login.prototype.ClearLogin = function () {
        this.creds.password = "";
        this.creds.username = "";
    };
    Login.prototype.ClearReset = function () {
        this.ctrlPasswordRes = "";
        this.PasswordReset = 0;
    };
    Login.prototype.SendLinkPass = function () {
        var _this = this;
        this.data.toggle();
        this.passwordResEmail.message2 = this.reg2sendms;
        this.passwordResEmail.message1 = this.reg1sendmsResPass;
        this.data.resPassword(this.passwordResEmail)
            .subscribe(function (success) {
            if (success) {
                {
                    _this.ctrlPasswordRes = "A password reset link has been sent to your email";
                    _this.PasswordReset = 0;
                    _this.data.toggle();
                }
            }
        }, function (err) { return _this.ctrlPasswordRes = "Error, please try again..."; });
    };
    Login.prototype.OnForgotenPassword = function () {
        this.PasswordReset = 1;
        this.ctrlPasswordRes = "Send a password reset link to your email";
    };
    Login.prototype.CheckLoginNotF = function () {
        if (this.data.showLoginScr == 1) {
            return true;
        }
    };
    Login.prototype.CheckLogoutNotF = function () {
        if (this.data.showLogoutScr == 1) {
            return true;
        }
    };
    Login = __decorate([
        Component({
            selector: "login",
            templateUrl: "login.component.html",
            styleUrls: ["login.component.css"]
        }),
        __metadata("design:paramtypes", [DataService, Router])
    ], Login);
    return Login;
}());
export { Login };
//# sourceMappingURL=login.component.js.map