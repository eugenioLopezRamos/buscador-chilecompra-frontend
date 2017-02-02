import React, {PropTypes} from 'react';
import {Link} from 'react-router'; //these will later be links to the query that searches a particular licitacion, which gives more detailed info about it (on the
// "codigo licitacion" tab)
import {connect} from 'react-redux';
import objectAssign from 'object-assign';
import {bindActionCreators} from  'redux';
import * as types from '../actions/actionTypes';
//import {createUserSearches as createSearches} from '../actions/UserActions'; //no longer used, moved to <InputFieldsContainer />
import {createUserSubscription} from '../actions/UserActions';
import SearchesSaver from './SearchesSaver';
import Flash from './Flash.jsx';
import Modal from './inputs/Modal.jsx';
import JSONSchemaCheckboxes from './JSONSchemaCheckboxes.jsx';
import * as utils from '../utils/miscUtils';
import {chileCompraResponseExample} from '../utils/objectSchemaExamples';
import FullScreenPane from './FullScreenPane';
import ObjectDetails from './ObjectDetails';
import * as queryActions from '../actions/SearchQueryValuesActions';


//TODO: Chunk this container a bit more
class SearchResults extends React.PureComponent {

        constructor(props) {
            super(props);
            //Used to animate results loading - Otherwise only the first one gets an animation and the others don't 
            // (so, this toggles between two CSS classes with the same animations to achieve that)
            this.animClass = "search-results-ul1";
            this.resultTitles = null;
            this.state = {
                showModal: false,
                enteredSubscriptionName: "",
                subscriptionIndex: null,
                columns: [
                            ["FechaCreacion"],
                            ["Listado", "0", "Nombre"],
                            ["Listado", "0", "CodigoEstado"],
                            ["Listado", "0", "CodigoExterno"],
                        ],
                resultsSchema: {},
                fullScreenPane:{  
                    show: false,
                    component: ObjectDetails,
                    componentProps: {},
                    menu: null,
                    menuProps: {},
                }
            }
            
        }

        componentWillReceiveProps(nextProps) {
            if(this.props.results != nextProps.results){
                this.animClass = this.animClass === "search-results-ul1" ? "search-results-ul2" : "search-results-ul1";
            }
        }

        changeColumns = (newColumns, schema) => {
            this.setState({columns: newColumns, resultsSchema: schema});
        } 


        applyFilter = (selectedItems, results) => {

            let columns = results.map(currentResult => {
              
                let newObject = {};
                selectedItems.map(subElement => {
                //selectedItems is an array of arrays! Need to flatten.
                    return subElement.reduce((prev, curr, currIndex) => {

                    //on the last item, do special stuff
                    if(currIndex === subElement.length -1) {
                        let value = "No incluye campo o está vacío";
                        try { value = prev[curr] }
                        catch(error){value = "No incluye campo o está vacío"};

                        //Some fields(keys of the JSON object) exist more than once, on different levels of "deepness" within
                        // the object's structure. In this case, we append the previous key, to make it
                        // easier to differentiate them
                        if(newObject[curr]) {
                            let previousItemKey = subElement[currIndex-1] ? subElement[currIndex-1] : "Base";
                            if(utils.isOnlyNumbers(previousItemKey)) {
                                previousItemKey = `${parseInt(previousItemKey) + 1})`;
                            }
                            return newObject[`${previousItemKey}${curr}`] = value;
                        }
                        return newObject[curr] = value;
                    }

                    return prev[curr];

                    }, currentResult.value);
                })
                
                return newObject;
            });

            return columns;
        }

        showFullScreenPane = (objectData) => {

            let newFullScreenPane = objectAssign({}, this.state.fullScreenPane);
            newFullScreenPane.show = true;
            newFullScreenPane.componentProps = {objectData};
            
            this.setState({
                fullScreenPane: newFullScreenPane
            })
        }



        hideFullScreenPane = () => {
            let newFullScreenPane = objectAssign({}, this.state.fullScreenPane);
            newFullScreenPane.show = false;

            this.setState({fullScreenPane: newFullScreenPane})
        }

        //Normally this.props.estadosLicitacion is a number (the codigo_estado)
        returnNombreEstado = (codigoEstado) => {
            let swappedEstLic = {}

            Object.values(this.props.estadosLicitacion).map((e,i) => {
                swappedEstLic[e] = Object.keys(this.props.estadosLicitacion)[i];
            });

            return swappedEstLic[codigoEstado];
        }

        showSubscriptionModal = (index) => {

            this.setState({showModal: true, subscriptionIndex: index})
        }

        hideSubscriptionModal = () => {
            this.setState({showModal: false, subscriptionIndex: null});
        }

