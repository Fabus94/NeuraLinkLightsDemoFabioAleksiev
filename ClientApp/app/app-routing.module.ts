import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: 'main', component: AppComponent },
            { path: '**', component: PageNotFoundComponent }
        ],{ useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
