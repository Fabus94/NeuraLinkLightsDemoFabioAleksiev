
//Model for app generated content
export class Lights {
    id: number;
    sequence: number;
    colour: number;
}


//Model for the API retrived data
export class DataLights {
    id: number;
    number: number;
    setting1: number;
    setting2: number;
    setting3: number;
    pattern: string;
    datetime: Date = new Date();
    algorithmParameter1: string;
    algorithmParameter2: string;
    algorithmParameter3: string;
    algorithmParameter4: string;
}