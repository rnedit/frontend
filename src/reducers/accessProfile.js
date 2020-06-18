const initialState = {
    data:[]
};

export default function accessProfile(state = initialState, action) {
    switch (action.type) {
        case "SET_ACCESS":
            return {
                ...state,
                data: action
            };
        
        default:
            return state;
    }
}