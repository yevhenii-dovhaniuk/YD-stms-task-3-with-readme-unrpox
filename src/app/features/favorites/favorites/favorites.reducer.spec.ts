import { createEntityAdapter } from '@ngrx/entity';
import { createFavoritesAdapter } from './favorites.reducer';
import { FavoriteableEntity } from '../../../shared/models/favorites.model';

describe('createFavoritesAdapter', () => {
    it('should provide an action and a reducer function', () => {
        const favoritesAdapter = createFavoritesAdapter<FavoriteableEntity<any>, unknown>('custom-entity');

        expect(favoritesAdapter.toggleFavoriteState.type).toEqual(`[Favorites] custom-entity Favorite State Toggled`);

        const stateStub = {ids: ['1'], entities: {1: {id: 1, isInFavorites: false}}};
        const action = favoritesAdapter.toggleFavoriteState({entity: stateStub.entities[1]});
        const reduced = favoritesAdapter.favoriteStateReducer.reducer(stateStub, action);

        expect(reduced.entities[1].isInFavorites).toEqual(true);
    })
});
