import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { FavoriteableEntity, StateWithFavoritesCapability } from '../../../shared/models/favorites.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFavoritesAdapter } from '../../favorites/favorites/favorites.reducer';
import { Order } from 'app/shared/models/order.model';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';
import {
    loadOrderColDefsSuccess,
    loadOrders,
    loadOrdersFailure,
    loadOrdersSuccess,
    searchOrders
} from './orders.actions';

export interface State extends StateWithFavoritesCapability<FavoriteableEntity<Order>> {
    isLoading: boolean;
    error: string;
    columnDefinitions: ColumnDefinition[];
    displayedColumnDefinitions: string[];
    searchString: string;
}

export const ordersFeatureKey = 'orders';
export const ordersEntityAdapter: EntityAdapter<FavoriteableEntity<Order>> = createEntityAdapter<FavoriteableEntity<Order>>();
export const ordersFavoritesAdapter = createFavoritesAdapter<State, FavoriteableEntity<Order>>('Orders');


const initialState: State = {
    ...ordersEntityAdapter.getInitialState(),
    isLoading: false,
    error: '',
    favoritesEntityTranslationKey: 'stms.orders.title',
    columnDefinitions: [],
    displayedColumnDefinitions: [],
    searchString: ''
};

export const ordersReducer = createReducer<State>(initialState,
    on(loadOrders, state => ({...state, isLoading: true, error: '', searchString: ''})),
    on(loadOrdersSuccess, (state, action) => ({
        ...state,
        ...ordersEntityAdapter.addMany(action.orders, state),
        isLoading: false
    })),
    on(loadOrdersFailure, (state, action) => ({...state, isLoading: false, error: action.error})),
    on(loadOrderColDefsSuccess, (state, action) => ({...state, columnDefinitions: action.columnDefinitions, displayedColumnDefinitions: action.columnDefinitions.map(colDef => colDef.field)})),
    on(searchOrders, (state, action) => ({...state, searchString: action.searchString})),
    ordersFavoritesAdapter.favoriteStateReducer
);



