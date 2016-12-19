import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UserProfileActions from '../../actions/UserActions';
import {capitalize} from '../../utils/miscUtils';
import Flash from '../Flash.jsx';

class UserProfileData extends React.Component {

    constructor(props) {

        super(props);
        this.showParams = [{name: "Nombre"},{image:"Imagen"}, {email: "Email"}, {currentPassword: "Contraseña actual"}, 
                            {newPassword: "Nueva contraseña"}, {newPasswordConfirmation: "Confirmar nueva contraseña"}];

        this.capitalize = (string) => { return capitalize(string); }
    }

    handleChange = (event) => {

        let allowedFields = this.showParams.map(e => { 
                                    
                                    return Object.keys(e)[0]

                                });
        let field = allowedFields.filter(e => {
            return event.target === this.refs[e];
        }).join("");
      
        let action = "modifyUserProfileDataInput" + this.capitalize(field) ;


        this.props.userProfileActions[action](event.target.value);
    }

    handleClick = () => {
        event.preventDefault();
        this.props.userProfileActions.modifyUserProfileData();
    }


    userData = () => {
        let user = this.props.user;
        if(user === null) {
            return null;
        }

        let fields = this.showParams.map(e => {
                let currentKey = Object.keys(e)[0];
                let inputType = "input";
                let isPasswordOrMail = currentKey.match(/password|email/i);
                if(isPasswordOrMail) {
                    //inputType becomes password or email, according to what was found.
                    inputType = isPasswordOrMail[0];
                }

                console.log("ispaas", isPasswordOrMail)
                console.log("USERCURRKEY", user[currentKey]);

                return (<div key={currentKey}>
                            <label className="title full-width">{e[currentKey]}</label>
                            <input key={currentKey} ref={currentKey} defaultValue={""} value={user[currentKey]} onChange={this.handleChange} type={inputType}/>
                        </div>)
            });

        return  (<div className="user-profile-data-update-container">
                    {fields}
                 </div>)
        
    }



    render = () =>  {

        return (
            <div className="jumbotron text-center">
               
                <label>Aquí puedes editar los datos de tu perfil</label>
                {this.userData()}
                <button className="btn btn-primary info" onClick={this.handleClick}>Enviar datos</button>
            </div>
            
            
            )

    }

}
UserProfileData.propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.object
}


function mapStateToProps(state, ownProps) {
    return {
        user: state.modifiedUserData,
        messages: state.messages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userProfileActions: bindActionCreators(UserProfileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileData);