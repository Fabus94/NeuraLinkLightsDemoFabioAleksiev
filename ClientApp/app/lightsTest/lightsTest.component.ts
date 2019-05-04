import { Component, OnInit, ViewChild, ElementRef, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/dataService';
import { Lights, DataLights } from '../shared/lights';
import { slideInAnimation } from '../app.animations';

@Component({
    selector: "the-LightsTest",
    templateUrl: "lightsTest.component.html",
    styleUrls: ["lightsTest.component.css"],
    animations: [slideInAnimation]
})

export class LightsTest implements OnInit {

    //Get data storage and router service
    constructor(private data: DataService, private router: Router) {

     

    }

    LastEntryDate: Date;

    //Number of lights
    nLights: number = 20;
    nLightsChanged: number = 20;

    //Use for finding direction
    nLightsHalf: number = 10;
    nLightsQuater: number = 5;

    //SetPixelSize
    pixelSize: number = 14;

    //Number of entries
    nEntries: number;

    //Average values
    medL1: number = 0;
    medL2: number = 0;
    medL3: number = 0;
    avNLights: number = 0;

    //Colour setting values
    colourS1: number;
    colourS2: number;
    colourS3: number;
    colourSDraw: number = 1;

    //MouseOverLog
    mousePos: number = 0;


    //Import a model for the lights list and create an instance
    lightsList: Lights[] = [];
    coloursList: Lights[] = [];

    //List of activated squares - algorithm parameter
    sqActivated = [];

    //List of activated square - colours - algorithm parameter- registered in the same moment as a sqActive entry , use sqActive index to find it's coresponding colour in sqColour
    sqColour = [];

    //Tags - pattern parameter
    patternTag: string; 

    //direction_ - algorithm parameter - registered in the same moment as a sqActive entry/codes: 1-Right 2-Left 3-Up 4-Down 5-Left-Up 6-Left-Down 7-Right-Up 8-Right-Down
    direction: number;

    sqDirection = [];

    //Adds an estimated predicted path to visuals
    sqPrediction = [];

    //Copy the LightInstance values from data
    public lightEntriesList: DataLights[] = [];

    //Filtered List Entries
    public filteredLightEntriesList: DataLights[] = [];
    public lightsSingleInst: DataLights = new DataLights();

    ngOnInit(): void {

        //Check if the data from the database is available, if not go to error page
        this.data.getAllEntriesLights()
            .subscribe(success => {
                if (success) {
                    //Initalize list from the pre-loaded data service model
                    this.lightEntriesList = this.data.lightEntriesList;

                    //Initalize list for the pattern filter list
                    this.filteredLightEntriesList = this.lightEntriesList;

                    //call the initialize from dataBase function
                    this.InitializeFromDatabase();

                    //load default playback to last saved model with algorithm
                    var check: number = 1;
                    var over: number = 0;
                    while (check == 1) {
                        if (this.lightEntriesList[over].algorithmParameter1 != "0") {
                            this.data.playBackModel = this.lightEntriesList[over];
                            check = 0;
                        }
                        over++;
                    }
                    this.PlayBackDrawingPattern();     
                }
            }, err => this.router.navigate(['**']));

        
    }


    InitializeFromDatabase() {

        //Initialize a model snapshot to register the UI state
        this.loadSnapShot();

        //initialise number of entries
        this.nEntries = this.lightEntriesList.length;

        //call a function to process the data and get its averages
        this.getAverages();


        //Set the number of lights to the average from the data service model
        this.nLightsChanged = this.avNLights;
        this.nLights = this.nLightsChanged;
        this.nLightsHalf = this.nLightsChanged / 2;
        this.nLightsQuater = this.nLightsHalf / 2;


        //Get the date of the last entry
        this.LastEntryDate = this.data.lightsEntriesReturnInst.datetime;

        //Set Colour Settings from averages 

        this.colourS1 = this.medL1;
        this.colourS2 = this.medL2;
        this.colourS3 = this.medL3;

        //Load our lights into our list
        this.LoadListLights();

        //Case where data list is empty
        if (this.lightEntriesList.length < 1) {
            this.nEntries = 0;

            this.nLightsChanged = 5000
            this.nLights = this.nLightsChanged;
            this.nLightsHalf = this.nLightsChanged / 2;
            this.nLightsQuater = this.nLightsHalf / 2;

            this.LastEntryDate = this.data.lightsEntriesReturnInst.datetime;


            this.colourS1 = 1;
            this.colourS2 = 2;
            this.colourS3 = 3;

        }
    }

    loadSnapShot() {
        this.data.lightsSnapshot = this.data.lightsEntriesReturnInst;
        //set the id value copied from the last entry to zero,
        //cannot reg the model to the database a id which is a unique val
        this.data.lightsSnapshot.id = 0;
    }

    ChangeToSnapShot(parameter: number, value: any) {
        //Code parameter
        //Number = 1
        //Setting1 = 2
        //Setting2 = 3
        //Setting3 = 4
        //Pattern = 5
        //Datetime = 6
        //AlgorithmParameter1 = 7 - activated squares
        //AlgorithmParameter2 = 8
        //AlgorithmParameter3 = 9
        //AlgorithmParameter4 = 10

        //Group settings shapshots together, think of which setting is dependant of others
        if (parameter == 1) {
            this.data.lightsSnapshot.pattern = "Lights Number Change";
            this.data.lightsSnapshot.number = value;
            this.data.lightsSnapshot.setting1 = this.colourS1;
            this.data.lightsSnapshot.setting2 = this.colourS2;
            this.data.lightsSnapshot.setting3 = this.colourS3;
            this.data.lightsSnapshot.algorithmParameter1 = "0";
            this.data.lightsSnapshot.algorithmParameter2 = "0";
            this.data.lightsSnapshot.algorithmParameter3 = "0";
            this.data.lightsSnapshot.algorithmParameter4 = "0";
            this.SendModelDataBase();
        };

        if (parameter == 2) {
            this.data.lightsSnapshot.pattern = "ColourChange1";
            this.data.lightsSnapshot.number = this.nLightsChanged;
            this.data.lightsSnapshot.setting1 = value;
            this.data.lightsSnapshot.setting2 = this.colourS2;
            this.data.lightsSnapshot.setting3 = this.colourS3;
            this.data.lightsSnapshot.algorithmParameter1 = "0";
            this.data.lightsSnapshot.algorithmParameter2 = "0";
            this.data.lightsSnapshot.algorithmParameter3 = "0";
            this.data.lightsSnapshot.algorithmParameter4 = "0";
            this.SendModelDataBase();

        };

        if (parameter == 3) {
            this.data.lightsSnapshot.pattern = "ColourChange2";
            this.data.lightsSnapshot.number = this.nLightsChanged;
            this.data.lightsSnapshot.setting2 = value;
            this.data.lightsSnapshot.setting1 = this.colourS1;
            this.data.lightsSnapshot.setting3 = this.colourS3;
            this.data.lightsSnapshot.setting3 = this.colourS3;
            this.data.lightsSnapshot.algorithmParameter1 = "0";
            this.data.lightsSnapshot.algorithmParameter2 = "0";
            this.data.lightsSnapshot.algorithmParameter3 = "0";
            this.data.lightsSnapshot.algorithmParameter4 = "0";
            this.SendModelDataBase();
        };

        if (parameter == 4) {
            this.data.lightsSnapshot.pattern = "ColourChange3";
            this.data.lightsSnapshot.number = this.nLightsChanged;
            this.data.lightsSnapshot.setting3 = value;
            this.data.lightsSnapshot.setting2 = this.colourS2;
            this.data.lightsSnapshot.setting1 = this.colourS1;
            this.data.lightsSnapshot.algorithmParameter1 = "0";
            this.data.lightsSnapshot.algorithmParameter2 = "0";
            this.data.lightsSnapshot.algorithmParameter3 = "0";
            this.data.lightsSnapshot.algorithmParameter4 = "0";
            this.SendModelDataBase();
        };

        if (parameter == 7) {
            console.log(this.data.lightsSnapshot);
            this.data.lightsSnapshot.pattern = this.patternTag;
            this.data.lightsSnapshot.number = this.nLightsChanged;
            this.data.lightsSnapshot.setting3 = this.colourS3;
            this.data.lightsSnapshot.setting2 = this.colourS2;
            this.data.lightsSnapshot.setting1 = this.colourS1;
            this.data.lightsSnapshot.algorithmParameter1 = value;
            this.data.lightsSnapshot.algorithmParameter2 = this.sqColour.toString();
            this.data.lightsSnapshot.algorithmParameter3 = this.sqDirection.toString();
            this.data.lightsSnapshot.algorithmParameter4 = "0";
            console.log(this.data.lightsSnapshot)
            this.SendModelDataBase();
            this.patternTag = null;
            this.sqActivated = [];
            this.sqColour = [];
            this.sqDirection = [];
        }; 

    }


    //Call Send to database function

    SendModelDataBase() {
        this.data.lightsSnapshot.datetime = new Date();
        this.data.NewEntrieLights()
            .subscribe(success => {
                if (success) {
                    if (this.data.RecordingSt == 2) {
                        this.data.RecordingSt = 0;
                        this.data.playBackModel = this.data.lightsEntriesReturnInst;
                    };
                    console.log('Settings Changed')
                }
            }, err => console.log(err));

    }

    //Function for the input form
    ChangeNumberLights() {
        this.nLightsChanged = this.nLights
        this.nLightsHalf = this.nLights / 2;
        this.nLightsQuater = this.nLightsHalf / 2;
        this.data.ControllChange = "the number of lights has changed to"
       
        this.ChangeToSnapShot(1, this.nLightsChanged);
         //Re-Load our lights into our list
        this.LoadListLights();
    }

    //Clear number of lights input
    ClearNumber() {
        this.nLights = 0;    
    }

    LoadListLights() {

        //Make sure we are loading an empty list
        this.lightsList = [];

        //Counter for our loading loop
        var counterL: number = 0;

        //Our lights loading loop 
        while (counterL < this.nLightsChanged) {
            counterL++;

            //Load lights colours from averages/ codes: 1 = Red, 2 = Green, 3 = White, 4 = Blue, 5 = Yellow, 6 = Purple
            //lights.id ensures the 3-value lights activation order/ activation groups: 1 , 2, 3
            //light.sequence gives the light a identifier number from its place in the sequence/ this.lightsList.length+1 to increment
            if (this.lightsList.length == 0) {
                this.lightsList.push({ "id": 1, "colour": this.colourS1, "sequence": this.lightsList.length + 1 });
            } else if (this.lightsList[this.lightsList.length - 1].id == 3) {
                this.lightsList.push({ "id": 1, "colour": this.colourS1, "sequence": this.lightsList.length + 1 });
            } else if (this.lightsList[this.lightsList.length - 1].id == 1) {
                this.lightsList.push({ "id": 2, "colour": this.colourS2, "sequence": this.lightsList.length + 1 });
            } else if (this.lightsList[this.lightsList.length - 1].id == 2) {
                this.lightsList.push({ "id": 3, "colour": this.colourS3, "sequence": this.lightsList.length + 1 });
            };
          
          
        } 
        //Set CSS created light squares ssize
        document.querySelector("body").style.cssText = "--my-var2:" + this.pixelSize + "px";
    }

    getAverages() {

        //Get the average initial values from all the entries in the database
        for (let value of this.lightEntriesList) {

            this.medL1 += value.setting1;
            this.medL2 += value.setting2;
            this.medL3 += value.setting3;
            this.avNLights += value.number;

        }

        this.medL1 = Math.round(this.medL1 / this.nEntries); 
        this.medL2 = Math.round(this.medL2 / this.nEntries);
        this.medL3 = Math.round(this.medL3 / this.nEntries);
        this.avNLights = Math.round(this.avNLights / this.nEntries);

        console.log(this.medL1);
        console.log(this.medL2);
        console.log(this.medL3);
        console.log(this.avNLights);

    }

    //Dropdown lists colour selection menu
    OpenSettings: number = 0;
    Settings1() {
        if (this.OpenSettings == 1) {
            this.OpenSettings = 0;
        } else {
            this.OpenSettings = 1;
        }
    }
    Settings2() {
        if (this.OpenSettings == 2) {
            this.OpenSettings = 0;
        } else {
            this.OpenSettings = 2;
        }
    }
    Settings3() {
        if (this.OpenSettings == 3) {
            this.OpenSettings = 0;
        } else {
            this.OpenSettings = 3;
        }
    }

    //Drawing Colour Selction
    SettingsDrawingColour() {
        if (this.OpenSettings == 4) {
            this.OpenSettings = 0;
        } else {
            this.OpenSettings = 4;
        }
    }
    //Playback Selction Dropdown
    Settings5() {
        if (this.OpenSettings == 5) {
            this.OpenSettings = 0;
        } else {
            this.OpenSettings = 5;
        }
    }

    //Select a colour function
    insertColour: number = 0;
    Sel(val: number) {
        this.insertColour = val;
        this.SaveColour();
    }

    //Save colour selection
    SaveColour() {
        if (this.OpenSettings == 1) {
            this.colourS1 = this.insertColour;
            //Register setting change to snapshot
            this.ChangeToSnapShot(2, this.insertColour);
        } else if (this.OpenSettings == 2) {
            this.colourS2 = this.insertColour;
            this.ChangeToSnapShot(3, this.insertColour);
        } else if (this.OpenSettings == 3) {
            this.colourS3 = this.insertColour;
            this.ChangeToSnapShot(4, this.insertColour);
        } else if (this.OpenSettings == 4) {
            this.colourSDraw = this.insertColour;
        }

        //Reload the LightsList with the new colour settings
        this.LoadListLights();

        //Close the dropdown
        this.OpenSettings = 0;
    }

    //Return the active light number from the data service 
    getActiveLight() {
        return this.data.activeLight;
    };

    //ControllChange msg string
    ControllChangeCheck() {
        if (this.data.ControllChange != null) {
            return true;
        };
    }

    ControlReturn() {
        return this.data.ControllChange;
    }

    //Stop Recording Button activates RegDecline or RegInactive
    StopRec() {
        this.data.RecordingSt = 3;
    }

    //Do not set tags after recording
    RegDecline() {
        this.patternTag = "No Tags";
        console.log(this.patternTag);
        this.RegInactive();
    }

    //Do set tags & call save recording
    RegInactive() {
        this.data.RecordingSt = 2;
        this.ChangeToSnapShot(7, this.sqActivated.toString())
    }

    eraseInstanse: number = 0;
    erase: number = 0;

    //Cursor and mouse down over squares functions adds or deletes squares to sqActive with the selected colour
    RegSq(Sq: Lights) {
        Sq.colour = this.colourSDraw;
        if (this.sqActivated[this.sqActivated.length - 1] != Sq.sequence && this.draw > 0 && this.erase == 0) {
            this.sqActivated.push(Sq.sequence);
            this.sqColour.push(Sq.colour);
            this.MathDirection(Sq.sequence);
            this.sqDirection.push(this.direction);
        }
        if (this.eraseInstanse != Sq.sequence && this.draw > 0 && this.erase == 1) {
            var list = []
            for (let value of this.sqActivated) {
                if (value != Sq.sequence) {
                    list.push(value);
                }
            }
            this.sqActivated = list;
        }
        if (this.sqActivated.includes(Sq.sequence) && this.draw > 0 && this.erase == 0) {
            if (this.sqColour[this.sqActivated.indexOf(Sq.sequence)] = Sq.colour) {
                this.sqColour.splice(this.sqActivated.indexOf(Sq.sequence),1,Sq.colour);
            }
        }

        this.data.RecordingMsg = "Recording drawing pattern";
        this.data.RecordingSt = 1;
    }

    //Calculate the direction of drawing
    mathDirectionLastEntry: number = 0;
    MathDirection(sequence: number) {

        //Squares with 14px side in draw area width of 1708px ref lightsTest.component.CSS = 122 squares per row
        //calculate the direction of movement from the starting point /codes: 1-Right 2-Left 3-Up 4-Down 5-Left-Up 6-Left-Down 7-Right-Up 8-Right-Down
        console.log(this.mathDirectionLastEntry);
        if (this.sqActivated.length == 0) {

            this.mathDirectionLastEntry = sequence;
        }

        if (this.sqActivated.length > 0) {

            var sqMinLast: number = sequence - this.mathDirectionLastEntry;
            console.log(sqMinLast)

            if (sqMinLast == 1) {
                this.direction = 1;
                this.MathPredictPath(sequence, 1);

            } else if (sqMinLast == 0 - 1) {
                this.direction = 2;
                this.MathPredictPath(sequence, 0 - 1);
            }

            else if (sqMinLast == 0 - 123) {
                this.direction = 5;
                this.MathPredictPath(sequence, 0 - 123);

            } else if (sqMinLast == 122 - 1) {
                this.direction = 6;
                this.MathPredictPath(sequence, 121);

            }

            else if (sqMinLast == 123) {
                this.direction = 8;
                this.MathPredictPath(sequence, 123);

            } else if (sqMinLast == 0 - 121) {
                this.direction = 7;
                this.MathPredictPath(sequence, 0 - 121);

            }

            else if (sqMinLast < 0) {
                this.MathPredictPath(sequence, sqMinLast);
                this.direction = 3;
            } else if (sqMinLast > 0) {
                this.direction = 4;
                this.MathPredictPath(sequence, sqMinLast);
            } else {
                this.direction = 0;
            };

        }
        this.mathDirectionLastEntry = sequence;
      
    }

    //Add a predicted path of drawing, a double click auto-completes drawing direction in next 6 squares
    MathPredictPath(sequence:number, dedct: number) {
        this.sqPrediction = []
        var counterPr: number = 6;
        var sequenceUse: number = sequence;
        console.log(dedct);
        console.log(sequence);
        while (counterPr != 0) {
         
            var send = sequenceUse + dedct;
            console.log(send);
            this.sqPrediction.push(send);
            sequenceUse = send;
            counterPr--;
        }
        console.log(this.sqPrediction);
    }

    //Check Recording
    CheckRecording() {
        return this.data.RecordingSt;
    }

    //Recording Msg
    ReturnRecordingMsg() {
        return this.data.RecordingMsg;
    }

    //Play back last drawing pattern
    PlayBackDrawingPattern() {
        //Operate on fresh lists
        this.data.activePlay = [];
        this.data.activeColour = [];
        //load the correct size of drawing space for the pattern
        this.nLights = this.data.playBackModel.number;
        this.ChangeNumberLights();
        this.data.PlayBackMsg = "Playing last recorded drawing pattern"
        this.data.playBackFlag = 1;
        this.data.RecordingMsg = null;
        this.data.RecordingSt = 0;
    }

    //Selct from dropdown playback list for playback
    OpenForPlayBack(newPlayback: DataLights) {
        this.data.playBackModel = newPlayback;
        console.log(newPlayback);
        console.log(this.data.playBackModel);
        this.Settings5();
    }

    //OpenLast Recorded Pattern or last played pattern
    OpenForPlayBackLP() {
        this.lightEntriesList = this.data.lightEntriesList;
        var check: number = 1;
        var over: number = 0;
        while (check == 1) {
            if (this.lightEntriesList[over].algorithmParameter1 != "0") {
                this.data.playBackModel = this.lightEntriesList[over];
                check = 0;
            }
            over++;
        }
        this.PlayBackDrawingPattern(); 

    }

    //Return the display property for loaded pattern in dropdown list
    PlayBackModelDateR() {
        return this.data.playBackModel.datetime;
    }

    PlayBackModelTagR() {
        return this.data.playBackModel.pattern;
    }

    //Stop PlayBack
    PlayBackStop() {
        this.data.playBackFlag = 0;
        this.data.activePlay = [];

    }

    CheckPlayBack() {
        if (this.data.playBackFlag != 0) {
            return true;
        } else {
            return false;
        }

    }

    //Recording Msg
    ReturnPlayBackMsg() {
        return this.data.PlayBackMsg;
    }

    //PlayBack drawing
    CheckActiveDrawVal(id: number) {
        if (this.data.activePlay.includes(id)){
            return true;
        } else {
            return false;
        }

    }

    //Check if mouse clicked over drawing area
    draw: number = 0;
    MouseDraw() {
        this.draw++
    }
    MouseFree() {
        this.draw = 0
    }

    //Filter Option
    _listFilter: string; // variable
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;

        this.filteredLightEntriesList = this.listFilter ? this.performFilter(this.listFilter) : this.lightEntriesList;

    }

    //Called performFilter function from set listFilter
    performFilter(filterBy: string): DataLights[] {

        filterBy = filterBy.toLocaleLowerCase(); // case insensitive comparison convert to lower case 
        return this.lightEntriesList.filter((lightEntries: DataLights) =>
            lightEntries.pattern.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } 

    //Ensure the newest list state
    mouseOverPlayDrw() {
        if (this.data.lightEntriesList[this.lightEntriesList.length - 1] != this.lightEntriesList[this.lightEntriesList.length - 1]) {
            this.lightEntriesList = this.data.lightEntriesList;
        };
    }

    //Get Colours for Playback
    getColourDrw(sequence: number) {
        return this.sqColour[this.sqActivated.indexOf(sequence)];
    }
    getColourPlay(sequence: number) {
        return this.data.activeColour[this.data.activePlay.indexOf(sequence)];
    }

    //Get Direction for playback
    RetDirection() {
        return this.data.activeDirection[this.data.activeDirection.length-1];
    }

    //Pattern auto-complete call
    MouseDoubleClick() {
        console.log('click')
        for (let value of this.sqPrediction) {
            this.sqActivated.push(value);
            this.sqColour.push(this.colourSDraw);
            this.MathDirection(value);
            this.sqDirection.push(this.direction);
        }
      
    }

    CompileScript1: string = "";
    CompileScript2: string = "";
    CompileScript3: string = "";


    //Compile some new pattern from all collected data function following any calculations set here
    CompilePatternFromData() {
        var date: Date = new Date();
        var CompileScript1: string = "";
        var CompileScript2: string = "";
        var CompileScript3: string = "";
        var nLights: number = 0;

        for (let value of this.lightEntriesList) {
            var list = JSON.parse("[" + value.algorithmParameter1 + "]");
            var colour = JSON.parse("[" + value.algorithmParameter2 + "]");
            var direction = JSON.parse("[" + value.algorithmParameter3 + "]");
            CompileScript1 += list.splice(0, 10);
            CompileScript2 += colour.splice(0, 10);
            CompileScript3 += direction.splice(0, 10);
            if (nLights == 0) {
                nLights = value.number
            };
            if (nLights > 0 && nLights < value.number) {
                    nLights = value.number 
            };
        }

        this.data.lightsSnapshot.pattern = "Compiled " + date.toUTCString();
        this.data.lightsSnapshot.number = nLights;
        this.data.lightsSnapshot.setting3 = this.colourS3;
        this.data.lightsSnapshot.setting2 = this.colourS2;
        this.data.lightsSnapshot.setting1 = this.colourS1;
        this.data.lightsSnapshot.algorithmParameter1 = CompileScript1;
        this.data.lightsSnapshot.algorithmParameter2 = CompileScript2;
        this.data.lightsSnapshot.algorithmParameter3 = CompileScript3;
        console.log(this.data.lightsSnapshot);

    }

}
