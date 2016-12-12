class userApi {


    static sendLoginInfo(state) {

        let login_data = {
                            email: state.getState().loginData.email,
                            password: state.getState().loginData.password
                        };

        return fetch(`${process.env.API_HOST}/api/auth_user`, {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({login_data}),
            method: "POST"
        }).then(response => {return response.json()})
          .catch(error => {return error.json()});
    }
}

export default userApi;