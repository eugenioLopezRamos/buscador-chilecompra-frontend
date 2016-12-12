class signup {
    static sendSignupInfo(state) {

        let signup_data = state.getState().signup.info;
        return fetch(`${process.env.API_HOST}/api/signup`, {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({signup_data}),
            method: "POST"
        }).then(response => {return response.json()})
          .catch(error => {return error.json()});
    }
}
export default signup;

