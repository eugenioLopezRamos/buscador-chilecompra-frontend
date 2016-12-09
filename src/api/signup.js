class signup {
    static sendSignupInfo(state) {

        let signup_data = state.getState().signupData;
        // let name = signupData.name;
        // let email = signupData.email;
        // let password = signupData.password;
        // let passwordConf = signupData.passwordConf;

        // POST the data to the server etc
		// params on the rails end => params.require(:email).permit(:name, :email, :password, :password_confirmation)

        return fetch(`${process.env.API_HOST}/api/signuptest`, {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({signup_data}),
            method: "POST"
        }).then(response => {console.log("FETCH RESP", response); return response})
          .catch(error => {console.log("ERROR", error); return error});
    }
}
export default signup;

