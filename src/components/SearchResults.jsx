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
import ResultsComparer from './ResultComparer.jsx'
import {RESULTS_INITIAL_CHECKBOXES} from '../constants/resultsInitialCheckboxes';
import userApi from '../api/userApi';
import ResultsNavigatorButtons from './ResultsNavigatorButtons';
import * as API from '../actions/fetchActions';

//TODO: Chunk this container a bit more
class SearchResults extends React.PureComponent {

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
            
        }

        componentWillReceiveProps(nextProps) {
            if(this.props.results != nextProps.results){
                this.animClass = this.animClass === "search-results-ul1" ? "search-results-ul2" : "search-results-ul1";
            }
        }

        changeColumns = (newColumns, schema) => {
            this.setState({columns: newColumns, resultsSchema: schema});
        } 

        //TODO: Get this to a helper or something...
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
            if(event.nativeEvent.target.scrollLeft >= 0) {
                this.resultTitles.style.transform = `translate(-${event.nativeEvent.target.scrollLeft}px, 0)` 
                
            }
            if(event.nativeEvent.target.scrollLeft < 0) {
                this.resultTitles.style.transform = `translate(0, 0)`   
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
         //Currently disabled. It works, but the results are not stable so it looks really weird.
         // Once I solve the stability issue, this should be used 
         //when the totalresults count is <= 200 (or whatever the limit is)

           // So, here we'll have 2 ways of sorting. 
           // If results.count > {RESULTS_OFFSET_AMOUNT} from /src/constants/resultsOffset.js (as of this writing, 200)
           // send a request to the server, get the results again, order them, THEN send them back over to frontend
           // If results.count <= limit hacerlo local (that is, in the frontend)


           // This is done HERE: 
                    // if(this.props.results.count <= 200) {
                    //   //  alert("menor q 200");
                    //     let results = this.props.results;
                    //     return someFile.sortResultsInFrontend(results, field, order);

                    
                    // }
            // However the sort is not stable so it looks weird when you make it "change"
            // by spamming click on column X (which stays as is), which makes the other columns
            // move around

            let newQueryValues = objectAssign({}, this.props.searchQueryValues);
            // object assign doesnt deep clone.
            newQueryValues.order_by = objectAssign({}, this.props.searchQueryValues.order_by)
            newQueryValues.order_by.order = order;
       

            newQueryValues.order_by.fields = field;
      
            this.props.API.loadChilecompraData(newQueryValues);
         }


        render = () => {
        if(!this.props.results){
            return null;
        }
   
        if(this.props.results.count === 0) {
            return <span className={this.animClass}>No se encontraron resultados</span>;            
        }
        
        else {
            let self = this;
            let mockResult = [{value: chileCompraResponseExample}];
            let titlesToRender = this.applyFilter(this.state.columns, mockResult);
            let elementsToRender = this.applyFilter(this.state.columns, this.props.results.values);

            let resultsNavigatorButtons = () => {
                                                return <ResultsNavigatorButtons 
                                                            pages={parseInt(this.props.results.count/this.props.results.limit)+1}
                                                            paginatorButtonClickHandler={this.offsetChangeHandler}
                                                            pageButtonClickHandler={this.setOffsetHandler}
                                                            currentPage={parseInt(this.props.results.offset/this.props.results.limit)}
                                                            
                                                            fromInputBoxDefaultValue={null}
                                                            onFromInputBoxInput={this.fromInputBoxInputHandler}
                                                            onFromInputButtonClick={this.getFromOffset}
                                                        />
                                                }
  
            return (
            <div className="searchResults-container-div">

                    <JSONSchemaCheckboxes 
                    //    results={this.props.results.values}
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
                    <div className="cantidad-resultados">
                        Mostrando resultados desde el {parseInt(this.props.results.offset) + 1} al {
                            //Math.max(1, this.props.results.count - (this.props.results.offset + this.props.results.limit))
                            Math.min(this.props.results.offset + this.props.results.limit, this.props.results.count)
                            }

                    </div>
                    <ul className={this.animClass}>
                        
                        {resultsNavigatorButtons()}

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
                                                <button className="btn btn-primary col-xs-12 subscription-button" onClick={() => {this.getResultHistory(index)}}>
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

                        {resultsNavigatorButtons()}


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