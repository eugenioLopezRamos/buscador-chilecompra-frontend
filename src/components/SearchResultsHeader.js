import React from 'react';
import * as utils from '../utils/miscUtils';
import {applyFilter} from '../helpers/searchResultsHelpers';
import {chileCompraResponseExample} from '../utils/objectSchemaExamples';


class SearchResultsHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rootTransform: 0
        }
        this.applyFilter = applyFilter;
        this.mockResult = [{value: chileCompraResponseExample}];
    }

    handleSortBy = (columnIndex, order) => {
        //the returns are for testing...

        if(order === "ascending") {
            this.props.sortByColumn(columnIndex, "ascending");
            return "ascending";
        }
        this.props.sortByColumn(columnIndex, "descending");
        return "descending";
    };

    setTransform = (pixels) => {
        this.setState({rootTransform: pixels});
    };

    render = () => {

        const titlesToRender = this.applyFilter(this.props.columns, this.mockResult)[0];

        return(
                <span className="movable-title-container" style={{transform: `translate(-${this.state.rootTransform}px, 0)`}}>
                        {        
                            Object.keys(titlesToRender).map((title,index) => {
                                return <span className="search title col-xs-3 searchable" 
                                            key={"title key" + index }
                                        >
                                            <div className="title-spans-container">
                                                <span className="title-text">{utils.pascalCaseToSentenceCase(title)}</span>
                                                <span className="glyphicon filler"></span>
                                                <span className="glyphicon glyphicon-chevron-down"
                                                    onClick={() => this.handleSortBy(index, "descending")}
                                                >
                                                </span>
                                                <span className="glyphicon glyphicon-chevron-up"
                                                    onClick={() => this.handleSortBy(index, "ascending")}
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
             );
    };
};


export default SearchResultsHeader;