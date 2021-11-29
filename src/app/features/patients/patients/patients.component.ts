import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { FavoriteableEntity } from '../../../shared/models/favorites.model';
import { Patient } from '../../../shared/models/patient.model';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';
import { FormControl } from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs/operators';
import {
    selectAllFilteredPatients,
    selectPatientColumnDefinitions, selectPatientDisplayedColumnDefinitions,
    selectPatientSearchString,
    selectPatientsLoading
} from './patients.selectors';
import { loadPatientColDefs, loadPatients, searchPatients } from './patients.actions';
import { patientsFavoritesAdapter } from './patients.reducer';

@Component({
    selector: 'st-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent implements OnInit {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    filteredPatients$: Observable<FavoriteableEntity<Patient>[] | null>;
    patientColumnDefinitions$: Observable<ColumnDefinition[]> = of([]);
    displayedPatientColumnDefinitions$: Observable<string[]>;
    arePatientsLoading$: Observable<boolean>;
    searchString$: Observable<string> = of('');

    searchControl: FormControl = new FormControl();

    subscriptions = new Subscription();

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.filteredPatients$ = this.store.select(selectAllFilteredPatients);
        this.patientColumnDefinitions$ = this.store.select(selectPatientColumnDefinitions);
        this.displayedPatientColumnDefinitions$ = this.store.select(selectPatientDisplayedColumnDefinitions);
        this.arePatientsLoading$ = this.store.select(selectPatientsLoading);
        this.store.dispatch(loadPatientColDefs());


        this.subscriptions.add(
            this.store.select(selectPatientSearchString).subscribe(searchString => {
                this.searchControl.setValue(searchString);
            })
        );

        this.subscriptions.add(
            this.searchControl.valueChanges.pipe(
                debounceTime(500),
                tap(value => this.store.dispatch(searchPatients({searchString: value})))
            ).subscribe()
        );
    }

    fetchPatients() {
        this.store.dispatch(loadPatients());
    }

    toggleFavouriteState(patient: FavoriteableEntity<Patient>) {
        this.store.dispatch(patientsFavoritesAdapter.toggleFavoriteState({entity: patient}));
    }
}
