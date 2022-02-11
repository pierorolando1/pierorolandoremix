import { types } from "./types";

interface Action {
  type: string,
  payload: any
}

var initialState = {
  title: "Posts",
  backButton: false
}

export const blogReducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case types.changeTitle:
      return { ...state, title: action.payload }
    case types.backButton:
      return { ...state, backButton: true }
    case types.unbackButton:
      return { ...state, backButton: false }
    default:
      return state;
  }

}
