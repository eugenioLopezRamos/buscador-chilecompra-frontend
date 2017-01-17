import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import * as types from '../actions/actionTypes';



class ResultComparer extends React.Component {
    constructor(props) {
        super(props);
    }


}
    render = () => {
        (<div>


        
        </div>)
    }


ResultComparer.propTypes = {
    results: PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps){
    return {
        results: state.resultToCompare
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ResultComparer);