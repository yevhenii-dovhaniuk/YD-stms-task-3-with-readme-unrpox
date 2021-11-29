import { selectAllFilteredOrders } from './orders.selectors';

describe('selectAllFilteredOrders', () => {
    it('should correctly filter the orders', () => {
        const state = {
            orders: {
                ids: ['1'],
                entities: {
                    1: {a: 'b'}
                },
                searchString: 'b'
            }
        };
        const selectedOrders = selectAllFilteredOrders(state);
        expect(selectedOrders.length).toEqual(1);

        const nonMatchState = {
            orders: {
                ...state.orders,
                searchString: 'c'
            }
        };
        const selectedNonMatchOrders = selectAllFilteredOrders(nonMatchState);
        expect(selectedNonMatchOrders.length).toEqual(0);
    });

    it('should return all orders in case of empty search string', () => {
        const state = {
            orders: {
                ids: ['1'],
                entities: {
                    1: {a: 'b'}
                },
                searchString: ''
            }
        };

        const selectedOrders = selectAllFilteredOrders(state);
        expect(selectedOrders.length).toEqual(1);
    });

    it('should search only among string values', () => {
        const state = {
            orders: {
                ids: ['1', '2', '3'],
                entities: {
                    1: {a: 5},
                    2: {c: '5'},
                    3: {d: {e: '5'}}
                },
                searchString: '5'
            }
        };

        const selectedOrders = selectAllFilteredOrders(state);
        expect(selectedOrders.length).toEqual(1);
    });
})
