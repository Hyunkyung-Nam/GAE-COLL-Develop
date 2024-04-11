import { combineReducers } from "redux";
import isVisibleReducer from "./isvisibleReducer";
import projectReducer from "./projectReducer";
import myBoardReducer from "./myBoardReducer";

const rootReducer = combineReducers({
    isVisible: isVisibleReducer,
    project: projectReducer,
    myBoard: myBoardReducer,
});

export type rooteState = ReturnType<typeof rootReducer>;
export default rootReducer;
