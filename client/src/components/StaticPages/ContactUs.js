import { React, useRef, useState } from "react";

import {
  Button,
  Stack,
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
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { contactUs } from "../../actions/contact";
import SendIcon from "@mui/icons-material/Send";
import { ContactUsValidation } from "../ValidationSchemas";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [response, setresponse] = useState(null);
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
      fullName: "",
      subject: "",
      message: "",
      email: "",
    },

    validationSchema: ContactUsValidation,
    onSubmit: (values, { setSubmitting }) => {
      setresponse(null);

      setTimeout(() => {
        dispatch(contactUs(values))
          .then((res) => {
            setSubmitting(false);
            if (res) {
              setresponse({
                type: "error",
                response: res.response.data.message,
              });
            } else {
              resetForm();
              setresponse({
                type: "success",
                response: "Message Sent Successfully!",
              });
            }
          })
          .catch(() => {
            setresponse({
              type: "error",
              response: "Server Error. Please try again!",
            });
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
        <title>Contact Us</title>
      </Helmet>
      <Box
        sx={{
          padding: { xs: "40px", sm: "40px 60px" },
        }}
      >
        <Typography
          sx={{
            color: "#181818",
            fontSize: "30px",
            lineHeight: "2.12rem",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Register with GoodFirms account
        </Typography>
        <Stack
          alignItems="center"
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 0, md: 3 }}
        >
          <Box
            flex={1.2}
            sx={{
              marginTop: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                color: "#181818",
                fontWeight: "700",
              }}
            >
              Get Started on GoodFirms:
            </Typography>
            <Typography sx={{ padding: "10px 0px" }}>
              For any business, conversion is everything. In the cutthroat
              world, to increase conversion it is of paramount importance for
              any business to have a good online reputation. GoodFirms provides
              IT companies & software vendors a platform to manage and improve
              their online credibility and reputation.
            </Typography>
            <Typography sx={{ padding: "10px 0px" }}>
              Add your business to GoodFirms to boost reputation which in turn
              will increase online exposure, drive traffic and explode revenues!
              Take the actionable profit-driven first step by filling the form
              given here.
            </Typography>
            <Box
              component="img"
              sx={{
                zIndex: "1",
                maxWidth: "100%",
              }}
              alt="Signup"
              src="https://www.goodfirms.co/img/signupbg.jpg"
            />
          </Box>

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
                  Contact Us
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
                        severity={
                          response.type === "error" ? "error" : "success"
                        }
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
                        id="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.fullName ? errors.fullName : ""}
                        error={touched.fullName && Boolean(errors.fullName)}
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        id="subject"
                        label="Subject"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.subject ? errors.subject : ""}
                        error={touched.subject && Boolean(errors.subject)}
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        id="email"
                        label="Email"
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
                        id="message"
                        label="Message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.message ? errors.message : ""}
                        error={touched.message && Boolean(errors.message)}
                        size="small"
                        variant="outlined"
                        fullWidth
                        rows={5}
                        multiline
                      />

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
                        {isSubmitting ? "Sending Message..." : "Send Message"}
                      </LoadingButton>
                    </Box>
                  </form>
                </Box>
              </Paper>
            </Box>
          </Grow>
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactUs;
