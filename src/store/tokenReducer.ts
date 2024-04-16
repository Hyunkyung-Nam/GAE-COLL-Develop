const UPDATETOKEN = "token/UPDATETOKEN";

export const updateToken = (token: string | null) => {
    return { type: UPDATETOKEN, token };
};

interface action {
    type: string;
    token: string | null;
}
const initialState = null;

const tokenReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case UPDATETOKEN:
            return action.token;
        default:
            return state;
    }
};

export default tokenReducer;
