const initialState = {
    data:[{username:"asd"}],
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                data: action.usersData
            };
        
        default:
            return state;
    }
}