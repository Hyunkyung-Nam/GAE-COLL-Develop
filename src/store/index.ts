import { combineReducers } from "redux";
import isVisibleReducer from "./isvisibleReducer";
import projectReducer from "./projectReducer";
import myBoardReducer from "./myBoardReducer";
import tokenReducer from "./tokenReducer";
import selectedProjectReducer from "./selectedProjectReducer";
import projectBoardReducer from "./projectBoardReducer";

const rootReducer = combineReducers({
    isVisible: isVisibleReducer,
    project: projectReducer,
    myBoard: myBoardReducer,
    token: tokenReducer,
    selectedProject: selectedProjectReducer,
    projectBoard: projectBoardReducer,
});

export type rooteState = ReturnType<typeof rootReducer>;
export default rootReducer;
