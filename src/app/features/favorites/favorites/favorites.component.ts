import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { Store } from '@ngrx/store';
import { StateWithFavoritesCapability } from '../../../shared/models/favorites.model';
import { Observable, of, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { selectEntitiesWithFavorites, selectFavoritesSearchString } from './favorites.selectors';
import { favoritesGlobalSearchChanged } from './favorites.actions';

@Component({
    selector: 'favorites',
    templateUrl: 'favorites.component.html',
    styleUrls: ['favorites.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class FavoritesComponent implements OnInit, OnDestroy {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    entitiesWithFavorites$: Observable<(StateWithFavoritesCapability<unknown> & { filteredTableData: unknown[] })[]>;
    globalSearchString$: Observable<string> = of('');

    searchControl: FormControl = new FormControl();
    subscription = new Subscription();

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.entitiesWithFavorites$ = this.store.select(selectEntitiesWithFavorites);
        this.globalSearchString$ = this.store.select(selectFavoritesSearchString);

        this.subscription.add(
            this.searchControl.valueChanges.pipe(
                debounceTime(500),
                tap(value => this.store.dispatch(favoritesGlobalSearchChanged({globalSearchString: value})))
            ).subscribe()
        );

        this.subscription.add(
            this.globalSearchString$.subscribe(searchString => this.searchControl.setValue(searchString))
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
