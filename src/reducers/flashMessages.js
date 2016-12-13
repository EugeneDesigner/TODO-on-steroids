import {Map} from 'immutable'
import * as types from '../actions/flashMessages.js'
import shorid from 'shortid'


function deleteItem(state, itemId) {
  return state.update('flashMessages',
      (flashMessage) => flashMessage.filterNot(
        (item) => item.get('id') === itemId
      )
    )
  }

export default (state = Map(), action={}) => {
  switch (action.type) {
    case types.ADD_FLASH_MESSAGE:
      return (
        state.push(Map({
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }))
      )

    case types.DELETE_FLASH_MESSAGE:
      return deleteItem(state, action.id)
    default:
        return state

  }
}
