import axios from 'axios';
// import spreadSheetApi from './spreadSheetApi'
// import { membersWorkSheetId } from '../environment'
// import Noty from 'noty'
import mynoty from '../components/mynoty'

class AuthApi {
    async login(data) {
        var login_status = false;
        await axios.post(process.env.REACT_APP_BACKEND_URL + '/googlelogin',
            {
                token: data.token
            })
            .then(async (res) => {
                if (res.status === 200) {
                    // console.log(res.data);
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user_email', res.data)
                    login_status = true;
                    mynoty.show("Logged In Successfully For Next 1 Hour", 1); // token time is 1 hr
                }
            })
            .catch((error) => {
                localStorage.removeItem('token');
                localStorage.removeItem('user_email')
                if (error.response !== undefined && error.response.status === 401) { //if invalid token or expired
                    mynoty.show("Invalid Login Credentials", 2);
                } else if (error.response !== undefined && error.response.status === 403) { // if token is valid but not a club member
                    mynoty.show("You Are Not Unauthorized To Write Blogs", 2);
                } else {
                    mynoty.show("Oops Something Went Wrong", 2); //if backend is not running or not reachable....
                }
            })
        return login_status;
    }
    async validateToken() { //return true false only
        let login = false;
        let token = await localStorage.getItem('token');
        if (token === null || token === undefined) {
            return false;
        } else {
            await axios.post(process.env.REACT_APP_BACKEND_URL + '/googlelogin', { token: token })
                .then((res) => {
                    if (res.status === 200) {
                        login = true
                        localStorage.setItem('user_email', res.data)
                    }
                })
                .catch(() => {
                    // console.log("User not logedIn");
                })
            return login;
        }

    }
}
var instance = new AuthApi()
export default instance;