import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UserProfileActions from '../../actions/UserActions';
import {capitalize} from '../../utils/miscUtils';

class UserProfileData extends React.Component {

    constructor(props) {

        super(props);
        this.showParams = [{name: "Nombre"},{image:"Imagen"}, {email: "Email"}, {password: "Contraseña"}, {passwordConfirmation: "Confirmar contraseña"}];
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
        this.props.UserProfileActions[action](event.target.value);
    }

    userData = () => {
        let user = this.props.user;
        if(user === null) {
            return null;
        }



        let fields = this.showParams.map(e => {
                let currentKey = Object.keys(e)[0];

                return (<div key={currentKey}>
                            <label className="title full-width">{e[currentKey]}</label>
                            <input key={currentKey} ref={currentKey} defaultValue={user[currentKey]} onChange={this.handleChange}/>
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
                <button className="btn btn-primary info">Enviar datos</button>
            </div>
            
            
            )

    }

}
UserProfileData.propTypes = {
    user: PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps) {
    return {
        user: state.userData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        UserProfileActions: bindActionCreators(UserProfileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileData);