import { setAccessProfile } from '../reduxactions/actions';

const initialState = {
    data:[
        {id:0,
         name: "ACCESS_STRUCT",
         info: ""
        },
        {id:1,
            name: "ACCESS_SPRAV",
            info: ""
           },
    ]
};

export default function accessProfile(state = initialState, action) {
    switch (action.type) {
        case "SET_ACCESS":
            return {
                ...state,
                data: action.data
            };
        
        default:
            return state;
    }
    
}

export const setAccessProfiles = (data) => {
    return (dispatch) => {
        dispatch(setAccessProfile(data));
    }
   
}

export const setDefaultProfiles = () => {
    return (dispatch) => {
        dispatch(setAccessProfile(initialState.data));
    }
   
}