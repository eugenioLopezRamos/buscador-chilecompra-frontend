import React, {PropTypes} from 'react';
import {Link} from 'react-router'; //these will later be links to the query that searches a particular licitacion, which gives more detailed info about it (on the
// "codigo licitacion" tab)
import {connect} from 'react-redux';
import objectAssign from 'object-assign';
import {bindActionCreators} from  'redux';
import * as types from '../constants/actionTypes';
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
import ResultsComparer from './resultComparer/ResultComparer.jsx'
import {RESULTS_INITIAL_CHECKBOXES} from '../constants/resultsInitialCheckboxes';
import userApi from '../api/userApi';
import ResultsNavigatorButtons from './ResultsNavigatorButtons';
import * as API from '../actions/fetchActions';
import * as helpers from '../helpers/searchResultsHelpers';

//TODO: Chunk this container a bit more
export class SearchResults extends React.PureComponent {

        constructor(props) {
            super(props);
            //Used to animate results loading - Otherwise only the first one gets an animation and the others don't 
            // (so, this toggles between two CSS classes with the same animations to achieve that)
            this.animClass = "search-results-ul1";
            this.resultTitles = null;
            this.components = {
                resultsComparer: ResultsComparer,
                objectDetails: ObjectDetails
            }
            this.state = {
                showModal: false,
                enteredSubscriptionName: "",
                subscriptionIndex: null,
                columns: RESULTS_INITIAL_CHECKBOXES,
                resultsSchema: {},
                fullScreenPane:{  
                    show: false,
                    component: null,
                    componentProps: {},
                    menu: null,
                    menuProps: {},
                }
            }

            this.mockResult = [{value: chileCompraResponseExample}];
        }

        componentWillReceiveProps(nextProps) {
            if(this.props.results != nextProps.results){
                this.animClass = this.animClass === "search-results-ul1" ? "search-results-ul2" : "search-results-ul1";
            }
        }

        changeColumns = (newColumns) => {
            this.setState({columns: newColumns});
        } 

        //TODO: Get this to a helper or something...
        applyFilter = (selectedItems, results) => {return helpers.applyFilter(selectedItems, results)}

        showObjectDetail = (objectData) => {

            let newFullScreenPane = objectAssign({}, this.state.fullScreenPane);
            newFullScreenPane.show = true;
            newFullScreenPane.component = this.components.objectDetails;
            newFullScreenPane.componentProps = {objectData};
            
            this.setState({
                fullScreenPane: newFullScreenPane
            })
        }



        hideFullScreenPane = () => {
            let newFullScreenPane = objectAssign({}, this.state.fullScreenPane);
            newFullScreenPane.show = false;
            newFullScreenPane.component = null;
            newFullScreenPane.componentProps = {};

            this.setState({fullScreenPane: newFullScreenPane})
        }

        getResultHistory = (resultIndex) => {
            let resultId = this.props.results.values[resultIndex].id;


            let newFullScreenPane = objectAssign({}, this.state.fullScreenPane);
            newFullScreenPane.show = true;
            newFullScreenPane.component = null;
            newFullScreenPane.componentProps = {};

            let executeAfter = () => {
                userApi.getResultHistory(resultId)
                        .then(response => { 
                                let newFullScreenPane = objectAssign({}, this.state.fullScreenPane)
                                newFullScreenPane.show = true;
                                newFullScreenPane.component = this.components.resultsComparer;
                                newFullScreenPane.componentProps = {results: response};

                                this.setState({
                                                fullScreenPane: newFullScreenPane
                                            });
                                });
            }

           this.setState({
                            fullScreenPane: newFullScreenPane
                        }, executeAfter)
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
            event.preventDefault();
            //TODO: See some way to make this work, on mobile the scrolling title looks janky and feels very
            //weird
      //     event.persist();
            
            let distance = event.target.scrollLeft;
            let self = this;
            if(event.nativeEvent.target.scrollLeft >= 0) {
                function move() {
                    //self.resultTitles.scrollLeft = distance;
                    self.resultTitles.style.transform = `translate(-${distance}px, 0)`
                    requestAnimationFrame(move)
                }
                requestAnimationFrame(move)
            }

            if(event.nativeEvent.target.scrollLeft < 0) {
                function stop() {
                    self.resultTitles.style.transform = `translate(0, 0)`;
                    cancelAnimationFrame(move);
                }
                requestAnimationFrame(move);
                //this.resultTitles.style.transform = `translate(0, 0)`   
            }
        }

        onSubscriptionNameInput = (event) => {
            this.setState({enteredSubscriptionName: event.target.value});
         }

        offsetChangeHandler = (value) => {
           


            let newQueryValues = objectAssign({}, this.props.searchQueryValues);
            let newOffset = newQueryValues.offset + value;
            
            if(newOffset >= this.props.results.count) {
                newOffset = parseInt(this.props.results.count/this.props.results.limit) * this.props.results.limit;
            }

            newQueryValues.offset = Math.max(0, newOffset);

            this.props.API.loadChilecompraData(newQueryValues);

         }
         setOffsetHandler = (offset) => {

            let newQueryValues = objectAssign({}, this.props.searchQueryValues);
            let newOffset = offset;

            //TODO: explain!

            if(newOffset >= this.props.results.count) {
                newOffset = parseInt(this.props.results.count/this.props.results.limit) * this.props.results.limit;
            }

            newQueryValues.offset = Math.max(0, newOffset);

            this.props.API.loadChilecompraData(newQueryValues);    
         }

