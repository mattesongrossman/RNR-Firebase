const initialState = {
  userState: false,
  userData: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "USER_TOGGLE":
      let toggle = !state.userState;
      return Object.assign({}, state, {
        userState: toggle,
        userData: action.payload,
      });
    case "USER_DATA":
      return Object.assign({}, state, {
        userData: action.payload,
      });
    default:
      return state;
  }
}

export default reducer;
