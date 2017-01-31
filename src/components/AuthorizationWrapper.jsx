import React from 'react';
import {validateToken} from '../actions/authInfoResultsActions';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

class AuthorizationWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        if(this.props.isAuthenticated && this.props.user) {
            return <this.props.component/>
        }
        return <div className="jumbotron container">Por favor ingresa</div>
    }
}

function mapStateToProps(state, ownProps) {
    return {
            user: state.userData,
            isAuthenticated: state.isAuthenticated,
            messages: state.messages
        }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        validateToken: bindActionCreators(validateToken, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper);