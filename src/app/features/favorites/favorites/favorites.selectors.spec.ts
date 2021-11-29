import { selectEntitiesWithFavorites } from './favorites.selectors';

describe('selectEntitiesWithFavorites', () => {
    it('should correctly select only entities that are marked as favorite', () => {
        const state = {
            feature1: {
                ids: [1, 2, 3],
                entities: {
                    1: {isInFavorites: true, a: 'b'},
                    2: {isInFavorites: false},
                    3: {isInFavorites: false},
                },
                favoritesEntityTranslationKey: 'key1',
                columnDefinitions: [],
                displayedColumnDefinitions: []
            },
            feature2: {
                ids: [4,5,6],
                entities: {
                    4: {isInFavorites: true, c: 'd'},
                    5: {isInFavorites: false},
                    6: {isInFavorites: false},
                },
                favoritesEntityTranslationKey: 'key2',
                columnDefinitions: [],
                displayedColumnDefinitions: []
            },
            favorites: {
                globalSearchString: ''
            }
        };

        const selected = selectEntitiesWithFavorites(state) as any[];
        expect(selected[0].filteredTableData[0].a).toEqual('b');
        expect(selected[1].filteredTableData[0].c).toEqual('d');
    });

    it('should ignore features that do not have favoritesEntityTranslationKey', () => {
        const state = {
            feature1: {
                ids: [1, 2, 3],
                entities: {
                    1: {isInFavorites: true, a: 'b'},
                    2: {isInFavorites: false},
                    3: {isInFavorites: false},
                },
                favoritesEntityTranslationKey: '',
                columnDefinitions: [],
                displayedColumnDefinitions: []
            },
            feature2: {
                ids: [4,5,6],
                entities: {
                    4: {isInFavorites: true, c: 'd'},
                    5: {isInFavorites: false},
                    6: {isInFavorites: false},
                },
                favoritesEntityTranslationKey: 'key2',
                columnDefinitions: [],
                displayedColumnDefinitions: []
            },
            favorites: {
                globalSearchString: ''
            }
        };

        const selected = selectEntitiesWithFavorites(state) as any[];
        expect(selected[0].filteredTableData[0].c).toEqual('d');
    });

    it('should correctly filter down the results that contain globalSearchString', () => {
        const state = {
            feature1: {
                ids: [1, 2, 3],
                entities: {
                    1: {isInFavorites: true, a: 'b'},
                    2: {isInFavorites: false},
                    3: {isInFavorites: false},
                },
                favoritesEntityTranslationKey: 'key1',
                columnDefinitions: [],
                displayedColumnDefinitions: []
            },
            feature2: {
                ids: [4,5,6],
                entities: {
                    4: {isInFavorites: true, c: 'def'},
                    5: {isInFavorites: false},
                    6: {isInFavorites: false},
                },
                favoritesEntityTranslationKey: 'key2',
                columnDefinitions: [],
                displayedColumnDefinitions: []
            },
            favorites: {
                globalSearchString: 'd'
            }
        };

        const selected = selectEntitiesWithFavorites(state) as any[];
        console.log(JSON.stringify(selected));
        expect(selected[0].filteredTableData.length).toEqual(0);
        expect(selected[1].filteredTableData.length).toEqual(1);
        expect(selected[1].filteredTableData[0].c).toEqual('def');
    });

    it('should perform case-insensitive search', () => {
        const state = {
            feature1: {
                ids: [1, 2, 3],
                entities: {
                    1: {isInFavorites: true, a: 'b'},
                    2: {isInFavorites: false},
                    3: {isInFavorites: false},
                },
                favoritesEntityTranslationKey: 'key1',
                columnDefinitions: [],
                displayedColumnDefinitions: []
            },
            feature2: {
                ids: [4,5,6],
                entities: {
                    4: {isInFavorites: true, c: 'def'},
                    5: {isInFavorites: false},
                    6: {isInFavorites: false},
                },
                favoritesEntityTranslationKey: 'key2',
                columnDefinitions: [],
                displayedColumnDefinitions: []
            },
            favorites: {
                globalSearchString: 'D'
            }
        };

        const selected = selectEntitiesWithFavorites(state) as any[];
        console.log(JSON.stringify(selected));
        expect(selected[0].filteredTableData.length).toEqual(0);
        expect(selected[1].filteredTableData.length).toEqual(1);
        expect(selected[1].filteredTableData[0].c).toEqual('def');
    });
});
