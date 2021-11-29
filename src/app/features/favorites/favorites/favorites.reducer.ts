import { createAction, createReducer, on, props } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FavoriteableEntity } from '../../../shared/models/favorites.model';
import { favoritesGlobalSearchChanged } from './favorites.actions';

export interface State {
    globalSearchString: string;
}

const initialState: State = {
    globalSearchString: ''
}

export const favoritesFeatureKey = 'favorites';

export const favoritesReducer = createReducer<State>(initialState,
    on(favoritesGlobalSearchChanged, (state, action) => ({...state, globalSearchString: action.globalSearchString}))
);

/**
 * creates an adapter to support toggling "favorites" state for any entity
 * that is stored in EntityState<T> feature-state and contains isInFavorites property.
 * The "entity replacing" mechanism is achieved by using the entityAdapter.setOne() method
 *
 * @param entityName the name of the entity to be represented in action
 *
 * @returns an action and a reducer function to both be used in the app
 */
export const createFavoritesAdapter = <S extends EntityState<T>, T>(entityName: string) => {
    const entityAdapter: EntityAdapter<FavoriteableEntity<T>> = createEntityAdapter();
    const toggleFavoriteState = createAction(`[Favorites] ${entityName} Favorite State Toggled`, props<{ entity: FavoriteableEntity<T> }>());
    const favoriteStateReducer = on<S, (typeof toggleFavoriteState)[]>(toggleFavoriteState, (state, action) => {
        const updatedEntity: FavoriteableEntity<T> = {...action.entity, isInFavorites: !action.entity.isInFavorites}
        return entityAdapter.setOne(updatedEntity, state);
    });
    return {
        toggleFavoriteState,
        favoriteStateReducer
    }
}




