import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  Button,
  Grow,
  Alert,
  OutlinedInput,
  FormLabel,
  InputLabel,
  TextField,
  FormControl,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { React, useState, useEffect, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  useFormik,
  getIn,
  FieldArray,
  FormikProvider,
  FastField,
} from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { companyFounded, companyEmployees, companyRate } from "./Dropdowns";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { CompanyFormValidation } from "../../ValidationSchemas";
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "../../../actions/company";
import { convertToBase64 } from "../../convertToBase64";
import loadingImage from "../../../images/loading-image.png";
import loadingIcon from "../../../images/loading.gif";
import { Helmet } from "react-helmet";
import { uploadImage } from "../../UploadImage";

const EditCompany = () => {
  //const user = JSON.parse(localStorage.getItem("profile"));
  const [response, setresponse] = useState(null);
  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const company = useSelector((state) => state.companyProfile, shallowEqual);
  // console.log(company);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      dispatch(getCompanyProfile(user.result._id))
        .then((res) => {
          if (res) {
            console.log(res);
          }
        })
        .catch((err) => {
          if (!err) {
            console.log(err);
          }
        });
    }
  }, [dispatch]);

  const formikbag = useFormik({
    enableReinitialize: true,
    initialValues: company,
    validationSchema: CompanyFormValidation,

    onSubmit: (values, { setSubmitting }) => {
      setresponse(null);
      setTimeout(() => {
        dispatch(updateCompanyProfile(values))
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
              //   resetForm();

              setresponse({
                type: "success",
                response: "Company Profile Updated Successfully!",
              });
              setTimeout(() => {
                setresponse(null);
              }, 5000);
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
  } = formikbag;

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFieldValue("companyImage", loadingIcon);
      uploadImage(file)
        .then((res) => {
          dispatch(
            updateCompanyProfile({ userId: values.userId, companyImage: res })
          ).then(() => {
            setFieldValue("companyImage", res);
            setresponse({
              type: "success",
              response: "Image Updated Successfully",
            });

            setTimeout(() => {
              setresponse(null);
            }, 5000);
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
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Company Profile</title>
      </Helmet>
      <Grow in timeout={400} style={{ transformOrigin: "0 0 0" }}>
        <Stack sx={{ width: "100%" }} flex={1}>
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
                Edit Company Profile
              </Typography>
            </Box>

            <Divider orientation="horizontal" flexItem />

            {company._id ? (
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                  <FormikProvider value={formikbag}>
                    <Box
                      sx={{
                        "& > :not(style)": { margin: "8px 5px" },
                      }}
                    >
                      <Stack
                        sx={{ width: "100%" }}
                        direction={{
                          xs: "column",
                          lg: "row",
                        }}
                        spacing={2}
                        alignItems="center"
                      >
                        <Stack direction="column" spacing={1}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "135px",
                              height: "135px",
                              border: "1px solid #dce2ee",
                              borderRadius: "5px",
                              verticalAlign: "middle",
                            }}
                          >
                            <Box
                              component="img"
                              src={
                                values.companyImage === ""
                                  ? loadingImage
                                  : values.companyImage
                              }
                              sx={{
                                maxHeight: "130px",
                                maxWidth: "130px",
                                verticalAlign: "middle",
                              }}
                            />
                          </Box>
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
                            Edit Image
                          </Button>
                        </Stack>
                        <Stack
                          alignItems="center"
                          direction="column"
                          spacing={2}
                          flex={2}
                          sx={{
                            "& > :not(style)": { width: "100%" },
                            width: "100%",
                          }}
                        >
                          <Stack
                            alignItems="center"
                            direction={{
                              xs: "column",
                              lg: "row",
                            }}
                            spacing={2}
                            sx={{ width: "100%" }}
                          >
                            <FastField
                              flex={2}
                              as={TextField}
                              sx={{ Input: { fill: "red" } }}
                              disabled
                              id="companyName"
                              label="Company Name"
                              value={values.companyName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched.companyName ? errors.companyName : ""
                              }
                              error={
                                touched.companyName &&
                                Boolean(errors.companyName)
                              }
                              size="small"
                              variant="outlined"
                              fullWidth
                            />
                            <FastField
                              as={TextField}
                              id="username"
                              label="Username"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched.username ? errors.username : ""
                              }
                              error={
                                touched.username && Boolean(errors.username)
                              }
                              size="small"
                              variant="outlined"
                              sx={{ width: { lg: "500px", xs: "100%" } }}
                            />
                          </Stack>

                          <FastField
                            as={TextField}
                            id="tagline"
                            label="Tagline"
                            value={values.tagline}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.tagline ? errors.tagline : ""}
                            error={touched.tagline && Boolean(errors.tagline)}
                            size="small"
                            variant="outlined"
                          />

                          <FastField
                            as={TextField}
                            id="website"
                            label="Website"
                            value={values.website}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.website ? errors.website : ""}
                            error={touched.website && Boolean(errors.website)}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      </Stack>
                      <Divider
                        orientation="horizontal"
                        sx={{ margin: "30px 0px !important" }}
                      />
                      <Box>
                        {response && (
                          <Grow in timeout={300}>
                            <Alert
                              elevation={1}
                              severity={
                                response.type === "error" ? "error" : "success"
                              }
                              sx={{
                                margin: "0px 0px 30px 0px",
                              }}
                            >
                              {response.response}
                            </Alert>
                          </Grow>
                        )}
                      </Box>

                      <Stack
                        direction={{
                          xs: "column",
                          lg: "row",
                        }}
                        spacing={2}
                        sx={{
                          marginBottom: "16px !important",
                        }}
                      >
                        <FastField
                          as={TextField}
                          select
                          id="founded"
                          label="Founded"
                          value={values.founded}
                          onChange={handleChange("founded")}
                          onBlur={handleBlur("founded")}
                          helperText={touched.founded ? errors.founded : ""}
                          error={touched.founded && Boolean(errors.founded)}
                          size="small"
                          variant="outlined"
                          fullWidth
                        >
                          {companyFounded.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </FastField>

                        <FastField
                          as={TextField}
                          select
                          id="companyEmployees"
                          label="Company Employees"
                          value={values.employees}
                          onChange={handleChange("employees")}
                          onBlur={handleBlur("companyEmployees")}
                          helperText={touched.employees ? errors.employees : ""}
                          error={touched.employees && Boolean(errors.employees)}
                          size="small"
                          variant="outlined"
                          fullWidth
                        >
                          {companyEmployees.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </FastField>

                        <FastField
                          as={TextField}
                          select
                          id="companyRate"
                          label="Construction Rate/ft squre"
                          value={values.rate}
                          onChange={handleChange("rate")}
                          onBlur={handleBlur("companyRate")}
                          helperText={touched.rate ? errors.rate : ""}
                          error={touched.rate && Boolean(errors.rate)}
                          size="small"
                          variant="outlined"
                          fullWidth
                        >
                          {companyRate.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </FastField>
                      </Stack>
                      <Stack
                        direction={{
                          xs: "column",
                          lg: "row",
                        }}
                        spacing={2}
                        sx={{ marginBottom: "16px !important" }}
                      >
                        <FastField
                          as={TextField}
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
                        <FastField
                          as={TextField}
                          id="phone"
                          label="Mobile Number"
                          type="text"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.phone ? errors.phone : ""}
                          error={touched.phone && Boolean(errors.phone)}
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Stack>

                      <Typography sx={{ fontSize: "25px", fontWeight: "500" }}>
                        Location
                      </Typography>
                      <Stack
                        direction={{
                          xs: "column",
                          lg: "row",
                        }}
                        spacing={2}
                        sx={{
                          "& > :not(style)": { width: "100%" },

                          marginBottom: "16px !important",
                        }}
                      >
                        <FastField
                          as={TextField}
                          id="address.country"
                          label="Country"
                          type="text"
                          value={values.address.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            getIn(touched, "address.country")
                              ? getIn(errors, "address.country")
                              : ""
                          }
                          error={
                            getIn(touched, "address.country") &&
                            Boolean(getIn(errors, "address.country"))
                          }
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                        <FastField
                          as={TextField}
                          id="address.state"
                          label="State"
                          type="text"
                          value={values.address.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            getIn(touched, "address.state")
                              ? getIn(errors, "address.state")
                              : ""
                          }
                          error={
                            getIn(touched, "address.state") &&
                            Boolean(getIn(errors, "address.state"))
                          }
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Stack>
                      <Stack
                        direction={{
                          xs: "column",
                          lg: "row",
                        }}
                        spacing={2}
                        sx={{
                          "& > :not(style)": { width: "100%" },
                          marginBottom: "16px !important",
                        }}
                      >
                        <FastField
                          as={TextField}
                          id="address.city"
                          label="City"
                          type="text"
                          value={values.address.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            getIn(touched, "address.city")
                              ? getIn(errors, "address.city")
                              : ""
                          }
                          error={
                            getIn(touched, "address.city") &&
                            Boolean(getIn(errors, "address.city"))
                          }
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                        <FastField
                          as={TextField}
                          id="address.streetAddress"
                          label="Streat Address"
                          type="text"
                          value={values.address.streetAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            getIn(touched, "address.streetAddress")
                              ? getIn(errors, "address.streetAddress")
                              : ""
                          }
                          error={
                            getIn(touched, "address.streetAddress") &&
                            Boolean(getIn(errors, "address.streetAddress"))
                          }
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Stack>
                      <Typography sx={{ fontSize: "25px", fontWeight: "500" }}>
                        Summary
                      </Typography>
                      <Box>
                        <FastField
                          as={TextField}
                          value={values.summary}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.summary ? errors.summary : ""}
                          error={touched.summary && Boolean(errors.summary)}
                          size="small"
                          variant="outlined"
                          id="summary"
                          label="Summary"
                          multiline
                          rows={5}
                          placeholder="Start from here..."
                          fullWidth
                        />
                      </Box>

                      <FieldArray
                        name="services"
                        render={(arrayHelpers) => (
                          <Box>
                            <Box>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{
                                  margin: "15px 0px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "25px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Services
                                </Typography>
                                <Button
                                  variant="contained"
                                  type="button"
                                  onClick={() => {
                                    arrayHelpers.push({
                                      title: "",
                                      details: "",
                                    });
                                    // if (newService) {
                                    //   newService.current.scrollIntoView({
                                    //     behavior: "smooth",
                                    //     block: "start",
                                    //   });
                                    // }
                                  }}
                                >
                                  Add Service
                                </Button>
                              </Stack>
                            </Box>
                            <Box
                            // sx={{ overflow: "auto", maxHeight: "200px" }}
                            >
                              {company &&
                                values.services.map((service, index) => (
                                  <Box key={index}>
                                    <Box
                                      sx={{
                                        "& > :not(style)": {
                                          margin: "8px 0px",
                                        },
                                      }}
                                    >
                                      <FastField
                                        name={`services[${index}].title`}
                                        value={service.title}
                                        as={TextField}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={
                                          getIn(
                                            touched,
                                            `services[${index}].title`
                                          )
                                            ? getIn(
                                                errors,
                                                `services[${index}].title`
                                              )
                                            : ""
                                        }
                                        error={
                                          getIn(
                                            touched,
                                            `services[${index}].title`
                                          ) &&
                                          Boolean(
                                            getIn(
                                              errors,
                                              `services[${index}].title`
                                            )
                                          )
                                        }
                                        size="small"
                                        variant="outlined"
                                        label="Title"
                                        placeholder="Enter service title"
                                        fullWidth
                                      />
                                      <FastField
                                        name={`services[${index}].details`}
                                        value={service.details}
                                        as={TextField}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={
                                          getIn(
                                            touched,
                                            `services[${index}].details`
                                          )
                                            ? getIn(
                                                errors,
                                                `services[${index}].details`
                                              )
                                            : ""
                                        }
                                        error={
                                          getIn(
                                            touched,
                                            `services[${index}].details`
                                          ) &&
                                          Boolean(
                                            getIn(
                                              errors,
                                              `services[${index}].details`
                                            )
                                          )
                                        }
                                        size="small"
                                        variant="outlined"
                                        label="Details"
                                        multiline
                                        rows={5}
                                        placeholder="Enter service details"
                                        fullWidth

                                        //onChange={handleChange}
                                        // onBlur={handleBlur}
                                        //value={service.details}
                                        //name={`services.${index}.details`}
                                      />
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <Button
                                        variant="outlined"
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        Remove
                                      </Button>
                                    </Box>
                                  </Box>
                                ))}
                            </Box>
                          </Box>
                        )}
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
                        Save Changes
                      </LoadingButton>
                    </Box>
                  </FormikProvider>
                </form>
              </Box>
            ) : (
              <Box sx={{ padding: "20px" }}>
                <LinearProgress />
              </Box>
            )}
          </Paper>
        </Stack>
      </Grow>
    </>
  );
};

export default EditCompany;
