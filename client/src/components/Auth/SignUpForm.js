import { React, useRef, useState } from "react";
import {
  Button,
  Typography,
  Divider,
  Paper,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Grow,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { useFormik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/auth";
import SendIcon from "@mui/icons-material/Send";
import { SignupValidation } from "../ValidationSchemas";

const InlineText = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const TextButton = styled(Button)(({ theme }) => ({
  minWidth: "fit-content",
  justifyContent: "flex-start",
  padding: "0px",
  marginLeft: "8px",
  fontWeight: "600",
}));

const SignUpForm = () => {
  const [response, setresponse] = useState(null);

  const [isCompanySignup, setIsCompanySignup] = useState(false);
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    resetForm,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      companySignup: false,
    },

    validationSchema: SignupValidation,
    onSubmit: (values, { setSubmitting }) => {
      setresponse(null);
      //console.log(response);
      setTimeout(() => {
        dispatch(signup(values))
          .then((res) => {
            setSubmitting(false);
            if (res) {
              setresponse({
                type: "error",
                response: res.response.data.message,
              });

              emailInput.current.focus();
            } else {
              resetForm();
              setresponse({
                type: "success",
                response: "Account created Successfully. You can signin now!",
              });
            }
          })
          .catch(() => {
            setresponse({
              type: "error",
              response: "Server Error. Please try again!",
            });
          });

        //console.log(values);

        //   console.log(values);
        //   // submit to the server
        //   // handleReset();
        //   alert(JSON.stringify(values, null, 2));
      }, 400);
    },
  });

  const dispatch = useDispatch();

  const fname = useRef(null);
  const emailInput = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setresponse(null);
    setIsCompanySignup(!isCompanySignup);
    // setTimeout(() => {
    //   fname.current.focus();
    // }, 300);
    setShowPassword(false);

    //handleReset();
    // handleReset().then((values) => {
    //   values.companySignup = !isCompanySignup;
    // });

    setTimeout(() => {
      values.companySignup = !isCompanySignup;
      //console.log(values.companySignup);
    }, 300);
    //values.companySignup = !isCompanySignup;
  };

  return (
    <Grow in>
      <Box flex={1}>
        <Paper elevation={2}>
          <Typography
            sx={{
              padding: "15px 20px",
              fontSize: "20px",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {isCompanySignup
              ? "Get Your Company Listed"
              : "Register Your Account"}
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <Box
            sx={{
              padding: "20px 20px 30px 20px",
            }}
          >
            {response && (
              <Grow in timeout={500}>
                <Alert
                  elevation={1}
                  severity={response.type === "error" ? "error" : "success"}
                  sx={{
                    margin: "0px 0px 20px 0px",
                  }}
                >
                  {response.response}
                </Alert>
              </Grow>
            )}
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Box
                sx={{
                  "& > :not(style)": { margin: "8px 0px" },
                }}
              >
                <TextField
                  id="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.firstName ? errors.firstName : ""}
                  error={touched.firstName && Boolean(errors.firstName)}
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputRef={fname}
                />
                <TextField
                  id="lastName"
                  label="last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName ? errors.lastName : ""}
                  error={touched.lastName && Boolean(errors.lastName)}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  inputRef={emailInput}
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  size="small"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  id="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                  size="small"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.confirmPassword ? errors.confirmPassword : ""
                  }
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  size="small"
                  variant="outlined"
                  fullWidth
                />

                {isCompanySignup && (
                  <TextField
                    name="companyName"
                    label="Company Name"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.companyName ? errors.companyName : ""}
                    error={touched.companyName && Boolean(errors.companyName)}
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                )}

                <LoadingButton
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    padding: "10px 40px",
                    borderRadius: "25px",
                    background: "#3a7af3",
                  }}
                  endIcon={<SendIcon />}
                  loadingPosition="end"
                >
                  {isSubmitting ? "Creating Account..." : "Signup"}
                </LoadingButton>
                {/* <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    padding: "10px 40px",
                    borderRadius: "25px",
                    background: "#3a7af3",
                  }}
                >
                  {isSubmitting ? "Creating Account..." : "Signup"}
                </Button> */}
              </Box>
            </form>

            <Divider
              orientation="horizontal"
              flexItem
              sx={{ margin: "8px 0px" }}
            >
              OR
            </Divider>
            <InlineText>
              <Typography>
                {isCompanySignup
                  ? "Don't have an account?"
                  : "Register your Company?"}
              </Typography>
              <TextButton variant="text" onClick={switchMode}>
                {isCompanySignup ? "Signup" : "Get Listed"}
              </TextButton>
            </InlineText>
            <InlineText>
              <Typography>Already have an account?</Typography>
              <TextButton variant="text" component={Link} to="/user/signin">
                SignIn
              </TextButton>
            </InlineText>
          </Box>
        </Paper>
      </Box>
    </Grow>
  );
};

export default SignUpForm;
