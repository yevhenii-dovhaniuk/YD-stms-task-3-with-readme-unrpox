import { NgModule } from '@angular/core';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { favoritesFeatureKey, favoritesReducer } from './favorites/favorites.reducer';

@NgModule({
    imports: [
        FavoritesRoutingModule,
        SharedModule,
        MatTableModule,
        StoreModule.forFeature(favoritesFeatureKey, favoritesReducer)
    ],
    exports: [FavoritesComponent],
    declarations: [FavoritesComponent],
    providers: [],
})
export class FavoritesModule {
}
