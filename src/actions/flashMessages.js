import * as types from '../constants/types'

export function addFlashMessage(message) {
  console.log(message)
  return {
    type: types.ADD_FLASH_MESSAGE,
    message
  }
}


export function deleteFlashMessage(id) {
  return {
    type: types.DELETE_FLASH_MESSAGE,
    id
  }
}
