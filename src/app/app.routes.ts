import { Routes } from '@angular/router';
import { StepOneComponent } from '../app/steps/step-one/step-one.component';
import { StepTwoComponent } from '../app/steps/step-two/step-two.component';
import { StepThreeComponent } from '../app/steps/step-three/step-three.component';
import { stepTwoGuard,stepThreeGuard } from './guard/steps.guard'

export const routes: Routes = [
    { path: 'step-first', component: StepOneComponent },
    { path: 'step-two', component: StepTwoComponent, canActivate:[stepTwoGuard] },
    { path: 'step-three', component: StepThreeComponent, canActivate:[stepThreeGuard] },
    { path: '**', redirectTo:'step-first',pathMatch:'full' }
];
