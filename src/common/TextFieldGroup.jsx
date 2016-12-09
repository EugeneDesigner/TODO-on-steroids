import React, {PropTypes} from 'react'
import classnames from 'classnames'

const TextFieldGroup = ({ field, value, label, error, type, onChange}) => {
  return (
    <div className={classnames("form__group", {"has__error": error})}>
      <label>{label}</label>
      <input
        type={type}
        value = {value}
        onChange = {onChange}
        name= {field}
        className="form__control"/>
        {error && <span className="form__erros">{error}</span>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  erros: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
