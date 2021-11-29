import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../../shared/models/patient.model';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Entity } from '../../../shared/models/entity.model';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';

@Injectable()
export class PatientsService {

    constructor(private http: HttpClient) {
    }

    fetchPatients(): Observable<Entity<Patient>[]> {
        return this.http.get<{ count: number, patient: Patient[] }>('https://api.mocki.io/v2/51597ef3').pipe(
            map(response => response.patient.map(patient => ({...patient, id: patient.defaultId})))
        )
    }

    fetchPatientColDefs(): Observable<ColumnDefinition[]> {
        return of([
            {name: 'Fav', field: 'isInFavorites', addsToFavorites: true},
            {field: 'age', name: 'stms.columns.age'},
            {field: 'birthYear', name: 'stms.columns.birthYear'},
            {field: 'defaultFormattedId', name: 'stms.columns.defaultFormattedId'},
            {field: 'defaultId', name: 'stms.columns.defaultId'},
            {field: 'firstName', name: 'stms.columns.firstName'},
            {field: 'fullName', name: 'stms.columns.fullName'},
            {field: 'inactive', name: 'stms.columns.inactive'},
            {field: 'lastName', name: 'stms.columns.lastName'},
        ])
    }
}
