import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
const classes = PropTypes.object.isRequired;

function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  if (!props.id) {
    throw new Error(`no id for props ${JSON.stringify(props)}`);
  }
  const {
    value,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options,
    schema,
    formContext,
    registry,
    help,
    rawHelp,
    rawErrors,
    description,
    uiSchema,
    ...inputProps
  } = props;

  inputProps.type = options.inputType || inputProps.type || "text";
  const _onChange = ({ target: { value } }) => {
    return props.onChange(value === "" ? options.emptyValue : value);
  };
  const readonly = schema ? schema.readOnly : false;
  return (
    <TextField
      className={classes.textField}
      margin="dense"
      readOnly={readonly}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      fullWidth={true}
      error={rawErrors && rawErrors.length > 0}
      helperText={rawErrors ? rawErrors.join(", ") : ""}
      variant="outlined"
      value={value == null ? "" : value}
      {...inputProps}
      InputLabelProps={{
        shrink: inputProps.type !== "text" || value != null,
      }}
      onChange={_onChange}
      onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
      onFocus={onFocus && (event => onFocus(inputProps.id, event.target.value))}
    />
  );
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default BaseInput;
