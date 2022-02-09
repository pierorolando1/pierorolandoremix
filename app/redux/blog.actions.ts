import { types } from "./types";

export const changeTitle = (newTitle: string) => ({
  type: types.changeTitle,
  payload: newTitle
})

export const setBackButton = () => ({
  type: types.backButton
})

export const unSetBackButton = () => ({
  type: types.unbackButton
})
