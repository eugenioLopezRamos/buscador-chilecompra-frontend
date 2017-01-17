import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from '../actions/loginActions';
import UserProfile from './UserProfile';
import {getUserSubscriptions, updateUserSubscription, deleteUserSubscription, getUserSearches, updateUserSearches, deleteUserSearches} from '../../actions/UserActions';
//import {noReduxGetStoredUserSubscriptions} from '../../actions/UserActions';
import Flash from '../Flash.jsx';
import FullScreenPane from '../FullScreenPane.jsx';
import ModifySearchMenu from '../ModifySearchMenu.jsx';
import ModifyInputFieldsContainer from '../ModifyInputFieldsContainer.jsx';
import SearchResults from '../SearchResults.jsx';
import {shortLoadChilecompraData} from '../../actions/fetchActions';
import Modal from '../inputs/Modal.jsx';
import objectAssign from 'object-assign';


class UserPage extends React.Component {
    constructor(props) {
        super(props);

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
            //TODO: probably can make this like: ModifyInputFields:{component: ModifyInputFieldsContainer, menu: ModifySearchMenu}
            // and then pass that object as a prop to the FullScreenPane...
            ModifyInputFieldsContainer,
            ModifySearchMenu,
            SearchResults,
        }

        this.getMenu = (component) => {

            //return menu according to component
            switch(component) {
                case this.components.SearchResults:
                    return null;
                case this.components.ModifyInputFieldsContainer:
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
                        deleteUserSearches: props.deleteUserSearches
                        }

    }

    componentDidMount = () => {
        
        this.props.getUserSubscriptions();
        this.props.getUserSearches();
    }

    requestResults = () => {
        this.props.getUserSubscriptions();
    }

    hideFullScreenPane = () => {
        this.setState({showFullScreenPane: false});
    }

    showStoredSearch = (component, index) => {
       // console.log("defaults", this.props.fetchedUserSubscriptions);
       // console.log("correct", this.props.fetchedUserSearches.value[index]);
        let searchId = this.props.fetchedUserSearches.id[index];
        let searchName = this.props.fetchedUserSearches.name[index];
        

        this.setState({ 
                        showFullScreenPane: true, 
                        FullScreenPaneComponent: component,
                        componentProps: {
                            defaults: this.props.fetchedUserSearches.value[index],
                            searchId,
                            searchName,
                            updateSearch: this.props.updateUserSearches
                        },
                        menu: this.getMenu(component),
                     //   menuProps: {actions: this.updateSearches()}
                    })
    }

                    //  handler={this.handleSubscription}
                    // hideModal={this.hideSubscriptionModal}
                    // onInput={this.onSubscriptionNameInput}  
    
    executeStoredSearch = (component, index) => {
      //  console.log("comp", component);
        this.setState({
                        showFullScreenPane:true, 
                        FullScreenPaneComponent: component,
                      
                        menu: this.getMenu(component)
                        });

        let data = objectAssign({}, this.props.fetchedUserSearches.value[index]);
    
        data.date = Date.parse(data.date);

        this.props.loadChilecompraData(data)
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
                             userSubscriptions={this.props.fetchedUserSubscriptions}
                             userSearches={this.props.fetchedUserSearches}
                             actions={this.actions}
                             showStoredSearch={this.showStoredSearch}
                             executeStoredSearch={this.executeStoredSearch}
                             showModal={this.showModal}

                             components={this.components}
                            // showStoredResult={this.showStoredResult}
                />
            </div>
        )
    } 
}

UserPage.propTypes = {
   // login: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    fetchedUserSubscriptions: PropTypes.object,
    fetchedUserSearches: PropTypes.object,
    messages: PropTypes.object
    //tbi

}

function mapStateToProps(state, ownProps) {
    return {
            user: state.userData,
            fetchedUserSubscriptions: state.userSubscriptions.fetched,
            fetchedUserSearches: state.userSearches.fetched,
            messages: state.messages
        }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserSubscriptions: bindActionCreators(getUserSubscriptions, dispatch),
        updateSubscription: bindActionCreators(updateUserSubscription, dispatch),
        deleteSubscription: bindActionCreators(deleteUserSubscription, dispatch),
        getUserSearches: bindActionCreators(getUserSearches, dispatch),
        updateUserSearches: bindActionCreators(updateUserSearches, dispatch),
        deleteUserSearches: bindActionCreators(deleteUserSearches, dispatch),
        loadChilecompraData: bindActionCreators(shortLoadChilecompraData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);