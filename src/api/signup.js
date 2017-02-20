import fetch from 'isomorphic-fetch';

class signup {
    static sendSignupInfo(signup_info) {
        
        return fetch(`${process.env.API_HOST}/api/auth/`, {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({name: signup_info.name,
                                  email: signup_info.email,
                                  password: signup_info.password,
                                  password_confirmation: signup_info.password_confirmation}),
            method: "POST"
        }).then(response => {return response.json()})
          .catch(error => {return error});
    }
}
export default signup;

