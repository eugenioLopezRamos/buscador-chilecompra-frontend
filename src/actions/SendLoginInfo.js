

const login = () => {

    return (dispatch) => {

        return fetchLoginResponse.send().then(
            //so, fetchLoginRsponse sends the credentials, and the
            //action should handle either throwing or returning json
            //which would then be returned as "token" (response.json() => token)
            token => {
                    dispatch(loginSuccess(token) //dispatch another action
                    // with the JWT as arg
                )}
        ).catch(error => { throw(error) }) //or throws in case of failure


    }

}

export default login