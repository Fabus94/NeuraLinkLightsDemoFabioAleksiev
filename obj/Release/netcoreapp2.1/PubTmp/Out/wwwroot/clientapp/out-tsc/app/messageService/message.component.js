//import { Component, OnInit } from "@angular/core";
//import { DataService } from "../shared/dataService";
//import { Router } from "@angular/router";
//import { MailingList, NewMsgs } from "../shared/Email";
//import { Member } from "../shared/member";
//import { DomSanitizer } from "@angular/platform-browser";
//@Component({
//    selector: "message-service",
//    templateUrl: "message.component.html",
//    styleUrls: ["message.component.css"]
//})
//export class MessagePage implements OnInit{
//    constructor(private data: DataService, private router: Router, private sanitizer: DomSanitizer) {
//    }
//    //ControllMsg
//    ControllMsg: string = "";
//    MssMsg: string = "";
//    UploadMsg: string = "";
//    public mailS: MailingList = new MailingList();
//    currentUser: Member = new Member();
//    toMessage: Member = new Member();
//    messages: MailingList[] = [];
//    selectedFiles: File = null;
//    sendbackBlockedCheck: number = 0;
//    ngOnInit(): void {
//    }
//    PostMessage() {
//        this.mailS.email = this.toMessage.email;
//        this.mailS.senderEmail = this.currentUser.email;
//        this.mailS.document = this.data.fileuri.primaryUri;
//        this.mailS.senderRef = this.currentUser.id;
//        this.mailS.uniqueCheck = this.currentUser.id + this.toMessage.id;
//        //this.data.Email(this.mailS)
//        //    .subscribe(success => {
//        //        if (success) {
//        //            this.mailS = new MailingList();
//                    this.data.EmailRegister(this.mailS)
//                        .subscribe(success => {
//                            if (success) {
//                                var sendMsgVal: NewMsgs = new NewMsgs();
//                                sendMsgVal.messageRef = this.data.refMessageDatabase.id
//                                sendMsgVal.recipientRef = this.toMessage.id;
//                                sendMsgVal.openedread = 1;
//                                sendMsgVal.uniqueCheck = this.currentUser.id + this.toMessage.id;
//                                this.data.PostNewMsgs(sendMsgVal)
//                                    .subscribe(success => {
//                                        if (success) {
//                                            this.mailS = new MailingList();
//                                            this.data.loadMessage(this.toMessage.email, this.currentUser.email)
//                                                .subscribe(success => {
//                                                    if (success) {
//                                                        this.data.loadMessageConversations()
//                                                            .subscribe(success => {
//                                                                if (success) {
//                                                                    this.data.RunFilterConversations();
//                                                                }
//                                                            });
//                                                    }
//                                                });
//                                        }
//                                    });
//                            }
//                        });
//            //    }
//            //}, err => this.MssMsg = "Network error, please try again");
//    }
//    Clear() {
//        this.mailS = new MailingList();
//        this.data.MessCtrl = 0;
//    }
//    ProfilePage(newMember: Member) {
//        if (this.data.toProfilePage) {
//            this.data.toProfilePage = new Member()
//        }
//        //we are moving the project.member to the profilePage view
//        this.data.toProfilePage = newMember
//        if (this.data.toProjectPage) {
//            this.router.navigate(["profile"]);
//        }
//    }
//    //implementing a listen check and elements import from data service => use instead of onInit in selector intialized components
//    Listen() {
//        if (this.data.MessCtrl == 1) {
//            this.currentUser = this.data.currentUser;
//            this.toMessage = this.data.toMessage;
//            this.messages = this.data.messages;
//            this.sendbackBlockedCheck = this.data.sendbackBlockedCheck;
//            return true;
//        } else {
//            return false;
//        }
//    }
//    uploadSelectProject(event) {
//        this.selectedFiles = <File>event.target.files[0];
//    }
//    FileUploadRun() {
//        if (this.selectedFiles) {
//            //spec blob storage folder
//            var blobDstnt = "accounts-projects"
//            const formData = new FormData();
//            formData.append('filemy', this.selectedFiles, this.selectedFiles.name);
//            // form data submit
//            this.data.uploadFile(formData, blobDstnt)
//                .subscribe(success => {
//                    if (success) {
//                        this.UploadMsg = "File upload Success!";
//                    }
//                }, err => this.UploadMsg = "File upload failed, please try again");
//        }
//    }
//    public getSantizeUrl(url: string) {
//        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//    }
//}
//# sourceMappingURL=message.component.js.map