const initialState = {
          user:{
              id:0,
              username:'Гость',
              loggedIn: false
          }
    }
;


export default function currentUser(state = initialState, action) {
    switch (action.type) {
        // В ответ на action CURRENT_USER изменяем state.
        case "CURRENT_USER":
            return {
                user: action.user
            }
        default:
            return state;
    }
}