        handleSubscription = () => {
           let index = this.state.subscriptionIndex;
           let resultId = this.props.results.values[index].id;
           let subscriptionName = this.state.enteredSubscriptionName;
           this.setState({showModal: false, enteredSubscriptionName: ""}) 
           this.props.createUserSubscription(resultId, subscriptionName)
        }

        handleScroll = (event) => {
            if(event.nativeEvent.target.scrollLeft >= 0) {
                this.resultTitles.style.transform = `translate(-${event.nativeEvent.target.scrollLeft}px, 0)` 
                
            }
            if(event.nativeEvent.target.scrolLeft < 0) {
                this.resultTitles.style.transform = `translate(0, 0)`   
            }
        }

        onSubscriptionNameInput = (event) => {
            this.setState({enteredSubscriptionName: event.target.value});
         }

        render = () => {
        if(!this.props.results){
            return null;
        }

        if(this.props.results.values.count === 0) {
            return <span className={this.animClass}>No se encontraron resultados</span>;            
        }

        else {
            let self = this;
            let mockResult = [{value: chileCompraResponseExample}];
            let titlesToRender = this.applyFilter(this.state.columns, mockResult);
            let elementsToRender = this.applyFilter(this.state.columns, this.props.results.values);
  
            return (
            <div className="searchResults-container-div">

                    <JSONSchemaCheckboxes 
                        results={this.props.results.values}
                        changeColumns={this.changeColumns}
                    />            
                        
                    <Modal 
                        isModalShown={this.state.showModal} 
                        modalValue={this.state.enteredSubscriptionName}
                        handler={this.handleSubscription}
                        hideModal={this.hideSubscriptionModal}
                        onInput={this.onSubscriptionNameInput}           
                    />            
                    
                    <FullScreenPane 
                        show={this.state.fullScreenPane.show}
                        hide={this.hideFullScreenPane}
                        component={this.state.fullScreenPane.component} 
                        componentProps={this.state.fullScreenPane.componentProps}
                        menu={this.state.menu}  

                    
                    

                    />
                
                    <div className="cantidad-resultados">Se encontraron {this.props.results.count} resultados: </div>
                    <ul className={this.animClass}>
                        
                        <label>Mostrar desde:</label>
                        <input type="input" placeholder="Valor desde donde iniciar"/>
                        <button>Anterior</button>
                        <button>Siguiente</button>

                        <div className="results-data-container">
                            <div className="title-container" >   
                              <span className="movable-title-container" ref={(div) => {this.resultTitles = div}}>
                                {        
                                    Object.keys(titlesToRender[0]).map((element,index) => {
                                        return <span className="search title col-xs-3" key={"title key" + index }>
                                                    {utils.camelCaseToNormalCase(element)}
                                                </span>
                                    })
                                }
                                <span className="search title col-xs-3" key={"subscribe-key"}>
                                    Subscribirse?
                                </span>
                             </span>
                                
                            </div>

                            <div className="results-li-container" onScroll={this.handleScroll}>
                            {
                            elementsToRender.map((row, index) => {
                                return <li className="search-results" key={index}>
                                    {
                                        Object.values(row).map((column, index) => {
                                            if(!utils.isPrimitive(column)) {
                                                return <span className="search col-xs-3" key={"column key" + index}>
                                                            <a href="#" 
                                                                onClick={(event) => {
                                                                            event.preventDefault(); 
                                                                            this.showFullScreenPane(column)
                                                                            }
                                                                        }
                                                            >
                                                                Ver detalle
                                                            </a>
                                                        </span>
                                            }

                                            return <span className="search col-xs-3" key={"column key" + index}>
                                                        {column ? column : "Sin información"}
                                                </span>
                                        })
                                    }
                                        <span className="search col-xs-3" key={"suscripcion key " + index } >
                                            <button className="btn btn-primary col-xs-12 subscription-button" onClick={() => {this.showSubscriptionModal(index)}}>
                                                Suscribirse
                                            </button>
                                        </span>

                                        </li>
                            })
                            }
                            </div>
                        </div>
                        <label>Mostrar desde:</label>
                        <input type="input" placeholder="Valor desde donde iniciar"/>
                        <button>Anterior</button>
                        <button>Siguiente</button>




                        </ul>
                </div>
                    );
        }
    }                     
}

function mapStateToProps(state, ownProps) {
    return {
        estadosLicitacion: state.estadosLicitacion,

    }
}

function mapDispatchToProps(dispatch) {
  return {
    createUserSubscription: bindActionCreators(createUserSubscription, dispatch),
    queryActions: bindActionCreators(queryActions, dispatch)

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);