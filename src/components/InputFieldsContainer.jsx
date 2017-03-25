import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {helpers} from '../helpers/inputFieldsContainerHelper';
//import * as displayActions from '../actions/DisplayActions';
import {bindActionCreators} from 'redux';
import SearchResults from './SearchResults.jsx';
import DateField from './inputs/DateField.jsx';
import SelectionField from './inputs/SelectionField.jsx';
import AutoFillerInput from './inputs/AutoFillerInput.jsx';
import SearchField from './inputs/SearchField.jsx';
import SearchesSaver from './SearchesSaver';
import Flash from './Flash.jsx';
import moment from 'moment';
import {RESULTS_INITIAL_CHECKBOXES_ORDER_BY} from '../constants/resultsInitialCheckboxes';


import {createUserSearches as createSearches} from '../actions/UserActions';
import * as API from '../actions/fetchActions';


export class InputFieldsContainer extends React.PureComponent {
    constructor(props) {
 
        super(props);
        this.showResults = (() => {
            let prop = props.showSearchResultsComponent 
            if(prop === false){
                return false;
            }
            return true;

        })();
        
        const inputFieldsOffset = 0;
        const initialFieldsOrderBy = RESULTS_INITIAL_CHECKBOXES_ORDER_BY;
        this.helpers = helpers;
        // la otra opcion es usar un estado en que se trae todo desde el inicial y se añade el 
        // organismosPublicosFilteredSubset
        this.state = {
           ...this.props.defaultValues.defaultState,
           organismosPublicosFilteredSubset: this.props.organismosPublicos,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        //TODO: There is probably some better way to do this.
        // In any case, these shouldn't change since the fetch request to do this is only called
        // when successfully logging in (with a componentWillReceiveProps callback on <Root />)
        if(nextProps.organismosPublicos != this.props.organismosPublicos) {
            this.setState({organismosPublicosFilteredSubset: nextProps.organismosPublicos});
        }
    }
    //TODO: rename this function and this.props.createSearches
    // - They actually handle creating OR updating a search,
    // depending on the props passed to InputFieldsContainer
    handleCreateSearches = (args) => {

        //TODO: Change this function's name to handleCreateOrUpdateSearches ?
        //When creating a search, args is a NAME that is given by typing into any
        //inputfield
        // When updating, it is an array with the searchName and searchId, used to locate
        //the search on the backend

        //If args === "Array"-> apply the arguments.
        //else it means args is just a name, so pass it to the handler

        if(Object.prototype.toString.call(args) ==="[object Array]") {
           return this.props.createSearches.call(null, this.state, ...args)
        }
        //just for clarity.
        let name = args;
        this.props.createSearches(this.state, name);
    }

    setStartDate = (value) => {
        this.setState(this.helpers.setStartDate(value));
    }
    setEndDate = (value) => {
        this.setState(this.helpers.setEndDate(value));
    }

    toggleDateAlwaysFromToday = () => {
        this.setState(this.helpers.toggleDateAlwaysFromToday(this.state.alwaysFromToday));
    }

    toggleDateAlwaysToToday = () => {
        this.setState(this.helpers.toggleDateAlwaysToToday(this.state.alwaysToToday));
    }

    estadoLicitacionSelect = ({value}) => {
        this.setState(this.helpers.estadoLicitacionSelect(value))
    }
    
    pickOrganismoPublico = (value) => {
        this.setState(this.helpers.pickOrganismoPublico(value));
    }
    
    rutInput = (event) => {
        this.setState(this.helpers.rutInput(event.target.value));
    }

    codigoLicitacionInput = (event) => {
        this.setState(this.helpers.codigoLicitacionInputChange(event.target.value));
    }

    palabrasClaveInput = (value) => {
        this.setState(this.helpers.palabrasClaveInput(value));
    }

    handleSubmit = () => {

      this.props.API.loadChilecompraData(this.state);
      
    }

    render = () => {
        console.log("tis", this.state.selectedEstadoLicitacion)
        return (    
              
                    <div className="container inputfields jumbotron"> 
                        <Flash 
                            type="info" 
                            messages={this.props.messages}
                            messagesHandler={this.state.messagesHandler}
                        />
                        <div className="fixed-size-searchTab-container">
                        <label className="date-range">Selecciona un rango de fechas:</label>
                            <DateField
                                startDate={moment(this.state.startDate)}
                                endDate={moment(this.state.endDate)} 

                                setStartDate={this.setStartDate}
                                setEndDate={this.setEndDate}

                                toggleDateAlwaysFromToday={this.toggleDateAlwaysFromToday}
                                toggleDateAlwaysToToday={this.toggleDateAlwaysToToday}

                                alwaysFromToday={this.state.alwaysFromToday}
                                alwaysToToday={this.state.alwaysToToday}
                            />

                            <label className="select-licitacion">Estado de la licitación (código estado)</label>
                                <SelectionField 
                                    selected={this.state.selectedEstadoLicitacion}
                                    estadosLicitacion={this.props.estadosLicitacion}
                                    onChange={this.estadoLicitacionSelect} 
                                />

                            <label className="select-orgPub">Según comprador (código organismo público)</label>
                                <AutoFillerInput 
                                    organismosPublicos={this.props.organismosPublicos}
                                    organismosPublicosFilter={this.state.organismosPublicosFilter}
                                    organismosPublicosFilteredSubset={this.state.organismosPublicosFilteredSubset}
                                    selectedOrganismoPublico={this.state.selectedOrganismoPublico} 

                                    onSelectionChange={this.pickOrganismoPublico}
                                />

                            <label className="rut-proveedor">Según RUT proveedor</label>
                            <input
                                id="rut-proveedor"
                                className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                                key="rut-proveedor" 
                                placeholder="Ejemplo: 1.111.111-1"
                                defaultValue={this.state.rutProveedor} 
                                onChange={this.rutInput}
                            />
                        
                            <label className="codigo-licitacion">Código de licitación</label>
                            <input 
                                id="codigo-licitacion"
                                className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                                key="cod-licitacion" 
                                placeholder="Buscar por código de licitación"
                                defaultValue={this.state.codigoLicitacion}

                                onChange={this.codigoLicitacionInput}
                            />
                            
                            
                            <label className="palabras-clave">Según palabras clave</label>
                                <SearchField 
                                    value={this.state.palabrasClave} 
                                    onChange={this.palabrasClaveInput} 
                                    onSubmit={this.handleSubmit} 
                                />
                                
                            {< this.props.saveMenu
                                handleSearches={this.handleCreateSearches}
                                defaultName={this.props.defaultSearchName}
                                defaultId={this.props.defaultSearchId}
                             />}

                        </div>
                        {
                            this.showResults ? 
                                <div className="col-xs-12 no-gutter">
                                    <SearchResults searchQueryValues={this.props.searchQueryValues} results={this.props.searchResults}/>
                                </div> 
                                :
                                null              
                        }

                        
                    </div>        
        );
   }
}

InputFieldsContainer.propTypes = {

    searchResults: PropTypes.object,
    organismosPublicos: PropTypes.array.isRequired,
    estadosLicitacion: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {

    return {
        searchResults: state.searchResults,
        organismosPublicos: state.organismosPublicos,
        estadosLicitacion: state.estadosLicitacion,
        searchQueryValues: state.searchQueryValues,
        messages: state.messages
        
    };
};
//TODO: trim this;
function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(actions, dispatch),
  // API: bindActionCreators(API, dispatch),
   // displayActions: bindActionCreators(displayActions, dispatch),
  //  createSearches: bindActionCreators(createSearches, dispatch),
   // createResults: bindActionCreators(createResults, dispatch),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(InputFieldsContainer);
export default connect(mapStateToProps, mapDispatchToProps)(InputFieldsContainer);
