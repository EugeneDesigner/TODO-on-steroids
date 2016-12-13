import React, {PropTypes} from 'react'
import classnames from 'classnames'

const TextFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists }) => {
  return (
    <div className={classnames("form__group", {"has__error": error})}>
      <label>{label}</label>
      <input
        type={type}
        onBlur={checkUserExists}
        value = {value}
        onChange = {onChange}
        name= {field}
        className="form__control"/>
        {error && <span className="form__erros">{error}</span>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  erros: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
