import { selectAllFilteredPatients } from './patients.selectors';

describe('selectAllFilteredPatients', () => {
    it('should correctly filter the patients', () => {
        const state = {
            patients: {
                ids: ['1'],
                entities: {
                    1: {a: 'b'}
                },
                searchString: 'b'
            }
        };
        const selectedPatients = selectAllFilteredPatients(state);
        expect(selectedPatients.length).toEqual(1);

        const nonMatchState = {
            patients: {
                ...state.patients,
                searchString: 'c'
            }
        };
        const selectedNonMatchPatients = selectAllFilteredPatients(nonMatchState);
        expect(selectedNonMatchPatients.length).toEqual(0);
    });

    it('should return all patients in case of empty search string', () => {
        const state = {
            patients: {
                ids: ['1'],
                entities: {
                    1: {a: 'b'}
                },
                searchString: ''
            }
        };

        const selectedPatients = selectAllFilteredPatients(state);
        expect(selectedPatients.length).toEqual(1);
    });

    it('should search only among string values', () => {
        const state = {
            patients: {
                ids: ['1', '2', '3'],
                entities: {
                    1: {a: 5},
                    2: {c: '5'},
                    3: {d: {e: '5'}}
                },
                searchString: '5'
            }
        }

        const selectedPatients = selectAllFilteredPatients(state);
        expect(selectedPatients.length).toEqual(1);
    });
})
