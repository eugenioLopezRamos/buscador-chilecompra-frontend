import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import moment from 'moment';
import searchQueryValuesReducer from '../searchQueryValuesReducer';


describe('Reducer', () => {
    describe('searchQueryValuesReducer', () => {
        it('Should return the correct states', () => {

            const reducer = searchQueryValuesReducer;

            let action = {type: undefined, query: undefined};
            let initialValue = initialState.searchQueryValues;

            // same as initialValue at definition, will change later;
            let queryValues = {
                organismosPublicosFilter: "",
                selectedOrganismoPublico: "*",
                organismosPublicosFilteredSubset: [{"*":"Todos"}],
                codigoLicitacion: "",
                startDate: "1234",
                alwaysFromToday: false,
                endDate: "1234",
                alwaysToToday: false,
                palabrasClave: "",
                selectedEstadoLicitacion: "",
                rutProveedor: "",
                offset: 0,
                order_by: {fields: ["mockField"], order: "descending"}
            }
            // should return initialState;
            expect(initialValue).toEqual(reducer(undefined, action));


            //FETCH CHILECOMPRA DATA
                //SUCCESS
            action = {type: types.FETCH_CHILECOMPRA_DATA_SUCCESS, query: queryValues};
            queryValues.organismosPublicosFilter = "my very own filter";

            let expectedValue = objectAssign({}, initialValue, queryValues);
            expect(expectedValue).toEqual(reducer(undefined, action));

                //FAILURE
            action = {type: types.FETCH_CHILECOMPRA_DATA_FAILURE, query: queryValues};
            expect(expectedValue).toEqual(reducer(undefined, action));

            let filteredOrganismos = {1: "Org 1", 2: "Org 2"};

            //FETCH ORGANISMOS PUBLICOS
            action = {type: types.ONLOAD_FETCH_ORG_PUB_SUCCESS, value: filteredOrganismos};
            expectedValue = objectAssign({}, initialValue, {organismosPublicosFilter: ""}, {organismosPublicosFilteredSubset: filteredOrganismos});
            expect(expectedValue).toEqual(reducer(undefined, action));




        });
    });
})