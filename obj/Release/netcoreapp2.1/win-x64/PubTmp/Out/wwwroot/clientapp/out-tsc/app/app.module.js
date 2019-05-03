var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MembersList } from "./reshub/memberList.component";
import { DataService } from "./shared/dataService";
import { RouterModule } from "@angular/router";
import { Reshub } from "./reshub/reshub.component";
import { Project } from './projects/project.component';
import { Login } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Profile } from "./detailPages/profilePage.component";
import { Document } from "./detailPages/document.component";
import { ProjectList } from './projects/projectList.component';
import { ProjectPage } from './detailPages/projectPage.component';
import { userProfilePage } from './detailPages/userProfilePage.component';
import { ProjectsFromMembers } from './detailPages/fromMbrsProjectView.component';
import { BlobModule } from 'angular-azure-blob-service';
import { PostProject } from './projects/PostProject.component';
import { ExploreStart } from './Explore/explore.component';
import { ExploreList } from './Explore/exploreList.component';
import { PostExplore } from './Explore/PostExplore.component';
import { AfterExplorePost } from './detailPages/AfterExplorePost.component';
import { messageMainPage } from './messageService/messageMain.component';
import { userUI } from './userInterfacectrl/userInterface.component';
import { SearchElement } from './searchalgrthm/search.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MsgInterComp } from './messageService/MsgInter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CircleList } from './circleService/circleSList.component';
import { PostCircle } from './circleService/PostCircleS.component';
import { CircleStart } from './circleService/circleS.component';
import { AfterCirclePost } from './detailPages/AfterCirclePost.component';
import { CircleSingle } from './circleService/circleSingleView.component';
import { CountdownService } from './shared/Timer';
var routes = [
    { path: "", component: AppComponent },
    { path: "startPage", component: Reshub },
    { path: "circle", component: MembersList },
    { path: "login", component: Login },
    { path: "projectindiv", component: ProjectPage },
    { path: "projects", component: Project },
    { path: "profile", component: Profile },
    { path: "myprofile", component: userProfilePage },
    { path: "projectsmbr", component: ProjectsFromMembers },
    { path: "postproject", component: PostProject },
    { path: "exploreposts", component: ExploreStart },
    { path: "postexplorepst", component: PostExplore },
    { path: "aftercicrlepost", component: AfterCirclePost },
    { path: "afterexplorepost", component: AfterExplorePost },
    { path: "messages", component: messageMainPage },
    { path: "docfull", component: Document },
    { path: "circlesC", component: CircleStart },
    { path: "searchResult", component: SearchElement },
    { path: "circleNotF", component: CircleSingle }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                MembersList,
                Reshub,
                ProjectList,
                Project,
                Login,
                ProjectPage,
                Profile,
                userProfilePage,
                ProjectsFromMembers,
                PostProject,
                ExploreStart,
                ExploreList,
                PostExplore,
                AfterExplorePost,
                messageMainPage,
                userUI,
                SearchElement,
                MsgInterComp,
                Document,
                CircleList,
                PostCircle,
                CircleStart,
                AfterCirclePost,
                CircleSingle
            ],
            imports: [
                BlobModule.forRoot(),
                BrowserModule,
                BrowserAnimationsModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                PdfViewerModule,
                RouterModule.forRoot(routes, {
                    useHash: true,
                    enableTracing: false // for Debugging of the Routes
                })
            ],
            providers: [
                DataService,
                CountdownService
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map