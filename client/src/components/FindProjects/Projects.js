import { React, useState, useEffect } from "react";
import {
  Paper,
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  Grow,
  Alert,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useFormik, FormikProvider, FastField } from "formik";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { sendProposalValidation } from "../ValidationSchemas";

import { sendProposal } from "../../actions/company";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import loadingImge from "../../images/loading-image.png";

const useStyles = {
  detailsBox: {
    display: "flex",
    alignItems: "center",
  },
  detailsIcon: {
    fill: "#96999f",
    width: "34px",
    height: "34px",
    fontSize: "123px",
  },
  iconDes: {
    color: "#757982",
    marginLeft: "10px",
  },
};

const Projects = ({ project }) => {
  const { title, location, rate, createdAt, details, _id, projectImage } =
    project;
  const theme = useTheme();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      setUserType(user.result.type);
    }
  }, []);
  const classes = useStyles;
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [disableProposal, setDisableProposal] = useState(false);

  const [response, setresponse] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formikbag = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: JSON.parse(localStorage.getItem("profile"))
        ? JSON.parse(localStorage.getItem("profile")).result._id
        : "",
      projectId: _id,
      rate: "",
      message: "",
    },
    validationSchema: sendProposalValidation,

    onSubmit: (values, { setSubmitting }) => {
      //console.log(values);

      setresponse(null);
      setTimeout(() => {
        dispatch(sendProposal(values))
          .then((res) => {
            if (res) {
              setresponse({
                type: "error",
                response: res.response.data.message,
              });
            } else {
              resetForm();
              setDisableProposal(true);
              setresponse({
                type: "success",
                response: "Proposal Sent Successfully!",
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
    resetForm,
  } = formikbag;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (JSON.parse(localStorage.getItem("profile"))) {
      setresponse(null);
      setDisableProposal(false);
      setOpen(true);
    } else navigate("/user/signin");
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/find-projects", { replace: true });
    resetForm();
  };

  return (
    <Grow in timeout={600}>
      <Paper
        elevation={2}
        sx={{
          [theme.breakpoints.down("sm")]: {
            width: "auto",
          },

          padding: "30px 30px 20px 30px",
          borderRadius: "10px",
        }}
      >
        <Stack direction="row">
          <Stack direction="column" flex={5}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "85px",
                  height: "85px",
                  border: "1px solid #dce2ee",
                  borderRadius: "5px",
                  verticalAlign: "middle",
                }}
              >
                <Box
                  component="img"
                  src={projectImage === "" ? loadingImge : projectImage}
                  sx={{
                    maxHeight: "85px",
                    maxWidth: "85px",
                    verticalAlign: "middle",
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "22px",
                    color: "#333",
                    fontWeight: "700",
                    lineHeight: "normal",
                    padding: "2px 0 10px",
                    textDecoration: "none",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                >
                  {new Date(createdAt).toISOString().split("T")[0]}
                </Typography>
              </Box>
            </Stack>
            <Typography
              sx={{
                padding: "15px 30px 15px 0px",
                // minHeight: "95px",
                lineHeight: "1.7",
              }}
            >
              {details}
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack
            direction="column"
            flex={1}
            alignItems="flex-start"
            spacing={2.3}
            sx={{
              marginLeft: "30px",
            }}
          >
            <Button
              disabled={userType === "admin"}
              onClick={handleClickOpen}
              variant="contained"
              size="large"
              fullWidth
              sx={{
                padding: "10px 40px",

                borderRadius: "25px",
                color: "white",
              }}
            >
              Send Proposal
            </Button>

            <Box style={classes.detailsBox}>
              <MonetizationOnIcon style={classes.detailsIcon} />
              <Typography style={classes.iconDes}>{rate}/sqft</Typography>
            </Box>
            <Box style={classes.detailsBox}>
              <LocationOnIcon style={classes.detailsIcon} />
              <Typography style={classes.iconDes}>{location}</Typography>
            </Box>
          </Stack>
        </Stack>
        <FormikProvider value={formikbag}>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"sm"}
          >
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <DialogTitle>Proposal</DialogTitle>
              <DialogContent
                sx={{
                  padding: "24px",
                }}
              >
                {response && (
                  <Grow in timeout={500}>
                    <Alert
                      elevation={1}
                      severity={response.type === "error" ? "error" : "success"}
                      sx={{ margin: "0px 5px" }}
                    >
                      {response.response}
                    </Alert>
                  </Grow>
                )}

                {!disableProposal && (
                  <Box
                    sx={{
                      "& > :not(style)": {
                        margin: "13px 5px",
                        display: "flex",
                        direction: "column",
                      },
                    }}
                  >
                    <FastField
                      as={TextField}
                      id="rate"
                      label="Enter Your Rate Range/sq ft in $"
                      value={values.rate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.rate ? errors.rate : ""}
                      error={touched.rate && Boolean(errors.rate)}
                      size="small"
                      variant="outlined"
                    />

                    <FastField
                      as={TextField}
                      id="message"
                      label="Message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.message ? errors.message : ""}
                      error={touched.message && Boolean(errors.message)}
                      size="small"
                      variant="outlined"
                      multiline
                      rows={5}
                      placeholder="Start from here..."
                    />
                  </Box>
                )}
              </DialogContent>
              <Divider />
              <DialogActions
                sx={{
                  padding: "15px 24px",
                }}
              >
                <Button onClick={handleClose}>close</Button>
                {disableProposal && response && response.type === "success" ? (
                  <Button
                    component="a"
                    href="/company/proposals"
                    variant="contained"
                    //onClick={() => navigate("/company/proposals")}
                  >
                    View All Proposals
                  </Button>
                ) : (
                  <LoadingButton
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    endIcon={!disableProposal ? <SendIcon /> : <DoneAllIcon />}
                    loadingPosition="end"
                    variant="contained"
                  >
                    Send Proposal
                  </LoadingButton>
                )}
              </DialogActions>
            </form>
          </Dialog>
        </FormikProvider>
      </Paper>
    </Grow>
  );
};

export default Projects;
