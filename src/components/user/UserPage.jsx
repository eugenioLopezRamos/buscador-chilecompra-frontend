import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from '../actions/loginActions';
import UserProfile from './UserProfile';
import {getUserResults, deleteUserResults, getUserSearches, updateUserSearches, deleteUserSearches} from '../../actions/UserActions';
import Flash from '../Flash.jsx';
import FullScreenPane from '../FullScreenPane.jsx';
import ModifySearchMenu from '../ModifySearchMenu.jsx';
import ModifyInputFieldsContainer from '../ModifyInputFieldsContainer.jsx';
import SearchResults from '../SearchResults.jsx';
import {shortLoadChilecompraData} from '../../actions/fetchActions';


class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.components = {
            //TODO: probably can make this like: ModifyInputFields:{component: ModifyInputFieldsContainer, menu: ModifySearchMenu}
            // and then pass that object as a prop to the FullScreenPane...
            ModifyInputFieldsContainer: ModifyInputFieldsContainer,
            ModifySearchMenu: ModifySearchMenu,
            SearchResults: SearchResults
        }

        this.getMenu = (component) => {

            //return menu according to component
            switch(component) {
                case this.components.SearchResults:
                    return null;
                case this.components.ModifyInputFieldsContainer:
                    return this.components.ModifySearchMenu
                default:
                    return null;

            }
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
            componentProps: {},
            menu: null,
            menuProps: {},
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
        console.log("defaults", this.props.fetchedUserResults);
        console.log("correct", this.props.fetchedUserSearches.value[index]);

        this.setState({
                        showFullScreenPane: true, 
                        FullScreenPaneComponent: component,
                        componentProps: {
                            defaults: this.props.fetchedUserSearches.value[index]
                        },
                        menu: this.getMenu(component)
                    })
    }
    
    executeStoredSearch = (component, index) => {
      //  console.log("comp", component);
        this.setState({
                        showFullScreenPane:true, 
                        FullScreenPaneComponent: component,
                      
                        menu: this.getMenu(component)
                        });

        let data = Object.assign({}, this.props.fetchedUserSearches.value[index]);

        data.date = Date.parse(data.date);

        this.props.loadChilecompraData(data)
            .then(response => {
                                this.setState({
                                                showFullScreenPane: true, 
                                                FullScreenPaneComponent: component, 
                                                menu: this.getMenu(component),
                                                componentProps: {results: response }
                                            });
                                });
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
                 //   index={this.state.index}             
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
                             executeStoredSearch={this.executeStoredSearch}
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
        deleteUserSearches: bindActionCreators(deleteUserSearches, dispatch),
        loadChilecompraData: bindActionCreators(shortLoadChilecompraData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);