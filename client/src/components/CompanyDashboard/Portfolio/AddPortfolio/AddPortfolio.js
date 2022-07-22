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
import { timeline, industries, costs } from "./Dropdowns";
import { companyPortfolioValidation } from "../../../ValidationSchemas";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { addCompanyPortfolio } from "../../../../actions/company";
import SaveIcon from "@mui/icons-material/Save";
import { convertToBase64 } from "../../../convertToBase64";
import {
  useFormik,
  getIn,
  FieldArray,
  Field,
  FormikProvider,
  FastField,
} from "formik";
import { Link, useNavigate } from "react-router-dom";

const AddPortfolio = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [response, setresponse] = useState(null);
  const [uploadImageName, setUploadImageName] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
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
      timeline: "",
      industry: "",
      summary: "",
      location: "",
      projectCost: "",
      portfolioImage: "",
    },
    validationSchema: companyPortfolioValidation,

    onSubmit: (values, { setSubmitting }) => {
      //console.log(values);
      setresponse(null);
      setTimeout(() => {
        dispatch(addCompanyPortfolio(values))
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
                  "Portfolio Added Successfully! Redirecting to Portfolios...",
              });
              setTimeout(() => {
                setresponse(null);
                navigate("/company/portfolio", { replace: true });
              }, 3000);
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
    resetForm,
  } = formikbag;

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFieldValue("portfolioImage", base64);
      setUploadImageName(e.target.files[0].name);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Portfolio</title>
      </Helmet>
      <Grow in timeout={400} style={{ transformOrigin: "0 0 0" }}>
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
                Add Portfolio
              </Typography>
              <Button
                component={Link}
                to="/company/portfolio"
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
                        margin: "8px 0px",
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
                        id="timeline"
                        label="Timeline"
                        value={values.timeline}
                        onChange={handleChange("timeline")}
                        onBlur={handleBlur("timeline")}
                        helperText={touched.timeline ? errors.timeline : ""}
                        error={touched.timeline && Boolean(errors.timeline)}
                        size="small"
                        variant="outlined"
                        fullWidth
                      >
                        {timeline.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </FastField>

                      <FastField
                        as={TextField}
                        select
                        id="projectCost"
                        label="Project Cost"
                        value={values.projectCost}
                        onChange={handleChange("projectCost")}
                        onBlur={handleBlur("projectCost")}
                        helperText={
                          touched.projectCost ? errors.projectCost : ""
                        }
                        error={
                          touched.projectCost && Boolean(errors.projectCost)
                        }
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
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        "& > :not(style)": { width: "100%" },

                        marginBottom: "16px !important",
                      }}
                    >
                      <FastField
                        as={TextField}
                        select
                        id="industry"
                        label="Industry"
                        value={values.industry}
                        onChange={handleChange("industry")}
                        onBlur={handleBlur("industry")}
                        helperText={touched.industry ? errors.industry : ""}
                        error={touched.industry && Boolean(errors.industry)}
                        size="small"
                        variant="outlined"
                        fullWidth
                      >
                        {industries.map((option) => (
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

                    {values.portfolioImage !== "" && (
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
                            src={values.portfolioImage}
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
                      id="summary"
                      label="Summary"
                      value={values.summary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.summary ? errors.summary : ""}
                      error={touched.summary && Boolean(errors.summary)}
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
                      Add Portfolio
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
