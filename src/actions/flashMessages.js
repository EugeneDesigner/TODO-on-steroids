import { ADD_FLASH_MESSAGE } from '../constants/types'

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}
