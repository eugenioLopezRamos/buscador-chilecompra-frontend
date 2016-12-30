import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from '../actions/loginActions';
import UserProfile from './UserProfile';
import {getUserResults, deleteUserResults, getUserSearches, deleteUserSearches} from '../../actions/UserActions';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

        this.props.getUserResults();
        this.props.getUserSearches();
    }

    requestResults = () => {
        this.props.getUserResults();
    }


    render = () => {
        if(this.props.user === null) {
            //probably set initialState of userData to empty fields and then use an onEnter handler in react-router to 
            // redirect the user to login if not logged in.
            return null
        }
        return(
            <div className="jumbotron">
                <h2 className="text-center">Bienvenido {this.props.user.name}</h2>
                <UserProfile user={this.props.user} 
                             userResults={this.props.fetchedUserResults}
                             getUserSearches={this.props.fetchedUserSearches}
                
                />
            </div>
        )
    } 
}

UserPage.propTypes = {
   // login: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    fetchedUserResults: PropTypes.object,
    fetchedUserSearches: PropTypes.object
    //tbi

}

function mapStateToProps(state, ownProps) {
    return {
            user: state.userData,
            fetchedUserResults: state.userResults.fetched,
            fetchedUserSearches: state.userSearches.fetched
        }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserResults: bindActionCreators(getUserResults, dispatch),
        deleteUserResults: bindActionCreators(deleteUserResults, dispatch),
        getUserSearches: bindActionCreators(getUserSearches, dispatch),
        deleteUserSearches: bindActionCreators(deleteUserSearches, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);