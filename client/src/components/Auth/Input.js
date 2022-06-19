import { InputAdornment, TextField, IconButton } from "@mui/material";
import { React, forwardRef } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = forwardRef((props, ref) => {
  const {
    id,
    name,
    handleChange,
    label,
    autoFocus,
    type,
    handleShowPassword,
    value,
    handleBlur,
    error,
    helperText,
  } = props;

  return (
    <TextField
      error={error}
      helperText={helperText}
      onBlur={handleBlur}
      id={id}
      inputRef={ref}
      value={value}
      name={name}
      onChange={handleChange}
      varient="outlined"
      size="small"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  );
});

export default Input;
