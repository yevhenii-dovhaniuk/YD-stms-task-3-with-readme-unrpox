import { createFeatureSelector, createSelector } from '@ngrx/store';
import { patientsEntityAdapter, patientsFeatureKey, State } from './patients.reducer';

export const selectPatientsFeature = createFeatureSelector<State>(patientsFeatureKey);
export const selectAllPatients = createSelector(selectPatientsFeature, state => patientsEntityAdapter.getSelectors().selectAll(state));
export const selectPatientsLoading = createSelector(selectPatientsFeature, state => state.isLoading);
export const selectPatientSearchString = createSelector(selectPatientsFeature, state => state.searchString);
export const selectAllFilteredPatients = createSelector(
    selectAllPatients,
    selectPatientSearchString,
    (patients, searchString) => patients
        .filter(patient => Object.values(patient)
            .some(patientValue => typeof patientValue === 'string' && patientValue.toLowerCase().includes(searchString.toLowerCase()))
        )
);
export const selectPatientColumnDefinitions = createSelector(selectPatientsFeature, state => state.columnDefinitions);
export const selectPatientDisplayedColumnDefinitions = createSelector(selectPatientsFeature, state => state.displayedColumnDefinitions);


