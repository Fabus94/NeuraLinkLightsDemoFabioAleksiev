import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/dataService';
import { Router } from '@angular/router';
import { Subject, Observable, timer } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

@Component({
  selector: 'app-timer-control-lights-test',
    templateUrl: './timerControl-lightsTest.component.html',
    styleUrls: ['./timerControl-lightsTest.component.css']
})

export class TimerControlLightsTestComponent implements OnInit {

    constructor(private data: DataService, private router: Router) { }


    //Timer components
    Tenths: number = 0;
    Seconds: number = 0;
    Minutes: number = 0;
    Hours: number = 0;

    //List of activated squares - algorithm parameter
    sqActivated = [];

     //List of activated colours - algorithm parameter coresponds to sqActivated in index
    sqColour = [];

     //List of activated direction Tags - algorithm parameter coresponds to sqActivated in index
    sqDirection = [];

    //Switch timer buttons
    timerOn: number = 1;

    ngOnInit() {
        //Sync Tenths with data.Tenths
        this.Tenths = this.data.TenthsReflect
          
        //Start time
        this.start(6000);
        this.countdown().subscribe(t => {

           
            this.Tenths++
            //Store a copy of the past Tenths for some reference
            this.data.TenthsReflect++

            //Timer logic

            //User UI Time
            if (this.Tenths % 100 == 0) {
                this.Seconds++

                //Active Lights Ctrl
                if (this.data.activeLight == 0) {
                    this.data.activeLight = 1;
                } else if (this.data.activeLight == 1) {
                    this.data.activeLight = 2;
                } else if (this.data.activeLight == 2) {
                    this.data.activeLight = 3;
                } else if (this.data.activeLight == 3) {
                    this.data.activeLight = 1;
                }

                if (this.Seconds != null && this.Seconds % 60 == 0) {
                    this.Minutes++;
                    this.Seconds = 0;

                }

                if (this.Minutes > 0 && this.Minutes % 60 == 0) {
                    this.Hours++;
                    this.Minutes = 0;
                }

                //Update the list from time to time
                if (this.Seconds % 60 == 0) {
                    this.data.getAllEntriesLights()
                        .subscribe(success => {
                            if (success) {
                                //record the last entry of the list
                                this.data.lightsEntriesReturnInst = this.data.lightEntriesList[0];
                            }
                        });
                }
               



            }

           
            //Machine Operations Time         
           
            //Start drawing if playBack is activated
            if (this.data.playBackFlag == 1) {
                if (this.sqActivated.length == 0) {
                    var list = JSON.parse("[" + this.data.playBackModel.algorithmParameter1 + "]");
                    var colour = JSON.parse("[" + this.data.playBackModel.algorithmParameter2 + "]");
                    var direction = JSON.parse("[" + this.data.playBackModel.algorithmParameter3 + "]");
                    this.sqActivated = list;
                    this.sqColour = colour;
                    this.sqDirection = direction

                    //reverese list as we will be sending bits from its which should be the begining for this use with .pop
                    this.sqActivated.reverse();
                    this.sqColour.reverse();
                    this.sqDirection.reverse();


                };
                //If the last elemet in the playback is executed shutdown
                if (this.sqActivated.length == 1) {
                    this.BitsSend();
                    this.data.playBackFlag = 0;
                    this.data.PlayBackMsg = null;
                };

                if (this.sqActivated.length > 1) {
                    this.BitsSend();
                };


            }
            //Clear nottifications 
            if (this.Seconds % 24 == 0 && this.data.ControllChange != null) {
                this.data.ControllChange = null;
            }


        });
    }

    BitsSend() {

        //Send 3 bits of drawing code per a tenth of a second
        var portion = this.sqActivated.pop();
        var portionC = this.sqColour.pop();
        var portionD = this.sqDirection.pop();

        //Preload the dependencies of ActivePlay as shape and colour before ActivePlay itself to avoid errors
        this.data.activeColour.push(portionC);
        this.data.activePlay.push(portion);
        this.data.activeDirection.push(portionD);
        
    }

    StopTimer() {
        this.timerOn = 0;
        this.stop();
    }

    //make use of a transition animation by navigating to a loading page and back to the timer
    StartTimer() {
        this.router.navigate(["main"]);
    }

    //Restart time function
    RestartTime() {
        this.stop();
        this.data.TenthsReflect = 0;
        this.Tenths = 0;
        this.Seconds = 0;
        this.Minutes = 0;
        this.Hours = 0;
        this.StartTimer();
    }

    //Time Mechanism
    private _countdown = new Subject<number>();

    countdown(): Observable<number> {
        return this._countdown.asObservable();
    }

    private isCounting = false;

    start(count: number): void {
        // Ensure that only one timer is in progress at any given time.
        if (!this.isCounting) {
            this.isCounting = true;
            timer(0, 10).pipe(
                takeWhile(t => t < count),
                map(t => count - t)
            ).subscribe(
                t => this._countdown.next(t),
                null,
                () => {
                    this._countdown.complete();
                    this.isCounting = false;
                    // Reset the countdown Subject so that a 
                    // countdown can be performed more than once.
                    this._countdown = new Subject<number>();
                }
            );
        }
    }

    //Stop the timer
    stop() {
        this._countdown.complete();
        this.isCounting = false;
    }
}
