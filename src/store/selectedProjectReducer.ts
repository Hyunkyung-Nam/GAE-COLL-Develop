const UPDATESELETEDPROJECT = "seletedProject/UPDATESELETEDPROJECT";

export const updateSeletedProject = (seletedProject: object | null) => {
    return { type: UPDATESELETEDPROJECT, seletedProject };
};

interface action {
    type: string;
    seletedProject: object | null;
}
const initialState = null;

const selectedProjectReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case UPDATESELETEDPROJECT:
            return action.seletedProject;
        default:
            return state;
    }
};

export default selectedProjectReducer;
