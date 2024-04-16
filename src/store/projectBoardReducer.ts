const UPDATEBOARD = "board/UPDATEBOARD";

export const updateProjectBoard = (projectBoard: board[] | null) => {
    return { type: UPDATEBOARD, projectBoard };
};
interface board {
    deadline: string;
    description: string;
    id: number;
    projectId: number;
    status: string;
    title: string;
    updatedAt: string;
    userId: number;
    user_name: string;
}

interface action {
    type: string;
    projectBoard: board[] | null;
}
const initialState = null;

const projectBoardReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case UPDATEBOARD:
            return action.projectBoard;
        default:
            return state;
    }
};

export default projectBoardReducer;
