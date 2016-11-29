import * as types from './actionTypes'

const sendLoginInfoSuccess = (token) => {

    return {type: types.SEND_LOGIN_INFO_SUCCESS, token}
}

export default sendLoginInfoSuccess