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
import LeftSidebar from "../../LeftSidebar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Helmet } from "react-helmet";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { duration } from "./Dropdowns";
import { promotionValidation } from "../../../ValidationSchemas";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { promoteCompany } from "../../../../actions/company";
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

  const formikbag = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: user.result._id,
      title: "",
      duration: "",
      cost: "",
    },
    validationSchema: promotionValidation,

    onSubmit: (values, { setSubmitting }) => {
      //console.log(values);
      setresponse(null);
      setTimeout(() => {
        dispatch(promoteCompany(values))
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
                  "Request Sent Successfully! Your company will be listed as promoted once it approved...",
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

  const customHandleChange = (e) => {
    const { value } = e.target;

    if (value === "7 days") {
      setFieldValue("cost", "100 $");
    }
    if (value === "15 days") {
      setFieldValue("cost", "200 $");
    }
    if (value === "30 days") {
      setFieldValue("cost", "300 $");
    }
    setFieldValue("duration", value);
    // setFieldValue('slug', value.toLowerCase());
  };

  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>New Promotion</title>
      </Helmet>
      <Box
        sx={{
          margin: "0px 45px",
          padding: "30px 15px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={3}
          alignItems="flex-start"
        >
          <LeftSidebar />

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
                    New Promotion
                  </Typography>
                  <Button
                    component={Link}
                    to="/company/promotions"
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
                            id="duration"
                            label="Duration"
                            value={values.duration}
                            onChange={customHandleChange}
                            onBlur={handleBlur("duration")}
                            helperText={touched.duration ? errors.duration : ""}
                            error={touched.duration && Boolean(errors.duration)}
                            size="small"
                            variant="outlined"
                            fullWidth
                          >
                            {duration.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </FastField>

                          <FastField
                            as={TextField}
                            id="cost"
                            label="Estimated Cost"
                            value={values.cost}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.cost ? errors.cost : ""}
                            error={touched.cost && Boolean(errors.cost)}
                            size="small"
                            variant="outlined"
                            fullWidth
                            InputProps={{ readOnly: true }}
                          />
                        </Stack>
                        <Divider
                          sx={{ margin: "20px 10px !important" }}
                          flexItem
                        />
                        <Stack direction="row" justifyContent="flex-end">
                          <LoadingButton
                            type="submit"
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            variant="contained"
                            size="large"
                            sx={{
                              padding: "10px 40px",

                              background: "#3a7af3",
                            }}
                            endIcon={<SaveIcon />}
                            loadingPosition="end"
                          >
                            Promote
                          </LoadingButton>
                        </Stack>
                      </Box>
                    </FormikProvider>
                  </form>
                </Box>
              </Paper>
            </Stack>
          </Grow>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddPortfolio;
