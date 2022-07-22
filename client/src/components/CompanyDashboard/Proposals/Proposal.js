import { React, useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Button,
  Divider,
  Paper,
  Grow,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DoneIcon from "@mui/icons-material/Done";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getProposalProject,
  markProjectCompleted,
} from "../../../actions/company";
import { useNavigate, useLocation } from "react-router-dom";

const Proposal = ({ proposal }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { createdAt, rate, message, projectId, status, _id } = proposal;

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const [opneCompleteProject, setOpneCompleteProject] = useState(false);

  const [proposalProject, setProposalProject] = useState({});

  const [markingProject, setMarkingProject] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProposalProject(projectId)).then((project) => {
      setProposalProject(project);
      //console.log(project);
    });
  }, [dispatch, setProposalProject, projectId, location]);

  const completeProject = () => {
    setOpneCompleteProject(false);
    setMarkingProject(true);
    dispatch(
      markProjectCompleted({
        projectId,
        userId: JSON.parse(localStorage.getItem("profile")).result._id,
      })
    ).then((res) => {
      if (res) {
        console.log(res);
      } else {
        navigate("/company/proposals", { replace: true });
        setMarkingProject(false);
      }
    });
  };

  const openComplete = () => {
    setOpneCompleteProject(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpneCompleteProject(false);
  };
  return (
    <Box>
      {proposalProject ? (
        <Box>
          {proposalProject.title ? (
            <Grow in timeout={600}>
              {matches ? (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Box flex={1}>
                    <Typography>
                      {new Date(createdAt).toISOString().split("T")[0]}
                    </Typography>
                  </Box>
                  <Box flex={2.3}>
                    <Button
                      sx={{
                        justifyContent: "flex-start",
                      }}
                      onClick={handleClickOpen}
                    >
                      {proposalProject.title}
                    </Button>
                  </Box>

                  <Box flex={0.7}>
                    <Typography>{status}</Typography>
                  </Box>

                  <Box flex={1.3}>
                    {status === "Accepted" && (
                      <LoadingButton
                        loading={markingProject}
                        loadingPosition="end"
                        disabled={
                          proposalProject.status === "completed" ? true : false
                        }
                        variant="contained"
                        onClick={openComplete}
                        endIcon={<DoneIcon />}
                      >
                        {proposalProject.status === "completed"
                          ? "Completed"
                          : "Mark as completed"}
                      </LoadingButton>
                    )}
                  </Box>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth={"sm"}
                  >
                    <DialogTitle>Proposal</DialogTitle>
                    <Divider />
                    <DialogContent>
                      <Paper elevation={2} sx={{ padding: "10px" }}>
                        <Box
                          sx={{
                            marginBottom: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "500",
                            }}
                          >
                            Proposal Rate
                          </Typography>
                          <Typography>{rate}</Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "500",
                            }}
                          >
                            Proposal Message
                          </Typography>
                          <Typography>{message}</Typography>
                        </Box>
                      </Paper>

                      <Divider sx={{ margin: "20px 0px" }} />
                      <Paper elevation={2} sx={{ padding: "10px" }}>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Project Name
                        </Typography>
                        <Typography>{proposalProject.title}</Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Project Location
                        </Typography>
                        <Typography>{proposalProject.location}</Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Project Rate
                        </Typography>
                        <Typography>{proposalProject.rate}</Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Project Details
                        </Typography>
                        <Typography>{proposalProject.details}</Typography>
                      </Paper>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              ) : (
                <Stack direction="column" justifyContent="center" spacing={1}>
                  <Stack direction="row" spacing={1}>
                    <Typography>Date:</Typography>
                    <Typography>
                      {new Date(createdAt).toISOString().split("T")[0]}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography>Project Title: </Typography>
                    <Button
                      sx={{
                        justifyContent: "flex-start",
                        padding: "0px",
                      }}
                      onClick={handleClickOpen}
                    >
                      {proposalProject.title}
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Typography>Status:</Typography>
                    <Typography>{status}</Typography>
                  </Stack>

                  <Box>
                    {status === "Accepted" && (
                      <LoadingButton
                        fullWidth
                        loading={markingProject}
                        loadingPosition="end"
                        disabled={
                          proposalProject.status === "completed" ? true : false
                        }
                        variant="contained"
                        onClick={openComplete}
                        endIcon={<DoneIcon />}
                      >
                        {proposalProject.status === "completed"
                          ? "Completed"
                          : "Mark as completed"}
                      </LoadingButton>
                    )}
                  </Box>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth={"sm"}
                  >
                    <DialogTitle>Proposal</DialogTitle>
                    <Divider />
                    <DialogContent>
                      <Paper elevation={2} sx={{ padding: "10px" }}>
                        <Box
                          sx={{
                            marginBottom: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "500",
                            }}
                          >
                            Proposal Rate
                          </Typography>
                          <Typography>{rate}</Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "500",
                            }}
                          >
                            Proposal Message
                          </Typography>
                          <Typography>{message}</Typography>
                        </Box>
                      </Paper>

                      <Divider sx={{ margin: "20px 0px" }} />
                      <Paper elevation={2} sx={{ padding: "10px" }}>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Project Name
                        </Typography>
                        <Typography>{proposalProject.title}</Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Project Location
                        </Typography>
                        <Typography>{proposalProject.location}</Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Project Rate
                        </Typography>
                        <Typography>{proposalProject.rate}</Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Project Details
                        </Typography>
                        <Typography>{proposalProject.details}</Typography>
                      </Paper>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              )}
            </Grow>
          ) : (
            <LinearProgress />
          )}
        </Box>
      ) : (
        <LinearProgress />
      )}

      <Dialog
        fullScreen={fullScreen}
        open={opneCompleteProject}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography
            sx={{
              fontSize: "18px",
            }}
          >
            Project will be mark as completed!
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={completeProject}>Yes</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Proposal;
