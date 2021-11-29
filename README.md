# Orders, Patients and Favorites

## What's added

- `/src/app/features/favorites` - the whole module
- `/src/app/features/orders` - state management + service
- `/src/app/features/patients` - state management + service
- `/src/shared/models` - favorites model
- `/src/app/features/*.spec.ts` - some tests!

## Adding one more entity (e.g. Doctors)
- Implement `StateWithFavoritesCapability<T>` interface for feature Store

- Add `favoritesEntityTranslationKey` to the store

- In reducer:
```typescript
export const newEntityFavoritesAdapter = createFavoritesAdapter<State, FavoriteableEntity<NewEntity>>('New Entity');

// boilerplate code ...
export const newEntityReducer = createReducer<State>(initialState,
    ...
    on(searchOrders, (state, action) => ({...state, searchString: action.searchString})),
    newEntityFavoritesAdapter.favoriteStateReducer // add this line
);
```
- In your component:
```typescript
export class MyEntityComponent {
    toggleFavouriteState(newEntity: FavoriteableEntity<NewEntity>) {
        this.store.dispatch(newEntityFavoritesAdapter.toggleFavoriteState({entity: newEntity}));
    }
}
```

- Well done! You are good to go

## What's under the hood
`createFavoritesAdapter` return action and corresponding reducer that can handle this action.
The reducer function uses entityAdapter to replace the data row "in place".
