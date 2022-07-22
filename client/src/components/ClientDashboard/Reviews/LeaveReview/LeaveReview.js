import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  Button,
  Grow,
  Alert,
  FormControlLabel,
} from "@mui/material";
import { React, useRef, useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { clientReviewValidation } from "../../../ValidationSchemas";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { cleintAddReview } from "../../../../actions/client";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik, FormikProvider, FastField } from "formik";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

import StarIcon from "@mui/icons-material/Star";
import { convertToBase64 } from "../../../convertToBase64";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const LeaveReview = ({ projectId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [response, setresponse] = useState(null);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const [reviewSent, setReviewSent] = useState(false);
  const [uploadImageName, setUploadImageName] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      console.log(user.result._id);
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  //const companyPortfolio = useSelector((state) => state.companyPortfolio);
  //console.log(companyPortfolio);

  const fileRef = useRef(null);

  const formikbag = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: user.result._id,
      title: "",
      details: "",
      score: value,
      projectId: projectId,
      reviewImage: "",
    },
    validationSchema: clientReviewValidation,

    onSubmit: (values, { setSubmitting }) => {
      //  console.log(values);
      setresponse(null);
      setTimeout(() => {
        dispatch(cleintAddReview(values))
          .then((res) => {
            if (res) {
              setresponse({
                type: "error",
                response: res.response.data.message,
              });
            } else {
              resetForm();
              setReviewSent(true);
              setresponse({
                type: "success",
                response: "Review Added Successfully!",
              });
            }
            setSubmitting(false);
          })
          .catch(() => {
            setresponse({
              type: "error",
              response: "Server Error. Please try again!",
            });
            setSubmitting(false);
          });
      }, 400);
    },
  });

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setNewValue,
    handleReset,
    resetForm,
  } = formikbag;

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFieldValue("reviewImage", base64);
      setUploadImageName(e.target.files[0].name);
    }
  };

  return (
    <Box>
      {response && (
        <Grow in timeout={500}>
          <Alert
            elevation={1}
            severity={response.type === "error" ? "error" : "success"}
          >
            {response.response}
          </Alert>
        </Grow>
      )}
      {!reviewSent && (
        <Box>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <FormikProvider value={formikbag}>
              <Box
                sx={{
                  "& > :not(style)": {
                    margin: "8px 0px",
                  },
                }}
              >
                <Paper variant="outlined">
                  <FormControlLabel
                    sx={{ margin: "7px 10px" }}
                    control={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          maxWidth: "100%",
                          columnGap: "16px",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Select Rating:
                        </Typography>
                        <Rating
                          name="hover-feedback"
                          value={value}
                          precision={0.5}
                          getLabelText={getLabelText}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                        {value !== null && (
                          <Box>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                        <TextField
                          name="score"
                          id="score"
                          value={values.score}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.score ? errors.score : ""}
                          error={touched.score && Boolean(errors.score)}
                          hidden
                          size="small"
                          sx={{ display: "none" }}
                        />
                      </Box>
                    }
                  />
                </Paper>
                <FastField
                  as={TextField}
                  id="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.title ? errors.title : ""}
                  error={touched.title && Boolean(errors.title)}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
                <FastField
                  as={TextField}
                  id="details"
                  label="Details"
                  value={values.details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.details ? errors.details : ""}
                  error={touched.details && Boolean(errors.details)}
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  placeholder="Start from here..."
                />

                <Divider
                  sx={{ margin: "10px 0px !important" }}
                  orientation="horizontal"
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Upload Image
                  </Typography>
                  <input
                    ref={fileRef}
                    hidden
                    size="small"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <Button
                    onClick={() => {
                      fileRef.current.click();
                    }}
                    variant="outlined"
                    startIcon={<CameraAltIcon />}
                  >
                    Browse
                  </Button>
                </Stack>

                {values.reviewImage !== "" && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "55px",
                        height: "55px",
                        border: "1px solid #dce2ee",
                        borderRadius: "5px",
                        verticalAlign: "middle",
                      }}
                    >
                      <Box
                        component="img"
                        src={values.reviewImage}
                        sx={{
                          maxHeight: "50px",
                          maxWidth: "50px",
                          verticalAlign: "middle",
                        }}
                      />
                    </Box>
                    <Typography flex={1}>{uploadImageName}</Typography>
                  </Stack>
                )}

                <Divider orientation="horizontal" />

                <LoadingButton
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  variant="contained"
                  size="medium"
                  endIcon={<SaveIcon />}
                  loadingPosition="end"
                  fullWidth
                >
                  Leave Review
                </LoadingButton>
              </Box>
            </FormikProvider>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default LeaveReview;
