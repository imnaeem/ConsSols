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
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextField from "@mui/material/TextField";
import { CompanyUserValidation } from "../ValidationSchemas";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/profile";
import { useSelector } from "react-redux";
import { uploadImage } from "../UploadImage";
import loadingUser from "../../images/loading-user.png";
import loadingIcon from "../../images/loading.gif";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const EditProfile = (props) => {
  const [response, setresponse] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile(user.result._id))
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

  let userProfile = useSelector((state) => state.userProfile);

  //console.log(userProfile);

  const fileRef = useRef(null);
  const navigate = useNavigate();

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: { ...userProfile, updatePassword: changePassword },

    validationSchema: CompanyUserValidation,
    onSubmit: (values, { setSubmitting }) => {
      setresponse(null);
      dispatch(updateUserProfile(values))
        .then((res) => {
          if (res) {
            setresponse({
              type: "error",
              response: res.response.data.message,
            });
          } else {
            //resetForm();
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
    },
  });

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFieldValue("userImage", loadingIcon);
      uploadImage(file)
        .then((res) => {
          dispatch(
            updateUserProfile({ email: values.email, userImage: res })
          ).then(() => {
            const user = JSON.parse(localStorage.getItem("profile"));
            user.result["userImage"] = res;
            localStorage.setItem("profile", JSON.stringify(user));
            navigate(`/${props.type}/profile`);
            setFieldValue("userImage", res);
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
      {userProfile.email !== "" ? (
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
                  {values.firstName + " " + values.lastName}
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
                  Save Changes
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
