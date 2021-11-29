import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrdersService } from './orders.service';
import { loadOrderColDefs, loadOrderColDefsSuccess, loadOrders, loadOrdersFailure, loadOrdersSuccess } from './orders.actions';

@Injectable()
export class OrdersEffects {
    loadOrders = createEffect(() => this.actions$.pipe(
        ofType(loadOrders),
        switchMap(() => {
            return this.ordersService.fetchOrders().pipe(
                map(response => {
                    return loadOrdersSuccess({orders: response});
                }),
                catchError(e => {
                    return of(loadOrdersFailure(e.message || 'Unable to fetch orders'));
                })
            )
        })
    ));

    loadColumnDefinitions = createEffect(() => this.actions$.pipe(
        ofType(loadOrderColDefs),
        switchMap(() => {
            return this.ordersService.fetchOrderColumnDefinitions().pipe(
                map(response => loadOrderColDefsSuccess({columnDefinitions: response}))
            )
        })
    ))

    constructor(private actions$: Actions, private ordersService: OrdersService) {
    }
}
