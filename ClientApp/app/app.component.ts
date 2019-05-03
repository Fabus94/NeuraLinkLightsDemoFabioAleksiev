import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/dataService';
import { Router } from '@angular/router';
import { slideInAnimation } from './app.animations';

@Component({
    selector: 'my-reshub',
    templateUrl: "./app.component.html",
    animations: [slideInAnimation]
   
})

export class AppComponent implements OnInit {
   
    constructor(private data: DataService, private router: Router) {
    }
    //ControllMsg
    ControllMsg: string = "";

    ngOnInit(): void {
        this.router.navigate(["lights"]);
      
        
    }    


}