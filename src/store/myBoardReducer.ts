const UPDATEMYBOARD = "project/UPDATEMYBOARD";

export const updateMyBoard = (payload: board) => {
    return { type: UPDATEMYBOARD, payload };
};

interface board {
    id: number;
    title: string;
    status: string;
    deadline: string;
    project: project;
}
interface project {
    project_name: string;
    id: number;
}
interface action {
    type: string;
    payload: board;
}
const initialState = {
    myBoard: [],
};

const myBoardReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case UPDATEMYBOARD:
            return { myBoard: [action.payload] };
        default:
            return state;
    }
};

export default myBoardReducer;
