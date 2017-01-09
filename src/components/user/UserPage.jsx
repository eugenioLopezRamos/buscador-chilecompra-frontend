import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from '../actions/loginActions';
import UserProfile from './UserProfile';
import {getUserResults, deleteUserResults, getUserSearches, updateUserSearches, deleteUserSearches} from '../../actions/UserActions';
import Flash from '../Flash.jsx';
import FullScreenPane from '../FullScreenPane.jsx';
import ModifySearchMenu from '../ModifySearchMenu.jsx';
import InputFieldsContainer from '../InputFieldsContainer.jsx';


class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.components = {
            InputFieldsContainer: InputFieldsContainer,
            ModifySearchMenu: ModifySearchMenu
        }


        this.actions = {
                        getUserResults: props.getUserResults,
                        deleteUserResults: props.deleteUserResults,
                        getUserSearches: props.getUserSearches,
                        updateUserSearches: props.updateUserSearches,
                        deleteUserSearches: props.deleteUserSearches
                        }

        this.state = {
            showFullScreenPane: false,
            FullScreenPaneComponent: null,
            index: 0
        }
    }

    componentDidMount = () => {
        
        this.props.getUserResults();
        this.props.getUserSearches();
    }

    requestResults = () => {
        this.props.getUserResults();
    }

    hideFullScreenPane = () => {
        this.setState({showFullScreenPane: false});
    }
    showFullScreenPane = (component, index) => {
        this.setState({showFullScreenPane: true, FullScreenPaneComponent: component, index})
    }
     
    render = () => {
        if(this.props.user === null) {
            //probably set initialState of userData to empty fields and then use an onEnter handler in react-router to 
            // redirect the user to login if not logged in.
            return null;
        }

        return(
            <div className="jumbotron">

                <FullScreenPane 
                    show={this.state.showFullScreenPane} 
                    component={this.state.FullScreenPaneComponent} 
                    hide={this.hideFullScreenPane}
                    menu={this.components.ModifySearchMenu}
                    index={this.state.index}
                    
                />

                <Flash 
                    type={"info"} 
                    messages={this.props.messages} 
                />

                <h2 className="text-center">Bienvenido {this.props.user.name}</h2>
                <UserProfile user={this.props.user} 
                             userResults={this.props.fetchedUserResults}
                             userSearches={this.props.fetchedUserSearches}
                             actions={this.actions}
                             showPane={this.showFullScreenPane}
                             components={this.components}
                />
            </div>
        )
    } 
}

UserPage.propTypes = {
   // login: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    fetchedUserResults: PropTypes.object,
    fetchedUserSearches: PropTypes.object,
    messages: PropTypes.object
    //tbi

}

function mapStateToProps(state, ownProps) {
    return {
            user: state.userData,
            fetchedUserResults: state.userResults.fetched,
            fetchedUserSearches: state.userSearches.fetched,
            messages: state.messages
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