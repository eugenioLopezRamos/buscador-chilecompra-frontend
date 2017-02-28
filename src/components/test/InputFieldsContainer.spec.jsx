import React from 'react';
import {shallow} from 'enzyme';
import {InputFieldsContainer} from '../InputFieldsContainer';
import {helpers} from '../../helpers/inputFieldsContainerHelper';
import SearchesSaver from '../SearchesSaver';
import initialState from '../../reducers/initialState';
import moment from 'moment';
import objectAssign from 'object-assign';

function setup() {
        const searchResults = null;
        const organismosPublicos =  [{"*": "Todos"},  {111: "Organismo 1"}, {222: "Organismo 2"}];
        const estadosLicitacion = {111: "Estado 1", 222: "Estado 2"};
        const searchQueryValues =  initialState.searchQueryValues;
        const messages = initialState.messages;

    const props = {
        searchResults,
        organismosPublicos,
        estadosLicitacion,
        searchQueryValues,
        messages,
        saveMenu: SearchesSaver,
        defaultValues: {defaultState: initialState.searchQueryValues}
    }

    const wrapper = shallow(<InputFieldsContainer {...props}/>);


    return {
        wrapper,
        props
    }
}



describe('Container', () => {


    describe('InputFieldsContainer', () => {
        const {wrapper, props} = setup();
        const instance = wrapper.instance();
        const state = instance.state;
        const minuteInMs = 60 * 1000;
        //TODO: Add sinon console.error stubs...

        it('Should render self and subcomponents', () => {
            //root
            expect(wrapper.find('div.container.inputfields.jumbotron').length).toEqual(1);
            //Flash
            const flash = wrapper.find('Flash'); 
            expect(flash.length).toEqual(1);
            expect(flash.props().type).toEqual("info");
            expect(flash.props().messages).toEqual(props.messages);
            expect(flash.props().messagesHandler).toEqual(state.messagesHandler);
            // search fields
            expect(wrapper.find('div.fixed-size-searchTab-container').length).toEqual(1);
            //DatePicker
            expect(wrapper.find('label.date-range').length).toEqual(1);
            const dateField = wrapper.find('DateField');
            expect(dateField.length).toEqual(1);
            //TODO: DatePicker props
            //measuring dates by margin of error since moment changes every time its called;
            expect(dateField.props().startDate - state.startDate < minuteInMs).toBe(true);
            expect(dateField.props().endDate - state.endDate < minuteInMs).toBe(true);
            expect(dateField.props().setStartDate).toEqual(instance.setStartDate);
            expect(dateField.props().setEndDate).toEqual(instance.setEndDate);
            expect(dateField.props().toggleDateAlwaysFromToday).toEqual(instance.toggleDateAlwaysFromToday);
            expect(dateField.props().toggleDateAlwaysToToday).toEqual(instance.toggleDateAlwaysToToday);
            
            //select Estado licitacion
            expect(wrapper.find('label.select-licitacion').length).toEqual(1);
            const selectionField = wrapper.find('SelectionField');
            expect(selectionField.length).toEqual(1);
            expect(selectionField.props().estadosLicitacion).toEqual(props.estadosLicitacion);
            expect(selectionField.props().onChange).toEqual(instance.estadoLicitacionSelect);

            // select Organismo Publico
            expect(wrapper.find('label.select-orgPub').length).toEqual(1);
            const autoFiller = wrapper.find('AutoFillerInput');
            expect(autoFiller.length).toEqual(1);
            expect(autoFiller.props().organismosPublicos).toEqual(props.organismosPublicos);
            expect(autoFiller.props().organismosPublicosFilter).toEqual(state.organismosPublicosFilter);
            expect(autoFiller.props().organismosPublicosFilteredSubset).toEqual(state.organismosPublicosFilteredSubset);
            expect(autoFiller.props().selectedOrganismoPublico).toEqual(state.selectedOrganismoPublico);
            expect(autoFiller.props().onSelectionChange).toEqual(instance.pickOrganismoPublico);
            expect(autoFiller.props().onInputChange).toEqual(instance.autoFillerInputChange);

            //rut proveedor
            expect(wrapper.find('label.rut-proveedor').length).toEqual(1);
            const rutProveedor = wrapper.find('input#rut-proveedor');
            expect(rutProveedor.props().className).toEqual("col-xs-12 col-md-10 col-lg-4 no-gutter")
            expect(rutProveedor.props().placeholder).toEqual("Ejemplo: 1.111.111-1");
            expect(rutProveedor.props().defaultValue).toEqual(state.rutProveedor);
            expect(rutProveedor.props().onChange).toEqual(instance.rutInput);

            // codigo licitacion
            expect(wrapper.find('label.codigo-licitacion').length).toEqual(1);
            const codigoLicitacion = wrapper.find('input#codigo-licitacion');
            expect(codigoLicitacion.props().className).toEqual("col-xs-12 col-md-10 col-lg-4 no-gutter");
            expect(codigoLicitacion.props().placeholder).toEqual("Buscar por código de licitación");
            expect(codigoLicitacion.props().defaultValue).toEqual(state.codigoLicitacion);
            expect(codigoLicitacion.props().onChange).toEqual(instance.codigoLicitacionInput);

            // palabras clave
            expect(wrapper.find('label.palabras-clave').length).toEqual(1);
            const searchField = wrapper.find('SearchField');
            expect(searchField.props().value).toEqual(state.palabrasClave);
            expect(searchField.props().onChange).toEqual(instance.palabrasClaveInput);
            expect(searchField.props().onSubmit).toEqual(instance.handleSubmit);

            // SearchesSaver
            const searchesSaver = wrapper.find('SearchesSaver');
            expect(searchesSaver.length).toEqual(1);
            expect(searchesSaver.props().handleSearches).toEqual(instance.handleCreateSearches);
            //TODO: Check into these 2, I think they're not used anymore
            expect(searchesSaver.props().defaultSearchName).toEqual(props.defaultSearchName);
            expect(searchesSaver.props().defaultId).toEqual(props.defaultSearchId);

            // SearchResults
            const searchResults = wrapper.find('Connect(SearchResults)');
            expect(searchResults.props().searchQueryValues).toEqual(props.searchQueryValues);
            expect(searchResults.props().results).toEqual(props.searchResults);

        });

        it('Should correctly call functions', () => {
            let expectedStateChange;

            function checkIfFunctionCalled(target, action, actionArgs, expectedStateChange) {


               const initialState = instance.state;

                if(Object.prototype.toString.call(actionArgs) === "[object Array]") {
                    target.props()[action].call(null, ...actionArgs);
                }
                else {
                    target.props()[action](actionArgs);
                }

                expect(instance.state).toEqual(objectAssign(initialState, expectedStateChange))
            }

            //DateField
            const dateField = wrapper.find('DateField');
            //set startDate
            let expectedStartDate = Object.freeze(moment());
            expectedStateChange = {startDate: expectedStartDate};
            checkIfFunctionCalled(dateField, "setStartDate", expectedStartDate, expectedStateChange);
            //set endDate
            let expectedEndDate = Object.freeze(moment());
            expectedStateChange = {endDate: expectedEndDate};
            checkIfFunctionCalled(dateField, "setEndDate", expectedEndDate, expectedStateChange);
            //toggle always from today
            let expectedDate = Object.freeze(moment());
            expectedStateChange = {
                alwaysFromToday: !instance.state.alwaysFromToday,
                alwaysToToday: !instance.state.alwaysToToday,
                startDate: expectedDate,
                endDate: expectedDate
            }
            checkIfFunctionCalled(dateField, "toggleDateAlwaysFromToday", instance.state.alwaysFromToday, expectedStateChange);
            
            //toggle always To Today
            expectedDate = Object.freeze(moment());
            expectedStateChange = {
                alwaysToToday: !instance.state.alwaysToToday,
                endDate: expectedDate
            }
            checkIfFunctionCalled(dateField, "toggleDateAlwaysToToday", instance.state.alwaysToToday, expectedStateChange);

            // //Estados Licitaacion

            const selectionField = wrapper.find('SelectionField');
    
            let possibleValues = Object.keys(props.estadosLicitacion)
                                       .map((key, index, array) => {
                                            return {[key]: array[key]}
                                        });

            let expectedValue;
            possibleValues.forEach(value => {
                expectedStateChange = {
                    selectedEstadoLicitacion: value
                };
                checkIfFunctionCalled(selectionField, "onChange", {target: {value}}, expectedStateChange);
            });

            // //autoFiller
            



            //     onSelectionChange={this.pickOrganismoPublico}
            //     onInputChange={this.autoFillerInputChange}
            // //rutInput
            //     onChange={this.rutInput}

            // //searchField
            //     onChange={this.palabrasClaveInput} 
            //     onSubmit={this.handleSubmit} 
            // //saveMenu
            //     handleSearches={this.handleCreateSearches}

        });


    });


});