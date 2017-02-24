import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UserProfileActions from '../../actions/UserActions';
import {capitalize} from '../../utils/miscUtils';
import Flash from '../Flash.jsx';

export class UserProfileData extends React.Component {

    constructor(props) {

        super(props);
        this.showParams = [{name: "Nombre"},{image:"Imagen"}, {email: "Email"}, {currentPassword: "Contraseña actual"}, 
                            {password: "Nueva contraseña"}, {passwordConfirmation: "Confirmar nueva contraseña"}];

        this.capitalize = (string) => { return capitalize(string); }
    }

    handleChange = (event, fieldName) => {
        let action = "modifyUserProfileDataInput" + this.capitalize(fieldName) ;
        this.props.userProfileActions[action](event.target.value);
    }

    handleClick = () => {
        event.preventDefault();
        this.props.userProfileActions.modifyUserProfileData(this.props.modifiedUserData);
    }


    userData = () => {
        let user = this.props.modifiedUserData;
        if(user === null) {
            return null;
        }

        let fields = this.showParams.map(field => {
                // fieldName = name, email, currentPasswod...etc
                let fieldName = Object.keys(field)[0];
                let inputType = "input";
                let isPasswordOrMail = fieldName.match(/password|email/i);
                //inputType becomes password or email, according to what was found.       
                if(isPasswordOrMail) {
                    inputType = isPasswordOrMail[0].toLowerCase();
                }
                return (<div className="user-profile-data-field" key={fieldName}>
                            <label className="title full-width">{field[fieldName]}</label>
                            <input className="user-profile-field-input"
                                   key={fieldName}
                                   value={user[fieldName]}
                                   onChange={(event) => {this.handleChange(event, fieldName)}}
                                   type={inputType}/>
                        </div>)
            });

        return  (<div className="user-profile-data-update-container">
                    {fields}
                 </div>)
        
    }



    render = () =>  {

        return (
            <div className="jumbotron text-center" style={{"minHeight": document.documentElement.clientHeight}}>
                <Flash messages={this.props.messages}/>
                <label className="user-profile-description">Aquí puedes editar los datos de tu perfil</label>
                {this.userData()}
                <button className="btn btn-primary info" onClick={this.handleClick}>Enviar datos</button>
            </div>
            
            
            )

    }

}
UserProfileData.propTypes = {
    modifiedUserData: PropTypes.object.isRequired,
    messages: PropTypes.object
}


function mapStateToProps(state, ownProps) {
    return {
        modifiedUserData: state.modifiedUserData,
        messages: state.messages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userProfileActions: bindActionCreators(UserProfileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileData);