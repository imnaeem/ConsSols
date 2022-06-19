import { React, useState, useRef, useEffect } from "react";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Grow,
  Alert,
  LinearProgress,
  FormControlLabel,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextField from "@mui/material/TextField";
import { CompanyUserValidation } from "../../ValidationSchemas";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { getCompanyUser, updateCompanyUser } from "./../../../actions/company";
import { useSelector } from "react-redux";
import { convertToBase64 } from "../../convertToBase64";
import loadingUser from "../../../images/loading-user.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

// async function uploadImage(file) {
//   // file from <input type="file">
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "dins1v04");

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/dxe6wambc/image/upload`,
//     {
//       method: "POST",
//       body: data,
//     }
//   ).then((img) => {});
//   const img = await res.json();
//   console.log(img);
//   // Post `img.secure_url` to your server and save to MongoDB
// }

const EditProfile = () => {
  const [response, setresponse] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [changePassword, setChangePassword] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getCompanyUser(user.result._id))
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

  let companyUser = useSelector((state) => state.companyUser);

  //console.log(companyUser);

  const fileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleReset,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: { ...companyUser, updatePassword: changePassword },

    validationSchema: CompanyUserValidation,
    onSubmit: (values, { setSubmitting }) => {
      //console.log(user);
      //console.log(values);
      setresponse(null);
      setTimeout(() => {
        dispatch(updateCompanyUser(values))
          .then((res) => {
            if (res) {
              setresponse({
                type: "error",
                response: res.response.data.message,
              });
            } else {
              //resetForm();
              const user = JSON.parse(localStorage.getItem("profile"));
              user.result["userImage"] = values.userImage;
              localStorage.setItem("profile", JSON.stringify(user));
              navigate("/client/profile");
              setresponse({
                type: "success",
                response: "Profile Updated Successfully!",
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

        //setSubmitting(false);
        //console.log(values);
        //   // submit to the server
        //   // handleReset();
        //   alert(JSON.stringify(values, null, 2));
      }, 200);
    },
  });

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFieldValue("userImage", base64);
    }
  };

  return (
    <Paper>
      <Helmet>
        <title>Edit Profile</title>
      </Helmet>
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
          Edit Profile
        </Typography>
      </Box>

      <Divider orientation="horizontal" flexItem />
      {companyUser.email !== "" ? (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Box sx={{}}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                padding: "20px",
              }}
            >
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
                  src={values.userImage === "" ? loadingUser : values.userImage}
                  sx={{
                    maxHeight: "130px",
                    maxWidth: "130px",
                    verticalAlign: "middle",
                  }}
                />
              </Box>
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  Muhammad Naeem
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  {values.email}
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
                  Change Image
                </Button>
              </Stack>
            </Stack>
            <Divider orientation="horizontal" flexItem />

            <Box
              sx={{
                padding: "20px",
              }}
            >
              {response && (
                <Grow in timeout={300}>
                  <Alert
                    elevation={1}
                    severity={response.type === "error" ? "error" : "success"}
                    sx={{
                      margin: "0px 0px 30px 0px",
                    }}
                  >
                    {response.response}
                  </Alert>
                </Grow>
              )}

              <Box
                sx={{
                  "& > :not(style)": { margin: "8px 0px", width: "100%" },
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    "& > :not(style)": { width: "100%" },
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
                </Stack>

                <TextField
                  disabled
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
                    Change Password
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setChangePassword(!changePassword);
                    }}
                  >
                    Change
                  </Button>
                </Stack>

                {changePassword && (
                  <Box
                    sx={{
                      "& > :not(style)": { margin: "8px 0px", width: "100%" },
                    }}
                  >
                    <TextField
                      id="oldPassword"
                      label="Old Password"
                      type="password"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.oldPassword ? errors.oldPassword : ""}
                      error={touched.oldPassword && Boolean(errors.oldPassword)}
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        "& > :not(style)": { width: "100%" },
                      }}
                    >
                      <TextField
                        id="newPassword"
                        label="New Password"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.newPassword ? errors.newPassword : ""
                        }
                        error={
                          touched.newPassword && Boolean(errors.newPassword)
                        }
                        size="small"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowPassword}>
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
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
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Stack>
                  </Box>
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
                  endIcon={<SaveIcon />}
                  loadingPosition="end"
                >
                  Sace Changes
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </form>
      ) : (
        <Box sx={{ padding: "20px" }}>
          <LinearProgress />
        </Box>
      )}
    </Paper>
  );
};

export default EditProfile;
