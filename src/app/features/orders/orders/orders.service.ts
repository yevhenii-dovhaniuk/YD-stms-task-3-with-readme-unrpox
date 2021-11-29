import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Order } from 'app/shared/models/order.model';
import { Observable, of } from 'rxjs';
import { Entity } from '../../../shared/models/entity.model';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';

@Injectable()
export class OrdersService {

    constructor(private http: HttpClient) {
    }

    fetchOrders(): Observable<Entity<Order>[]> {
        return this.http.get<{ count: number, order: Order[] }>('https://api.mocki.io/v2/79fb05cb').pipe(
            map(response => response.order.map(order => ({...order, id: order.identifier})))
        )
    }

    fetchOrderColumnDefinitions(): Observable<ColumnDefinition[]> {
        return of([
                {name: 'smts.columns.favorite', field: 'isInFavorites', addsToFavorites: true},
                {name: 'smts.columns.id', field: 'id'},
                {name: 'stms.columns.isRejected', field: 'isRejected'},
                {name: 'stms.columns.onHold', field: 'onHold'},
                {name: 'stms.columns.orderName', field: 'orderName'},
                {name: 'stms.columns.orderNum', field: 'orderNum'},
                {name: 'stms.columns.flags', field: 'flags'},
            ]
        )
    }
}
