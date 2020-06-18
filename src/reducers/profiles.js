const initialState = {
    data:[],
    setUserToProfile:'',
};

export default function profiles(state = initialState, action) {
    switch (action.type) {
        case "SET_PROFILES":
            return {
                ...state,
                data: action.profilesData
            };

        case "SET_USERTOPROFILE":
            return {
                ...state,
                setUserToProfile: action.username
            }
        
        default:
            return state;
    }
}