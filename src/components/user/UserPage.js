import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/loginActions';
import UserProfile from './UserProfile';

class UserPage extends React.Component {

    render = () => {
        return(
            <div>
                <h2 className="username-title">Your very own user page!</h2>
                <UserProfile user={this.props.user}/>
            </div>
        )
    } 
}

UserPage.propTypes = {
    login: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
    //tbi

}

function mapStateToProps(state, ownProps) {

    //ownProp1: state.ownProp1,
    //ownProp2: state.ownProp2, 
    //...
    //ownPropN : state.ownPropN
}

export default connect(mapStateToProps)(UserPage);