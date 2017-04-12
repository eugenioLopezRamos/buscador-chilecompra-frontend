import React, {PropTypes} from 'react';
import * as utils from '../../utils/miscUtils';
import {applyFilter} from '../../helpers/searchResultsHelpers';

const applyFilterFn = applyFilter;

const SearchResultsContent = (props) => {
//props.elementsToRender
//props.scrollHandler
//props.showObjectDetail(column)
//props.getResultHistory
//props.showSubscriptionModal
    const clickOnPrimitiveHandler = (event, column) => {
        event.preventDefault();
        props.showObjectDetail(column);
    };
    const elementsToRender = applyFilterFn(props.columns, props.values);

  

    return(<div className="results-li-container" onScroll={props.handleScroll}>
                {
                elementsToRender.map((row, index) => {
                    return (<li className="search-results" key={index}>
                        {
                                Object.values(row).map((column, index) => {
                                    {/*if the column given is not a primitive, make a "link" to the items 
                                    (which really is just a FullScreenPane with the item details.
                                    As of this writing (March 2nd 2017) this only happens with Listado[0].Items*/}
                                    if(!utils.isPrimitive(column)) {
                                        return (<span className="search col-xs-3" key={"column key" + index}>
                                                    <a href="#" onClick={(event) => {clickOnPrimitiveHandler(event, column);}}>
                                                        Ver detalle
                                                    </a>
                                                </span>);
                                    }

                                    return (<span className="search col-xs-3" key={"column key" + index}>
                                                {column ? column : "Sin información"}
                                        </span>);
                                })
                        }

                                <span className="search col-xs-3 half" key={"result history key " + index} >
                                    <button className="btn btn-primary col-xs-12 result-history-button" onClick={() => {props.getResultHistory(index);}}>
                                        Ver historia
                                    </button>
                                </span>
                                <span className="search col-xs-3 half" key={"suscripcion key " + index} >
                                    <button className="btn btn-primary col-xs-12 subscription-button" onClick={() => {props.showSubscriptionModal(index);}}>
                                        Suscribirse
                                    </button>
                                </span>

                            </li>);
                })
                }
                </div>);
};
SearchResultsContent.propTypes = {
    columns: PropTypes.array,
    values: PropTypes.array,
    handleScroll: PropTypes.func
};

export default SearchResultsContent;
                            
