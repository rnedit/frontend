import { setCreateInternalData, setUpdateRecipientCreateInternalData,
     setUpdateAttachmentIds,setUpdateAttachmentNames } from '../reduxactions/actions';

const initialState = {
    draft: false,
    subject: "",
    typeAgreement: 0,
    recipientName:"",
    recipient:"",
    isAttachments:false,
    isAnotherAttachments: false,
};

export default function createInternal(state = initialState, action) {
    switch (action.type) {
        case "SET_CREATEINTERNAL": 
            return {
                ...initialState,
                ...action.data
            };
                   
        case "UPDATE_RECIPIENT_CREATEINTERNAL":
            return {
                ...state,
                recipientName: action.data.name,
                recipient: action.data.id
            }
            case "UPDATE_ATTACHMENTS_NAMES":
                return {
                    ...state,
                    attachmentNames: action.data.names
                };
                case "UPDATE_ATTACHMENTS_IDS":
                    return {
                        ...state,
                        attachmentIds: action.data.ids
                    };

        default:
            return state;
    }

}

export const setCreateNewInternal = (data) => {
    return (dispatch) => {
        dispatch(setCreateInternalData(data));
    }
}

export const setUpdateRecipient = (data) => {
    return (dispatch) => {
        dispatch(setUpdateRecipientCreateInternalData(data));
    }
}


export const setUpdateAttachmentName = (data) => {
    return (dispatch) => {
        dispatch(setUpdateAttachmentNames(data));
    }
}

export const setUpdateAttachmentId = (data) => {
    return (dispatch) => {
        dispatch(setUpdateAttachmentIds(data));
    }
}