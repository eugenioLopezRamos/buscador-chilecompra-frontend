import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import * as actions from '../actions/loginActions';
import UserProfile from './UserProfile';

class UserPage extends React.Component {

    render = () => {
        if(this.props.user === null) {
            //probably set initialState of userData to empty fields and then use an onEnter handler in react-router to 
            // redirect the user to login if not logged in.
            return null
        }
        return(
            <div className="jumbotron">
                <h2 className="text-center">Bienvenido {this.props.user.name}</h2>
                <UserProfile user={this.props.user}/>
            </div>
        )
    } 
}

UserPage.propTypes = {
   // login: PropTypes.bool.isRequired,
    user: PropTypes.object
    //tbi

}

function mapStateToProps(state, ownProps) {
    return {user: state.userData}
    //ownProp1: state.ownProp1,
    //ownProp2: state.ownProp2, 
    //...
    //ownPropN : state.ownPropN
}

export default connect(mapStateToProps)(UserPage);