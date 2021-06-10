import produce from "immer"

// Reducer with initial state
const INITIAL_STATE = {
    data: null,
    isAuth: false,
    userLoading: false
}


const usersReducer = (state = INITIAL_STATE, action) =>
    produce(state, draft => {
        switch (action.type) {
            case 'USER:AUTH':
                draft.data = action.payload;
                break;

            case 'USER:SET_AUTH':
                draft.isAuth = action.payload;
                break;
            case 'USER:SET_USER_LOADING':
                draft.userLoading = action.payload;
                break;
            default:
                break;
        }
    });
export default usersReducer;