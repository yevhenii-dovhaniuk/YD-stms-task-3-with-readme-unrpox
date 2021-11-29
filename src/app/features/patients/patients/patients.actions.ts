import { createAction, props } from '@ngrx/store';
import { FavoriteableEntity } from '../../../shared/models/favorites.model';
import { Patient } from '../../../shared/models/patient.model';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';

export const loadPatients = createAction('[Patients] Load Patients');
export const loadPatientsSuccess = createAction('[Patients] Load Patients Success', props<{ patients: FavoriteableEntity<Patient>[] }>());
export const loadPatientsFailure = createAction('[Patients] Load Patients Failure', props<{ error: string }>());
export const searchPatients = createAction('[Patients] Search Patients', props<{searchString: string}>());
export const loadPatientColDefs = createAction('[Patients] Load Patient Col Defs');
export const loadPatientColDefsSuccess = createAction('[Patients] Load Patient Col Defs Success', props<{ columnDefinitions: ColumnDefinition[] }>());

