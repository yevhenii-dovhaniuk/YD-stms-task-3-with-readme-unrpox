import { EntityState } from '@ngrx/entity';
import { ColumnDefinition } from './column-definition.model';

export type FavoriteableEntity<T> = T & { isInFavorites?: boolean };

export interface StateWithFavoritesCapability<T> extends EntityState<T> {
    favoritesEntityTranslationKey: string;
    columnDefinitions: ColumnDefinition[];
    displayedColumnDefinitions: string[];
}
