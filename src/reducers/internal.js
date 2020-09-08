import { setInternalData, setUpdateInternalData, setUpdateRecipientData } from '../reduxactions/actions';
import { internalsApi } from "../api/Internals"

const initialState = {
    draft: false,
    subject: "",
};

export default function internal(state = initialState, action) {
    switch (action.type) {
        case "SET_INTERNAL":
            return {
                ... action.data
            };

        case "UPDATE_INTERNAL":
                return {
                    ... action.data
                };

        case "UPDATE_RECIPIENT_INTERNAL":
                    return {
                        ...state,
                        recipientName: action.data.name + " ( " + action.data.user.username + " )",
                        recipient: action.data.id
                    };
                
        default:
            return state;
    }
    
}

export const setInternal = (data) => {
    return (dispatch) => {
        internalsApi.getInternal({id:data})
        .then(r=>{
            if (r!==undefined && Number(r.status)===200) {
                if (r.data!==null && r.data!==undefined)
                dispatch(setInternalData(r.data));
            }
           
        })
        
    }
}

export const setUpdateInternal = (data) => {
    return (dispatch) => {
        dispatch(setUpdateInternalData(data));
    }
}

export const setCreateNewInternal = (data) => {
    return (dispatch) => {
        dispatch(setUpdateInternalData(data));
    }
}

export const setUpdateRecipient = (data) => {
    return (dispatch) => {
        dispatch(setUpdateRecipientData(data));
    }
}

