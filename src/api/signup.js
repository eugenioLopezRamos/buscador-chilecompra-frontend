class signup {
    static sendSignupInfo(state) {

        let signup_data = state.getState().signup.info;
        return fetch(`${process.env.API_HOST}/api/auth/`, {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({name: signup_data.name, email: signup_data.email, password: signup_data.password, password_confirmation: signup_data.password_confirmation}),
            method: "POST"
        }).then(response => {return response.json()})
          .catch(error => {return error.json()});
    }
}
export default signup;

