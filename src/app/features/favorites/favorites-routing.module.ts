import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: FavoritesComponent
            }
        ])
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class FavoritesRoutingModule {
}
