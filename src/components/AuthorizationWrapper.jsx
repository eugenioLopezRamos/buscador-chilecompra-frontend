import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Flash from './Flash';


export class AuthorizationWrapper extends React.Component {
    constructor(props, {store}) {
        super(props);
     
        //TODO: I'm....not quite sure about the "recommendability" of this one...

        // Binds the actions passed in the "actions" prop from 'routes.js' to the dispatch
        // This is done so we can reuse a couple of components (especially InputFieldsContainer)
        // by using versions that behave slightly differently.
        // In the case of InputFieldsContainer the code is kept the same except the two redux-store connected
        // functions, where we want to have the following differences:
        
        // /busqueda -> InputFieldsContainer has a button to submit the form, which the one from UserProfile doesnt,
        // and /busqueda -> InputFieldsContainer saves a new search query when saving search query.

        // UserProfile -> InputFieldsContainer can't submit the form proper AND when saving the terms in the input boxes
        // (the state if you will), it will modify the already existing search query instead of creating a new one

        this.actions = (() => {
            if(props.actions) {
                return Object.keys(props.actions).reduce((boundActionsObject, currentKey) => {
                    boundActionsObject[currentKey] = bindActionCreators(props.actions[currentKey], store.dispatch)
                    return boundActionsObject;    
                }, {});
            }
        })()

        this.saveMenu = this.props.saveMenu ? this.props.saveMenu : null;
        this.defaultValues = this.props.componentDefaultValues ? this.props.componentDefaultValues : null;
    }

    render = () => {

        if(this.props.isAuthenticated && this.props.user) {
            return <this.props.component {...this.actions}
                                         defaultValues={this.defaultValues}
                                         saveMenu={this.saveMenu}
                    />
        }
        return <this.props.renderFailure />
    }
}

function mapStateToProps(state, ownProps) {
    return {
            user: state.userData,
            isAuthenticated: state.isAuthenticated,
            messages: state.messages
        }
}


AuthorizationWrapper.contextTypes = {
    store: React.PropTypes.object
}

export default connect(mapStateToProps)(AuthorizationWrapper);