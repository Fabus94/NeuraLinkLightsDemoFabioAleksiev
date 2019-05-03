import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { DataLights } from "./lights";
import { Data } from "@angular/router";



@Injectable()

export class DataService {
   

    constructor(private http: HttpClient) {
    }

    //PlayBack State / 0 = off, 1= playback last entry, 2= ?
    public playBackFlag: number = 0;
    public playBackModel: DataLights = new DataLights();

    //Recording State / 0 = off, 1= recording, 2= recorded
    public RecordingSt: number = 0;
    public StopLoad: number = 0;

    //Sys string msgs
    public ControllChange: string;
    public RecordingMsg: string;
    public PlayBackMsg: string;
  
    //Reference Timer
    public TenthsReflect: number = 0;

    //Active lights 
    public activeLight: number = 0;

    //Active Lights from playlist
    public activePlay = [];

    public activeColour = [];

    public activeDirection = [];

    //Light entries to the database list
    public lightEntriesList: DataLights[] = [];

    //Record of the last returned entry from the database
    public lightsEntriesReturnInst: DataLights = new DataLights();

    //current UI lights snapshot - this is changed on change in variables caused by user activity
    public lightsSnapshot: DataLights = new DataLights();

    public getAllEntriesLights(): Observable<boolean> {
        return this.http.get("/api/lights")
            .map((data: any[]) => {
                this.lightEntriesList = data;
                return true;
            });
    }

    public NewEntrieLights(): Observable<boolean> {
        return this.http.post("/api/lights/newEntrie", this.lightsSnapshot)
            .map((data: any) => {    
                this.lightsEntriesReturnInst = data;
                return true;
            });
    }

    public UpdateEntriesLights(newEntrie: DataLights): Observable<boolean> {
        return this.http.post("/api/lights/updateEntrie", newEntrie)
            .map((data: any) => {
                this.lightsEntriesReturnInst = data;
                return true;
            });
    }

    public deleteEntrieLights(id): Observable<boolean> {
        return this.http.delete("/api/lights", {
            params: new HttpParams().set('id', id)
        })
            .map((data: any) => {
                return true;
            });

    }

}

