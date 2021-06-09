import axios from 'axios';

export const setUser = (user) => ({
    type: 'USER:AUTH',
    payload: user
});

export const setIsAuth = (auth) => ({
    type: 'USER:SET_AUTH',
    payload: auth
});

export const setUserLoaded = (isLoaded) => ({
    type: 'USER:SET_USER_LOADED',
    payload: isLoaded
});

export const authUser = (email, password) => (dispatch) => {
    setUserLoaded(false);
    axios.get('/db.json')
        .then(({ data }) => {
            const userData = data.user;
            /**
             * Incorrect validation of user information without backend
             * Query goes to simple JSON file {user {}}
             */
            if (email.toLowerCase().trim() === userData.email && userData.password === password) {
                console.log("Authorized");
                dispatch(setUser(userData));
                dispatch(setIsAuth(true));
                dispatch(setUserLoaded(true));
            } else {
                console.log("NOT OK");
                dispatch(setUser(null));
                dispatch(setIsAuth(false));
                dispatch(setUserLoaded(true));
                alert("Wrong password or email!");
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(setUser(null));
            dispatch(setIsAuth(false));
            dispatch(setUserLoaded(true));
        });
};