         sortByColumn = (field, order) => {
             //client side sort currently not implemented - Will probably have to sort with mergeSort since it is stable
             let newQueryValues = helpers.sortByColumn(field, order, this.props.searchQueryValues);
             this.props.API.loadChilecompraData(newQueryValues);
         } 

         resultsNavigatorButtons = () => {
            return <ResultsNavigatorButtons 
                        pages={parseInt(this.props.results.count/this.props.results.limit)+1}
                        paginatorButtonClickHandler={this.offsetChangeHandler}
                        pageButtonClickHandler={this.setOffsetHandler}
                        currentPage={parseInt(this.props.results.offset/this.props.results.limit)}                                                       
                    />
            }


        render = () => {
        if(!this.props.results){
            return null;
        }
   
        if(this.props.results.count === 0) {
            return <span className={this.animClass}>
                        <div className="no-results">
                            No se encontraron resultados
                        </div>
                  </span>;            
        }
        
        else {
            let self = this;

           // TODO: See some way of taking this logic out?
           // Maybe make the titles one component and the rows another?
            let elementsToRender = this.applyFilter(this.state.columns, this.props.results.values);
            let titlesToRender = this.applyFilter(this.state.columns, this.mockResult);


  
            return (
            <div className="searchResults-container-div">

                    <JSONSchemaCheckboxes 
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
                
                    <div className="results-amount">Se encontraron {this.props.results.count} resultados: </div>
                    <div className="results-amount">
                        Mostrando resultados desde el {parseInt(this.props.results.offset) + 1} al {
                            //Math.max(1, this.props.results.count - (this.props.results.offset + this.props.results.limit))
                            Math.min(this.props.results.offset + this.props.results.limit, this.props.results.count)
                            }

                    </div>
                    <ul className={this.animClass}>
                        
                        {this.resultsNavigatorButtons()}
                      
                        <div className="results-data-container">
                            <div className="title-container" >   
                                <span className="movable-title-container" ref={(div) => {this.resultTitles = div}}>
                                    {        
                                        Object.keys(titlesToRender[0]).map((element,index) => {
                                            return <span className="search title col-xs-3 searchable" 
                                                         key={"title key" + index }
                                                    >
                                                        <div className="title-spans-container">
                                                            <span className="title-text">{utils.camelCaseToNormalCase(element)}</span>
                                                            <span className="glyphicon glyphicon-chevron-down filler"></span>
                                                            <span className="glyphicon glyphicon-chevron-down"
                                                                  onClick={() => {this.sortByColumn(this.state.columns[index], "descending")} }
                                                            >
                                                            </span>
                                                            <span className="glyphicon glyphicon-chevron-up"
                                                                  onClick={() => {this.sortByColumn(this.state.columns[index], "ascending")} }
                                                            ></span>
                                                        </div>
                                                    </span>
                                        })
                                    }
                                    <span className="search title col-xs-3 half" key={"historia-key"}>
                                        
                                        <span className="title-text">Historia</span>
                                        
                                    </span>
                                    <span className="search title col-xs-3 half" key={"subscribe-key"}>
                                        
                                        <span className="title-text">Suscribirse</span>
                                    </span>
                                </span>
                                    
                            </div>


                            <div className="results-li-container" onScroll={this.handleScroll}>
                            {
                            elementsToRender.map((row, index) => {
                                return <li className="search-results" key={index}>
                                    {
                                            Object.values(row).map((column, index) => {
                                                {/*if the column given is not a primitive, make a "link" to the items 
                                                (which really is just a FullScreenPane with the item details.
                                                As of this writing (March 2nd 2017) this only happens with Listado[0].Items*/}
                                                if(!utils.isPrimitive(column)) {
                                                    return <span className="search col-xs-3" key={"column key" + index}>
                                                                <a href="#" 
                                                                    onClick={(event) => {
                                                                                event.preventDefault(); 
                                                                                this.showObjectDetail(column)
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

                                            <span className="search col-xs-3 half" key={"result history key " + index } >
                                                <button className="btn btn-primary col-xs-12 result-history-button" onClick={() => {this.getResultHistory(index)}}>
                                                    Ver historia
                                                </button>
                                            </span>
                                            <span className="search col-xs-3 half" key={"suscripcion key " + index } >
                                                <button className="btn btn-primary col-xs-12 subscription-button" onClick={() => {this.showSubscriptionModal(index)}}>
                                                    Suscribirse
                                                </button>
                                            </span>

                                        </li>
                            })
                            }
                            </div>
                        </div>
             
                        {this.resultsNavigatorButtons()}


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
    API: bindActionCreators(API, dispatch)

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);