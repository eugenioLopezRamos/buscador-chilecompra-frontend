import React, {PropTypes} from 'react';

const UserProfile = ({user}) => {

    return(
        <div>
            <h3>{user.name}</h3>
            {
                Object.keys(user).map( (e,i) => {
                    return <h2 className="user-h2" key={i+1}>user.e</h2>
                })
            }
        </div>
    )

}

UserProfile.propTypes = {

    user: PropTypes.object.isRequired

}

export default UserProfile;