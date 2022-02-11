
import { types } from "./types";

interface Action {
  type: string,
  payload: any
}

var initialState = {
  open: false,
}

export const modalReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.openModal:
      return { ...state, open: true }
    case types.closeModal:
      return { ...state, open: false }
    default:
      return state;
  }
}
