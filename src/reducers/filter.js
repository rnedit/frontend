const initialState = '';

export default function filterTracks(state = initialState, action) {
    if (action.type === 'FIND') {
        return action.payload;
    }
    return state;
}