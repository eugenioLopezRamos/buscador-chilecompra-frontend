import userAPI from '../../api/userApi';
const Logout = () => {

    console.log("userapi", userAPI)
    userAPI.sendLogoutInfo();
    return null;


}
export default Logout;