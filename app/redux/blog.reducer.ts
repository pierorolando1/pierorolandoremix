import { types } from "./types";

interface Action {
  type: string,
  payload: any
}

var initialState = {
  title: "Posts"
}

export const authReducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case types.changeTitle:
      return { ...state, title: action.payload }

    default:
      return state;
  }

}
