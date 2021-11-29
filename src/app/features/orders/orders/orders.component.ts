import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { FavoriteableEntity } from '../../../shared/models/favorites.model';
import { Order } from 'app/shared/models/order.model';

import { debounceTime, map, tap } from 'rxjs/operators';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';
import { FormControl } from '@angular/forms';
import {
    selectAllFilteredOrders,
    selectOrderColumnDefinitions, selectOrderDisplayedColumnDefinitions,
    selectOrderSearchString,
    selectOrdersLoading
} from './orders.selectors';
import { loadOrderColDefs, loadOrders, searchOrders } from './orders.actions';
import { ordersFavoritesAdapter } from './orders.reducer';

@Component({
    selector: 'st-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit, OnDestroy {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    filteredOrders$: Observable<FavoriteableEntity<Order>[] | null>;
    orderColumnDefinitions$: Observable<ColumnDefinition[]> = of([]);
    displayedOrderColumnDefinitions$: Observable<string[]>;
    areOrdersLoading$: Observable<boolean>;
    searchString$: Observable<string> = of('');

    searchControl: FormControl = new FormControl();

    subscriptions = new Subscription();

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.filteredOrders$ = this.store.select(selectAllFilteredOrders);
        this.orderColumnDefinitions$ = this.store.select(selectOrderColumnDefinitions);
        this.displayedOrderColumnDefinitions$ = this.store.select(selectOrderDisplayedColumnDefinitions);
        this.areOrdersLoading$ = this.store.select(selectOrdersLoading);
        this.store.dispatch(loadOrderColDefs());


        this.subscriptions.add(
            this.store.select(selectOrderSearchString).subscribe(searchString => {
                this.searchControl.setValue(searchString);
            })
        );

        this.subscriptions.add(
            this.searchControl.valueChanges.pipe(
                debounceTime(500),
                tap(value => this.store.dispatch(searchOrders({searchString: value})))
            ).subscribe()
        );
    }

    toggleFavouriteState(order: FavoriteableEntity<Order>) {
        this.store.dispatch(ordersFavoritesAdapter.toggleFavoriteState({entity: order}));
    }

    fetchOrders() {
        this.store.dispatch(loadOrders());
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
