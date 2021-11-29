import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsComponent } from './patients/patients.component';
import { StoreModule } from '@ngrx/store';
import { patientReducer } from './patients/patients.reducer';

const routes: Routes = [
    {
        path: '',
        component: PatientsComponent,
        data: {title: 'stms.menu.patients'}
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),

    ],
    exports: [RouterModule]
})
export class PatientsRoutingModule {
}
