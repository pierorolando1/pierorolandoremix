import { types } from "./types";

export const changeTitle = (newTitle: string) => ({
  type: types.changeTitle,
  payload: newTitle
})
