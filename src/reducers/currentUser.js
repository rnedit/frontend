import {ROLES} from '../components/security/ERules'

const initialState = {
        user: {
            id: null,
            username: 'Гость',
            parentId:"0",
            firstName: null, 
            lastName: null,
            name: null,
            loggedIn: false,
            refreshJwt: null,
            updateCount:0,
            refreshJwtMaxAge: null,
            roles: [ROLES.ANONYMOUS],
        }
    }
;

//https://redux.js.org/recipes/writing-tests
export default function currentUser(state = initialState, action) {
    switch (action.type) {
        // В ответ на action CURRENT_USER изменяем state.
        case "CURRENT_USER":
            return {
                ...state,
                user: action.user
            };
        case "CURRENT_USER_UPDATE" :
            return {
                ...state,
                user: {
                    ...state.user,
                    updateCount: action.user.updateCount
                }
            };
        case "FETCH_TODOS_SUCCESS":
            const user = action.user;

            return Object.assign({}, state, user.user);
        default:
            return state;
    }
}