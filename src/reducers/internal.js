import { setInternalData, setUpdateInternalData } from '../reduxactions/actions';
import { internalsApi } from "../api/Internals"

const initialState = {
    id:"",
    number:"",
    draft:false,
    subject:"",
    creationDate:""
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

