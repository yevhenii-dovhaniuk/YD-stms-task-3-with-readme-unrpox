import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FavoriteableEntity, StateWithFavoritesCapability } from '../../../shared/models/favorites.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { favoritesFeatureKey, State } from './favorites.reducer';

const genericEntityAdapter = createEntityAdapter<FavoriteableEntity<unknown>>();

export const selectFavoritesFeature = createFeatureSelector<State>(favoritesFeatureKey);
export const selectFavoritesSearchString = createSelector(selectFavoritesFeature, state => state.globalSearchString);

/**
 * creates a selector that:
 * 1. searches only for feature stores that contain non-empty "favoritesEntityTranslationKey" property
 * 2. selects the data from them using the entityAdapter (selectAll)
 * 3. filters down the data rows leaving only ones that have "isInFavorites" equal to "true"
 * 4. filters down the remaining rows checking inner data cells to include the "globalSearchString"
 */
export const selectEntitiesWithFavorites = (state: { [featureKey: string]: unknown}) => {
    const globalSearchString = selectFavoritesSearchString(state);
    const entitiesWithFavorites = Object.entries(state).filter(([, value]) => !!value['favoritesEntityTranslationKey']).map(([key]) => key);
    const entityStates = entitiesWithFavorites.map(entity => createFeatureSelector<EntityState<FavoriteableEntity<unknown>>>(entity)(state));
    return entityStates.map(entityState => ({
            ...entityState,
            filteredTableData: genericEntityAdapter
                .getSelectors()
                .selectAll(entityState)
                .filter(data => data.isInFavorites)
                .filter(data => Object
                    .values(data)
                    .some((entityData: unknown) => typeof entityData === 'string' && entityData.toLowerCase().includes(globalSearchString.toLowerCase()))
                )
        })
    ) as (StateWithFavoritesCapability<unknown> & {filteredTableData: unknown[]})[];
}
