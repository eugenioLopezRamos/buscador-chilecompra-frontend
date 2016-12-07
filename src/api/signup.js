class signup {
    static sendSignupInfo(state) {

        let signupData = state.getState().signupData;
        // let name = signupData.name;
        // let email = signupData.email;
        // let password = signupData.password;
        // let passwordConf = signupData.passwordConf;


        // POST the data to the server etc

        return fetch('/api/signuptest/', {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({"signupData": signupData}),
            method: "POST"
        });
    }
}

