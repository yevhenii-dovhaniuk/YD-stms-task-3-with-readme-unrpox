import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients/patients.component';
import { StoreModule } from '@ngrx/store';
import { patientReducer, patientsFeatureKey } from './patients/patients.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PatientsEffects } from './patients/patients.effects';
import { PatientsService } from './patients/patients.service';
import { FavoritesModule } from '../favorites/favorites.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [PatientsComponent],
    imports: [
        CommonModule,
        SharedModule,
        PatientsRoutingModule,
        FavoritesModule,
        StoreModule.forFeature(patientsFeatureKey, patientReducer),
        EffectsModule.forFeature([PatientsEffects]),
        MatTableModule
    ],
    providers: [
        PatientsService
    ]
})
export class PatientsModule {
}
