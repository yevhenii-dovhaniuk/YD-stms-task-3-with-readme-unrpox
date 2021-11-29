import { createAction, props } from '@ngrx/store';
import { FavoriteableEntity } from '../../../shared/models/favorites.model';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';
import { Order } from '../../../shared/models/order.model';

export const loadOrders = createAction('[Orders] Load Orders');
export const loadOrdersSuccess = createAction('[Orders] Load Orders Success', props<{ orders: FavoriteableEntity<Order>[] }>());
export const loadOrdersFailure = createAction('[Orders] Load Orders Failure', props<{ error: string }>());
export const searchOrders = createAction('[Orders] Search Orders', props<{searchString: string}>());
export const loadOrderColDefs = createAction('[Orders] Load Order Col Defs');
export const loadOrderColDefsSuccess = createAction('[Orders] Load Order Col Defs Success', props<{ columnDefinitions: ColumnDefinition[] }>());


