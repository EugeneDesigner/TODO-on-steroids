

export function login(payload) {
  return {
    type: LOGIN_REQUEST
  }
}

export function logout() {
  return {
    type: LOGOUT_SUCCESS
  }
}
