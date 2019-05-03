import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimerControlLightsTestComponent } from './timerControl-lightsTest.component';
import { SharedModule } from '../shared/shared.module';
import { LightsTest } from './lightsTest.component';
import { TransitionLightsTestComponent } from './transition-lightsTest.component';


@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: 'lights',
                component: LightsTest
            }
               
        ])
    ],
    declarations: [
        LightsTest,
        TimerControlLightsTestComponent,
        TransitionLightsTestComponent
    ]
})

export class LightsModule { }



