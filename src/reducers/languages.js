const initialState = [
    {
        id: '_username',
        name: 'Имя пользователя'
    }
];

export default function tracks(state = initialState, action) {
    if (action.type === 'ADD_WORD') {
        return [
            ...state,
            action.payload
        ];
    } else if (action.type === 'FETCH_WORDS_SUCCESS') {
        return action.payload;
    }
    return state;
}