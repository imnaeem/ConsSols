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
import { React, useState, useEffect, useLayoutEffect } from "react";
import LeftSidebar from "../LeftSidebar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useFormik, getIn } from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { companyFounded, companyEmployees, companyRate } from "./Dropdowns";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { CompanyFormValidation } from "../../ValidationSchemas";
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "../../../actions/company";

const EditCompany = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [response, setresponse] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const company = useSelector((state) => state.companyProfile, shallowEqual);
  // console.log(company);

  useEffect(() => {
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

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [dispatch]);

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
    enableReinitialize: true,
    initialValues: company,
    validationSchema: CompanyFormValidation,

    onSubmit: (values, { setSubmitting }) => {
      setresponse(null);
      setTimeout(() => {
        dispatch(updateCompanyProfile(values))
          .then((res) => {
            console.log(res);
            setSubmitting(false);
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
            }
          })
          .catch(() => {
            setresponse({
              type: "error",
              response: "Server Error. Please try again!",
            });
          });

        setSubmitting(false);
        console.log(values);
        //   // submit to the server
        //   // handleReset();
        //   alert(JSON.stringify(values, null, 2));
      }, 400);
    },
  });

  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
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
                    Edit Company Profile
                  </Typography>
                </Box>

                <Divider orientation="horizontal" flexItem />

                <Box
                  sx={{
                    padding: "20px",
                  }}
                >
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Box
                      sx={{
                        "& > :not(style)": { margin: "8px 5px" },
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
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
                              src="https://goodfirms-prod.s3.amazonaws.com/software/general/kenz.png"
                              sx={{
                                maxHeight: "130px",
                                maxWidth: "130px",
                                verticalAlign: "middle",
                              }}
                            />
                          </Box>
                          <Button
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
                          sx={{
                            "& > :not(style)": { width: "40ch" },
                          }}
                        >
                          <TextField
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
                              touched.companyName && Boolean(errors.companyName)
                            }
                            size="small"
                            variant="outlined"
                            fullWidth
                          />

                          <TextField
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

                          <TextField
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
                        direction="row"
                        spacing={2}
                        sx={{
                          marginBottom: "16px !important",
                        }}
                      >
                        <TextField
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
                        </TextField>

                        <TextField
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
                        </TextField>

                        <TextField
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
                        </TextField>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ marginBottom: "16px !important" }}
                      >
                        <TextField
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

                      <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                        Location
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          "& > :not(style)": { width: "100%" },

                          marginBottom: "16px !important",
                        }}
                      >
                        <TextField
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
                        <TextField
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
                        direction="row"
                        spacing={2}
                        sx={{
                          "& > :not(style)": { width: "100%" },
                          marginBottom: "16px !important",
                        }}
                      >
                        <TextField
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
                        <TextField
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
                      <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                        Summary
                      </Typography>
                      <TextField
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
                      <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                        Services
                      </Typography>

                      <TextField
                        value={values.services}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.services ? errors.services : ""}
                        error={touched.services && Boolean(errors.services)}
                        size="small"
                        variant="outlined"
                        id="services"
                        label="Services"
                        multiline
                        rows={5}
                        placeholder="Start from here..."
                        fullWidth
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

export default EditCompany;
