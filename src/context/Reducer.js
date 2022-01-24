const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                isFetching: true,
                error: false,
                token:null
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                isFetching: false,
                error: false,
                token:action.payload.token
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                token:null,
                isFetching: false,
                error: true
            };
        case 'LOGOUT':
            return {
                user: null,
                token:null,
                isFetching: false,
                error: false
            };
        case 'UPDATE_START':
            return {
                ...state,
                isFetching: true
            };
        case 'UPDATE_SUCCESS':
            return {
                user: action.payload,
                token: state.token,
                isFetching: false,
                error: false
            };
        case 'UPDATE_FAILURE':
            return {
                ...state,
                user: state.user,
                isFetching: false,
                error: true,
            };
        default:
            return state;
    }
}

export default Reducer;