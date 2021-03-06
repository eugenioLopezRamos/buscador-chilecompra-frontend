import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserProfile from './UserProfile';
import {getUserSubscriptions, updateUserSubscription} from '../../actions/UserActions';
import {deleteUserSubscription, getUserSearches} from '../../actions/UserActions';
import {updateUserSearches, deleteUserSearches} from '../../actions/UserActions';
import {getResultHistory, getUserNotifications} from '../../actions/UserActions';
import userApi from '../../api/userApi';
import FullScreenPane from '../FullScreenPane.jsx';
import InputFieldsContainer from '../InputFieldsContainer.jsx';
import SearchResults from '../searchResults/SearchResults.jsx';
import Modal from '../inputs/Modal.jsx';
import objectAssign from 'object-assign';
import ResultComparer from '../resultComparer/ResultComparer.jsx';
import UpdateSearchMenu from '../UpdateSearchMenu';
import fetchApi from '../../api/fetchApi';


export class UserPage extends React.Component {
    constructor(props) {
        super(props);
        // this.fetchApi = fetchApi;
        // this.userApi = userApi;
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

            //TODO: remove
            switch(component) {
                case this.components.SearchResults:
                    return null;
                case this.components.InputFieldsContainer:
                    return null;
                default:
                    return null;
            }
        }

    }

    requestResults = () => {
        this.props.getUserSubscriptions();
    }

    hideFullScreenPane = () => {
        this.setState({showFullScreenPane: false});
    }

    showStoredSearch = (component, index) => {
        //component = InputFieldsCcontainer
        let searchId = this.props.userSearches.id[index];
        let searchName = this.props.userSearches.name[index];
        
        this.setState({ 
                        showFullScreenPane: true, 
                        FullScreenPaneComponent: component,
                        componentProps: {
                            defaultValues: {
                                defaultState: this.props.userSearches.value[index],             
                            },
                            saveMenu: this.components.UpdateSearchMenu,
                            createSearches: this.props.updateUserSearches,
                            defaultSearchId: searchId,
                            defaultSearchName: searchName,
                            showSearchResultsComponent: false
                        },

                    });
    }
  
    
    executeStoredSearch = (component, index) => {
      // component = searchResults
        this.setState({
                        showFullScreenPane:true, 
                        FullScreenPaneComponent: component,
                        componentProps: {results: null},
                        menu: this.getMenu(component)
                        });

        let data = objectAssign({}, this.props.userSearches.value[index]);

        data.date = Date.parse(data.date);
        this.props.fetchApi.getChilecompraData(data)
            .then(response => {
                   return response.json()
            })
            .then(resp => {
                this.setState({
                                showFullScreenPane: true, 
                                FullScreenPaneComponent: component, 
                                componentProps: {results: resp},
                                menu: this.getMenu(component)
                            });  
            })

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

    getResultHistory = (component, resultId, resultName) => {
        
           this.setState({
                        showFullScreenPane:true, 
                        FullScreenPaneComponent: null,
                        componentProps: {results: null},
                        menu: this.getMenu(component)
                        });


        this.props.userApi.getResultHistory(resultId)
            .then(response => { 
                                this.setState({
                                                showFullScreenPane: true, 
                                                FullScreenPaneComponent: component, 
                                                componentProps: {results: response, resultName},
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
            <div className="jumbotron user-profile-page-main-container">

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

                <h2 className="text-center">Bienvenido {this.props.user.name}</h2>
                <UserProfile user={this.props.user}
                             userNotifications = {this.props.userNotifications} 
                             userSubscriptions={this.props.userSubscriptions}
                             userSearches={this.props.userSearches}
                             deleteUserSearches={this.props.deleteUserSearches}
                             deleteUserSubscription={this.props.deleteSubscription}
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
    user: PropTypes.object.isRequired,
    userSubscriptions: PropTypes.object,
    userSearches: PropTypes.object,
    userNotifications: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
    return {
            user: state.userData,
            userSubscriptions: state.userSubscriptions,
            userSearches: state.userSearches,
            userNotifications: state.userNotifications,
            userApi: userApi,
            fetchApi: fetchApi
        }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSubscription: bindActionCreators(updateUserSubscription, dispatch),
        deleteSubscription: bindActionCreators(deleteUserSubscription, dispatch),
        updateUserSearches: bindActionCreators(updateUserSearches, dispatch),
        deleteUserSearches: bindActionCreators(deleteUserSearches, dispatch),
        getResultHistory: bindActionCreators(getResultHistory, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);