import React, {PropTypes} from 'react'
import classnames from 'classnames'

const TextFieldGroup = ({ field, value, error, type, onChange, checkUserExists, placeholder }) => {
  return (
    <div className={classnames("form__group", {"has__error": error})}>
      <input
        type={type}
        onBlur={checkUserExists}
        value = {value}
        onChange = {onChange}
        name= {field}
        placeholder= {placeholder}
        className="form__control"/>
        {error && <div className="form__errors">{error}</div>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  erros: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func,
  placeholder: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
