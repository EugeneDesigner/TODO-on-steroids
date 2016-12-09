import Validator from 'validator'
import isEmpty   from 'lodash/isEmpty'

export default function validateInput(data) {
  let errors = {}
  if (Validator.isEmpty(data.username)) {
    errors.email = 'Name is required'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Email is required'
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match'
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Email is required'
  }

  console.log(errors)
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
