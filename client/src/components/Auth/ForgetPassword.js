import { React, useState, useRef } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Checkbox,
  Divider,
  Grow,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import styled from "@emotion/styled";
import { Link, Navigate, useNavigate } from "react-router-dom";
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

const ForgetPassword = () => {
  const emailInput = useRef(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grow in>
      <Box
        sx={{
          background: "#f5f5f5",
        }}
      >
        <Helmet>
          <title>Forget Password</title>
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
            <Paper elevation={2} sx={{ padding: "40px 50px" }}>
              <Typography
                sx={{
                  lineHeight: "1.5",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Reset Your Password
              </Typography>
              <Typography
                sx={{
                  padding: "10px 0px",
                  color: "#757982",
                }}
              >
                Enter your email to reset your password
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
              <form noValidate autoComplete="off">
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
                    size="small"
                    variant="outlined"
                    fullWidth
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      padding: "10px 40px",
                      borderRadius: "25px",
                      background: "#3a7af3",
                    }}
                  >
                    Reset Password
                  </Button>
                </Box>
              </form>
              <Divider
                orientation="horizontal"
                flexItem
                sx={{ margin: "20px 50px" }}
              >
                OR
              </Divider>

              <Button
                component={Link}
                to="/user/signin"
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  padding: "10px 40px",
                  borderRadius: "25px",
                }}
              >
                Signin
              </Button>
            </Paper>
          </Stack>
        </Stack>
      </Box>
    </Grow>
  );
};

export default ForgetPassword;
