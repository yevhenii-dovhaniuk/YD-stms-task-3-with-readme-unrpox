import { Patient } from 'app/shared/models/patient.model';
import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { FavoriteableEntity, StateWithFavoritesCapability } from '../../../shared/models/favorites.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFavoritesAdapter } from '../../favorites/favorites/favorites.reducer';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';
import {
    loadPatientColDefsSuccess,
    loadPatients,
    loadPatientsFailure,
    loadPatientsSuccess,
    searchPatients
} from './patients.actions';

export interface State extends StateWithFavoritesCapability<FavoriteableEntity<Patient>> {
    isLoading: boolean;
    error: string;
    columnDefinitions: ColumnDefinition[];
    displayedColumnDefinitions: string[];
    searchString: string;
}

export const patientsFeatureKey = 'patients';
export const patientsEntityAdapter: EntityAdapter<FavoriteableEntity<Patient>> = createEntityAdapter<FavoriteableEntity<Patient>>();
export const patientsFavoritesAdapter = createFavoritesAdapter<State, FavoriteableEntity<Patient>>('Patients');



const initialState: State = {
    ...patientsEntityAdapter.getInitialState(),
    isLoading: false,
    error: '',
    favoritesEntityTranslationKey: 'stms.patients.title',
    columnDefinitions: [],
    displayedColumnDefinitions: [],
    searchString: ''
};

export const patientReducer = createReducer<State>(initialState,
    on(loadPatients, state => ({...state, isLoading: true, error: '', searchString: ''})),
    on(loadPatientsSuccess, (state, action) => ({...state, ...patientsEntityAdapter.addMany(action.patients, state), isLoading: false})),
    on(loadPatientsFailure, (state, action) => ({...state, isLoading: false, error: action.error})),
    on(loadPatientsFailure, (state, action) => ({...state, isLoading: false, error: action.error})),
    on(loadPatientColDefsSuccess, (state, action) => ({...state, columnDefinitions: action.columnDefinitions, displayedColumnDefinitions: action.columnDefinitions.map(colDef => colDef.field)})),
    on(searchPatients, (state, action) => ({...state, searchString: action.searchString})),
    patientsFavoritesAdapter.favoriteStateReducer
);


