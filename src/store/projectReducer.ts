const UPDATEPROJECT = "project/UPDATEPROJECT";

export const updateProeject = (payload: project) => {
    return { type: UPDATEPROJECT, payload };
};

interface project {
    id: number;
    project_name: string;
    status: string;
    project_img: string;
}
interface getInfo {
    user_name: string;
    github: string | null;
    blog: string | null;
    projectResult: project[];
}
interface action {
    type: string;
    payload: getInfo;
}
const initialState = {
    myProject: [],
};

const projectReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case UPDATEPROJECT:
            return { myProject: [action.payload] };
        default:
            return state;
    }
};

export default projectReducer;
