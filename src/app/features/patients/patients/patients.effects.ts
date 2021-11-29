import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PatientsService } from './patients.service';
import {
    loadPatientColDefs,
    loadPatientColDefsSuccess,
    loadPatients,
    loadPatientsFailure,
    loadPatientsSuccess
} from './patients.actions';

@Injectable()
export class PatientsEffects {
    loadPatients = createEffect(() => this.actions$.pipe(
        ofType(loadPatients),
        switchMap(() => {
            return this.patientsService.fetchPatients().pipe(
                map(response => {
                    return loadPatientsSuccess({patients: response});
                }),
                catchError(e => {
                    return of(loadPatientsFailure(e.message || 'Unable to fetch patients'));
                })
            )
        })
    ))


    loadColumnDefinitions = createEffect(() => this.actions$.pipe(
        ofType(loadPatientColDefs),
        switchMap(() => {
            return this.patientsService.fetchPatientColDefs().pipe(
                map(response => loadPatientColDefsSuccess({columnDefinitions: response}))
            )
        })
    ))

    constructor(private actions$: Actions, private patientsService: PatientsService) {
    }
}
