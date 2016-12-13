import axios from 'axios'
import setAuthorizationToken from '../../utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'
import * as types from '../constants/types.js'


export function setCurrentUser(user) {
  return {
    type: type.SET_CURRENT_USER,
    user
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}


export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      console.log(jwt.decode(token))
      dispatch(setCurrentUser(jwtDecode(token)))

    })
  }
}
