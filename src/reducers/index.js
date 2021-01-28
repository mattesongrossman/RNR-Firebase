const initialState = {
  userState: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "USER_TOGGLE":
      let toggle = !state.userState;
      return Object.assign({}, state, {
        userState: toggle,
      });
    default:
      return state;
  }
}

export default reducer;
