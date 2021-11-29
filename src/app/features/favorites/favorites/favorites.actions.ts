import { createAction, props } from '@ngrx/store';

export const favoritesGlobalSearchChanged = createAction('[Favorites] Global Search Changed', props<{ globalSearchString: string }>())
