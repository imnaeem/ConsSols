import { React, useState, useRef } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Divider,
  Grow,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { signin } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { SigninValidation } from "../ValidationSchemas";
import { Helmet } from "react-helmet";

import LoginIcon from "@mui/icons-material/Login";

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

const SignIn = () => {
  const emailInput = useRef(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: SigninValidation,
    onSubmit: (values, { setSubmitting }) => {
      setError(null);
      setTimeout(() => {
        dispatch(signin(values))
          .then((res) => {
            if (res) {
              setSubmitting(false);
              if (res.response.data) {
                setError(res.response.data.message);
                emailInput.current.focus();
              } else {
                setError(res.message);
              }
            }
          })
          .catch((res) => {
            setError("Something went wrong, Please try again!");
            setSubmitting(false);
          });
      }, 400);
    },
  });

  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Stack
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          xs={3}
          sx={{
            maxWidth: "516px",
            margin: { xs: "30px", md: "60px" },
          }}
        >
          <Grow in>
            <Paper
              elevation={2}
              sx={{
                padding: {
                  xs: "20px 20px",
                  lg: "40px 50px",
                },
              }}
            >
              <Typography
                sx={{
                  lineHeight: "1.5",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Sign in to ConSols
              </Typography>
              <Typography
                sx={{
                  padding: "10px 0px",
                  color: "#757982",
                }}
              >
                You can sign in using your registered email address with
                ConsSols.
              </Typography>
              {error && (
                <Grow in timeout={500}>
                  <Alert
                    elevation={1}
                    severity="error"
                    sx={{
                      margin: "0px 0px 20px 0px",
                    }}
                  >
                    {error}
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

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: " flex-end",
                      margin: "0px !important",
                    }}
                  >
                    <Button
                      sx={{ padding: "0px" }}
                      component={Link}
                      to="/user/forget-password"
                    >
                      Forget Password?
                    </Button>
                  </Box>
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
                    loadingPosition="end"
                    endIcon={<LoginIcon />}
                  >
                    {isSubmitting ? "Signing in..." : "Signin"}
                  </LoadingButton>
                </Box>
              </form>
              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  margin: {
                    xs: "8px 0px",
                    lg: "20px 50px",
                  },
                }}
              >
                OR
              </Divider>
              <InlineText>
                <Typography>Don't have an account?</Typography>
                <TextButton variant="text" component={Link} to="/user/signup">
                  Signup
                </TextButton>
              </InlineText>
            </Paper>
          </Grow>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignIn;
