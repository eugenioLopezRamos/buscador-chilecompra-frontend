import React, {PropTypes} from 'react';

const UserProfile = ({user}) => {

    return(
        <div>
            <h2>Tus datos</h2>
            {
                Object.keys(user).map( (e,i) => {
                    return <h4 className="user-h2" key={i+1}>{e} = {user[e]}</h4>
                })
            }
        </div>
    )

}

UserProfile.propTypes = {

    user: PropTypes.object.isRequired

}

export default UserProfile;