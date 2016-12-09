import {Map} from 'immutable'
import { ADD_FLASH_MESSAGE } from '../actions/flashMessages.js'
import shorid from 'shortid'


export default (state = Map(), action={}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate()
          type: action.message.type,
          text: action.message..text
        }
      ]
    default:
      return state

  }
}
