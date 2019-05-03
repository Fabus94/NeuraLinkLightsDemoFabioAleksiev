import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/dataService';

@Component({
  selector: 'app-transition-lights-test',
  templateUrl: './transition-lightsTest.component.html',
  styleUrls: ['./transition-lightsTest.component.css']
})
export class TransitionLightsTestComponent implements OnInit {

    constructor(private data: DataService, private router: Router) { }

    ngOnInit() {
        this.router.navigate(["lights"]);
    }

}
