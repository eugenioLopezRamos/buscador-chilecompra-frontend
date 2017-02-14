import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from '../actions/loginActions';
import UserProfile from './UserProfile';
import {getUserSubscriptions, updateUserSubscription} from '../../actions/UserActions';
import {deleteUserSubscription, getUserSearches} from '../../actions/UserActions';
import {updateUserSearches, deleteUserSearches} from '../../actions/UserActions';
import {getResultHistory, getUserNotifications} from '../../actions/UserActions';
import userApi from '../../api/userApi';
import Flash from '../Flash.jsx';
import FullScreenPane from '../FullScreenPane.jsx';
import InputFieldsContainer from '../InputFieldsContainer.jsx';
import SearchResults from '../SearchResults.jsx';
import {shortLoadChilecompraData} from '../../actions/fetchActions';
import Modal from '../inputs/Modal.jsx';
import objectAssign from 'object-assign';
import ResultComparer from '../ResultComparer.jsx';
import UpdateSearchMenu from '../UpdateSearchMenu';
import fetchApi from '../../api/fetchApi';


class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.fetchApi = fetchApi;
        this.state = {
            showFullScreenPane: false,
            FullScreenPaneComponent: null,
            componentProps: {},
            menu: null,
            menuProps: {},
            showModal: false,
            enteredNewSubscriptionName: "",
            modalDefaultName: null
        }

        this.components = {
            InputFieldsContainer,
            SearchResults,
            ResultComparer,
            UpdateSearchMenu
        }

        this.getMenu = (component) => {

            //TODO: remove? return menu according to component
            switch(component) {
                case this.components.SearchResults:
                    return null;
                case this.components.InputFieldsContainer:
                    return null;
                default:
                    return null;
            }
        }

        this.actions = {
                        getUserSubscriptions: props.getUserSubscriptions,
                        // noReduxGetStoredUserSubscriptions,
                        updateSubscription: props.updateSubscription,
                        deleteSubscription: props.deleteSubscription,
                        getUserSearches: props.getUserSearches,
                        updateUserSearches: props.updateUserSearches,
                        deleteUserSearches: props.deleteUserSearches,
                        
                        }

    }

    // componentDidMount = () => {
    //     //I did think about changing these here and in the backend, but decided it was awkward either way
    //    this.props.getUserNotifications();
    //    this.props.getUserSubscriptions();
    //    this.props.getUserSearches();
    // }

    requestResults = () => {
        this.props.getUserSubscriptions();
    }

    hideFullScreenPane = () => {
        this.setState({showFullScreenPane: false});
    }

    showStoredSearch = (component, index) => {
        let searchId = this.props.userSearches.id[index];
        let searchName = this.props.userSearches.name[index];
        

        this.setState({ 
                        showFullScreenPane: true, 
                        FullScreenPaneComponent: component,
                        componentProps: {
                            defaultValues: {
                                defaultState: this.props.userSearches.value[index]                    
                            },
                            saveMenu: this.components.UpdateSearchMenu,
                            createSearches: this.props.updateUserSearches
                        },
                      //  menu: this.getMenu(component)
                     //   menuProps: {actions: this.updateSearches()}
                    });
    }
  
    
    executeStoredSearch = (component, index) => {
      //  console.log("comp", component);
        this.setState({
                        showFullScreenPane:true, 
                        FullScreenPaneComponent: component,
                      
                        menu: this.getMenu(component)
                        });

        let data = objectAssign({}, this.props.userSearches.value[index]);
    
        data.date = Date.parse(data.date);

        this.fetchApi.getChileCompraData(data)
            .then(response => {
                                this.setState({
                                                showFullScreenPane: true, 
                                                FullScreenPaneComponent: component, 
                                                componentProps: {results: response },
                                                menu: this.getMenu(component)
                                            });
                                });
    }


    updateSubscription = () => {
        let name = this.state.enteredNewSubscriptionName;
        let old_name = this.state.modalDefaultName;
        this.setState({showModal: false, enteredNewSubscriptionName: "", modalDefaultName: null})
        this.props.updateSubscription(old_name, name);
    }

    onSubscriptionNewNameInput = (event) => {
        this.setState({enteredNewSubscriptionName: event.target.value});
    }

    getResultHistory = (component, resultId) => {
        
           this.setState({
                        showFullScreenPane:true, 
                        FullScreenPaneComponent: null,
                      
                        menu: this.getMenu(component)
                        });


        userApi.getResultHistory(resultId)
            .then(response => { 
                                this.setState({
                                                showFullScreenPane: true, 
                                                FullScreenPaneComponent: component, 
                                                componentProps: {results: response},
                                                menu: this.getMenu(component)
                                            });
                                });
        
    }

    hideModal = () => {
        this.setState({showModal: false, modalDefaultName: null, enteredNewSubscriptionName: ""});
    }

    showModal = (name) => {
        this.setState({showModal: true, modalDefaultName: name, enteredNewSubscriptionName: ""});
    }

    render = () => {
        if(this.props.user === null) {
            //probably set initialState of userData to empty fields and then use an onEnter handler in react-router to 
            // redirect the user to login if not logged in.
            return null;
        }

        return(
            <div className="jumbotron" style={{"minHeight": document.documentElement.clientHeight}}>






                <FullScreenPane 
                    show={this.state.showFullScreenPane}
                    hide={this.hideFullScreenPane}
                    component={this.state.FullScreenPaneComponent} 
                    componentProps={this.state.componentProps}
                    menu={this.state.menu}           
                />

                <Modal 
                    isModalShown={this.state.showModal} 
                    modalValue={this.state.enteredNewSubscriptionName}
                    handler={this.updateSubscription}
                    hideModal={this.hideModal}
                    defaultName={this.state.modalDefaultName}
                    onInput={this.onSubscriptionNewNameInput}           
                />

                <Flash 
                    type={"info"} 
                    messages={this.props.messages} 
                />

                <h2 className="text-center">Bienvenido {this.props.user.name}</h2>
                <UserProfile user={this.props.user}
                             userNotifications = {this.props.userNotifications} 
                             userSubscriptions={this.props.userSubscriptions}
                             userSearches={this.props.userSearches}
                             actions={this.actions}
                             showStoredSearch={this.showStoredSearch}
                             executeStoredSearch={this.executeStoredSearch}
                             getResultHistory={this.getResultHistory}
                             showModal={this.showModal}
                            
                             components={this.components}
                        
                />
            </div>
        )
    } 
}

UserPage.propTypes = {
   // login: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    userSubscriptions: PropTypes.object,
    userSearches: PropTypes.object,
    userNotifications: PropTypes.object,
    messages: PropTypes.object
    //tbi

}

function mapStateToProps(state, ownProps) {
    return {
            user: state.userData,
            userSubscriptions: state.userSubscriptions,
            userSearches: state.userSearches,
            userNotifications: state.userNotifications,
            messages: state.messages
        }
}

function mapDispatchToProps(dispatch) {
    return {
      //  getUserSubscriptions: bindActionCreators(getUserSubscriptions, dispatch),
        updateSubscription: bindActionCreators(updateUserSubscription, dispatch),
        deleteSubscription: bindActionCreators(deleteUserSubscription, dispatch),
       // getUserSearches: bindActionCreators(getUserSearches, dispatch),
        updateUserSearches: bindActionCreators(updateUserSearches, dispatch),
        deleteUserSearches: bindActionCreators(deleteUserSearches, dispatch),
        getResultHistory: bindActionCreators(getResultHistory, dispatch),
       // getUserNotifications: bindActionCreators(getUserNotifications, dispatch),
        loadChilecompraData: bindActionCreators(shortLoadChilecompraData, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);