import Cookies from "js-cookie";

const userReducer = (state = Cookies.get("newUser") ? JSON.parse(Cookies.get("newUser")) : null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
};

export default userReducer;