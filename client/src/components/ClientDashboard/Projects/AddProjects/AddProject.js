import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  Button,
  Grow,
  Alert,
} from "@mui/material";
import { React, useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Helmet } from "react-helmet";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { costs } from "./Dropdowns";
import { clientProjectValidation } from "../../../ValidationSchemas";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { cleintAddProject } from "../../../../actions/client";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik, FormikProvider, FastField } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { uploadImage } from "../../../UploadImage";

const AddPortfolio = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [response, setresponse] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  const fileRef = useRef(null);
  const [uploadImageName, setUploadImageName] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  //const companyPortfolio = useSelector((state) => state.companyPortfolio);
  //console.log(companyPortfolio);

  const formikbag = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: user.result._id,
      title: "",
      details: "",
      location: "",
      rate: "",
      projectImage: "",
    },
    validationSchema: clientProjectValidation,

    onSubmit: (values, { setSubmitting }) => {
      // console.log(values);
      setresponse(null);

      if (previewImage) {
        uploadImage(previewImage)
          .then((res) => {
            // setFieldValue("projectImage", res);
            values.projectImage = res;

            dispatch(cleintAddProject(values))
              .then((res) => {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
                if (res) {
                  setresponse({
                    type: "error",
                    response: res.response.data.message,
                  });
                } else {
                  resetForm();

                  setresponse({
                    type: "success",
                    response:
                      "Project Added Successfully! Redirecting to Projects...",
                  });
                  setTimeout(() => {
                    setresponse(null);
                    navigate("/client/projects");
                  }, 4000);
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
          })
          .catch((err) => {
            setFieldValue("userImage", values.userImage);
            setresponse({
              type: "error",
              response: err,
            });
            setTimeout(() => {
              setresponse(null);
            }, 5000);
          });
      } else {
        dispatch(cleintAddProject(values))
          .then((res) => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            if (res) {
              setresponse({
                type: "error",
                response: res.response.data.message,
              });
            } else {
              resetForm();

              setresponse({
                type: "success",
                response:
                  "Project Added Successfully! Redirecting to Projects...",
              });
              setTimeout(() => {
                setresponse(null);
                navigate("/client/projects");
              }, 4000);
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
      }
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

    resetForm,
  } = formikbag;

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      setPreviewImage(file);
      setUploadImageName(e.target.files[0].name);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Project</title>
      </Helmet>
      <Grow
        sx={{ width: "100%" }}
        in
        timeout={400}
        style={{ transformOrigin: "0 0 0" }}
      >
        <Stack flex={1}>
          <Paper>
            <Box
              sx={{
                padding: "15px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Add Project
              </Typography>
              <Button
                component={Link}
                to="/client/projects"
                varaint="text"
                sx={{ padding: "0px" }}
              >
                Go Back
              </Button>
            </Box>

            <Divider orientation="horizontal" flexItem />

            <Box
              sx={{
                padding: "20px",
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
                <FormikProvider value={formikbag}>
                  <Box
                    sx={{
                      "& > :not(style)": {
                        margin: "8px 5px",
                        width: "100%",
                      },
                    }}
                  >
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

                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ marginBottom: "16px !important" }}
                    >
                      <FastField
                        as={TextField}
                        select
                        id="rate"
                        label="Rate Range/sq ft"
                        value={values.rate}
                        onChange={handleChange("rate")}
                        onBlur={handleBlur("rate")}
                        helperText={touched.rate ? errors.rate : ""}
                        error={touched.rate && Boolean(errors.rate)}
                        size="small"
                        variant="outlined"
                        fullWidth
                      >
                        {costs.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </FastField>
                      <FastField
                        as={TextField}
                        id="location"
                        label="Location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.location ? errors.location : ""}
                        error={touched.location && Boolean(errors.location)}
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Stack>

                    <Divider orientation="horizontal" />
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
                        Upload Images
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

                    {previewImage && (
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
                            src={URL.createObjectURL(previewImage)}
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
                    <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                      Description
                    </Typography>

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
                      endIcon={<SaveIcon />}
                      loadingPosition="end"
                    >
                      Add Project
                    </LoadingButton>
                  </Box>
                </FormikProvider>
              </form>
            </Box>
          </Paper>
        </Stack>
      </Grow>
    </>
  );
};

export default AddPortfolio;
