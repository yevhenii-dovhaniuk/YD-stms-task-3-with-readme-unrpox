import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { OrdersComponent } from './orders/orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { StoreModule } from '@ngrx/store';
import { ordersFeatureKey, ordersReducer } from './orders/orders.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from './orders/orders.effects';
import { OrdersService } from './orders/orders.service';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [OrdersComponent],
    imports: [
        CommonModule,
        SharedModule,
        OrdersRoutingModule,
        StoreModule.forFeature(ordersFeatureKey, ordersReducer),
        EffectsModule.forFeature([OrdersEffects]),
        MatTableModule
    ],
    providers: [OrdersService]
})
export class OrdersModule {
}
