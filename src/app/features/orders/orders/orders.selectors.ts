import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ordersEntityAdapter, ordersFeatureKey, State } from './orders.reducer';

export const selectOrdersFeature = createFeatureSelector<State>(ordersFeatureKey);
export const selectAllOrders = createSelector(selectOrdersFeature, state => ordersEntityAdapter.getSelectors().selectAll(state));
export const selectOrderSearchString = createSelector(selectOrdersFeature, state => state.searchString);
export const selectAllFilteredOrders = createSelector(
    selectAllOrders,
    selectOrderSearchString,
    (orders, searchString) => orders
        .filter(order => Object.values(order)
            .some(orderValue => typeof orderValue === 'string' && orderValue.toLowerCase().includes(searchString.toLowerCase()))
        )
);
export const selectOrdersLoading = createSelector(selectOrdersFeature, state => state.isLoading);
export const selectOrderColumnDefinitions = createSelector(selectOrdersFeature, state => state.columnDefinitions);
export const selectOrderDisplayedColumnDefinitions = createSelector(selectOrdersFeature, state => state.displayedColumnDefinitions);



