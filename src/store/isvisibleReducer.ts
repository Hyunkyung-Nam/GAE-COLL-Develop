const initialState = true;

const isVisibleReducer = (state = initialState, action: any) => {
    if (action.type === "isVisible/CHANGE") {
        return !state;
    }
    return state;
};

export default isVisibleReducer;
