import { types } from "./types";

interface Action {
  type: string,
  payload: any
}

var initialState = {
  content: `---
meta:
  title: Title
  description: Description
---`

}

export const adminReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.changeContent:
      return { ...state, content: action.payload }
    default:
      return state;
  }
}

export const changeContent = (content: string) => {
  return {
    type: types.changeContent,
    payload: content
  }
}
