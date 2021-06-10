import axios from 'axios';

export const setUser = (user) => ({
    type: 'USER:AUTH',
    payload: user
});

export const setIsAuth = (auth) => ({
    type: 'USER:SET_AUTH',
    payload: auth
});

export const setUserLoading = (isLoaded) => ({
    type: 'USER:SET_USER_LOADING',
    payload: isLoaded
});

export const authUser = (email, password) => (dispatch) => {
    dispatch(setUserLoading(true));
    axios.get('https://cdn.webdepo.tech/db.json')
        .then(({ data }) => {
            const userData = data.user;
            /**
             * Incorrect validation of user information without backend
             * Query goes to simple JSON file {user {}}
             */
            setTimeout(() => {
                if (email.toLowerCase().trim() === userData.email && userData.password === password) {
                    console.log("Authorized");
                    dispatch(setUser(userData));
                    dispatch(setIsAuth(true));
                    dispatch(setUserLoading(false));
                } else {
                    console.log("NOT OK");
                    dispatch(setUser(null));
                    dispatch(setIsAuth(false));
                    dispatch(setUserLoading(false));
                    alert("Wrong password or email!");
                }
            }, 1000);
        })
        .catch(err => {
            console.log(err);
            dispatch(setUser(null));
            dispatch(setIsAuth(false));
            dispatch(setUserLoading(false));
            alert('Bad request. Please try later');
        });
};