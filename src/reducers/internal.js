import { setInternalData, setUpdateInternalData,
     setUpdateRecipientData, setUpdateAttachmentNames, setUpdateAttachmentIds } from '../reduxactions/actions';
import { internalsApi } from "../api/Internals"


const initialState = {
    draft: false,
    subject: "",
    typeAgreement: 0,
};

export default function internal(state = initialState, action) {
    switch (action.type) {
        case "SET_INTERNAL":
            return {
                ...action.data
            };

        case "UPDATE_INTERNAL":
            return {
                ...action.data
            };

        case "UPDATE_RECIPIENT_INTERNAL":
            return {
                ...state,
                recipientName: action.data.name,
                recipient: action.data.id
            };

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

// export const setInternal = (data) => {
//     return (dispatch) => {
//         internalsApi.getInternal({ id: data })
//             .then(r => {
//                 if (r !== undefined && Number(r.status) === 200) {
//                     if (r.data !== null && r.data !== undefined)
//                         dispatch(setInternalData(r.data));
//                 }

//             })

//     }
// }

export const setInternalApollo = (data) => {
    return (dispatch) => {
                        dispatch(setInternalData(data));
                }

}

export const setUpdateInternal = (data) => {
    return (dispatch) => {
        dispatch(setUpdateInternalData(data));
    }
}

export const setUpdateRecipient = (data) => {
    return (dispatch) => {
        dispatch(setUpdateRecipientData(data));
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

