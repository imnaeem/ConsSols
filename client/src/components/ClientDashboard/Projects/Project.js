import { React, useState } from "react";
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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";
import { Link, useNavigate } from "react-router-dom";
import {
  closeClientProject,
  getProjectProposals,
} from "../../../actions/client";

const Project = ({ project }) => {
  const { title, location, rate, createdAt, details, status, _id } = project;
  const theme = useTheme();
  const [viewProject, setOpenViewProject] = useState(false);
  const [closeProject, setOpenCloseProject] = useState(false);
  const [viewProposals, setOpenviewProposals] = useState(false);
  const [closingProject, setClosingProject] = useState(false);
  const [closeButton, setCloseButton] = useState(status);

  if (closeButton === "active") {
    setCloseButton("Close Project");
  } else if (closeButton === "closed") {
    setCloseButton("Project Closed");
  } else if (closeButton === "completed") {
    setCloseButton("Completed");
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = (e) => {
    if (e.target.id === "projectName") {
      setOpenViewProject(true);
    } else if (e.target.id === "closeProject") {
      setOpenCloseProject(true);
    }
  };

  const handleViewProposals = () => {
    const projectTitle = title.replaceAll(" ", "-").toLowerCase();
    navigate(`/client/${projectTitle}/proposals`, {
      state: { id: _id, status },
    });
  };

  const handleClose = () => {
    setOpenViewProject(false);

    setOpenCloseProject(false);

    setOpenviewProposals(false);
  };

  const closeThisProject = () => {
    setCloseButton("Closing");
    setClosingProject(true);
    dispatch(closeClientProject({ id: _id })).then(() => {
      setClosingProject(false);
      setCloseButton("Project Closed");
    });
    setOpenCloseProject(false);
    navigate("/client/projects", { replace: true });
  };

  return (
    <Grow in timeout={600}>
      <Paper
        variant="outlined"
        sx={{ padding: "10px 20px", marginBottom: "20px" }}
      >
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <Box flex={0.7}>
            <Typography>
              {new Date(createdAt).toISOString().split("T")[0]}
            </Typography>
          </Box>
          <Box flex={2.2}>
            <Button
              id="projectName"
              onClick={handleOpen}
              sx={{
                justifyContent: "flex-start",
              }}
            >
              {title}
            </Button>
          </Box>

          <Box flex={1}>
            <Button
              disabled={status === "active" ? false : true}
              id="closeProject"
              variant="outlined"
              onClick={handleOpen}
              sx={{
                width: "155px",
              }}
            >
              {closeButton}
            </Button>
          </Box>
          <Box flex={1}>
            <Button
              id="viewProposals"
              variant="contained"
              onClick={handleViewProposals}
              // onClick={navigate(`/client/${_id}/proposals`, {
              //   state: { id: _id },
              // })}
              //component={Link}
              //to={`/client/${_id}/proposals`}
            >
              View Proposals
            </Button>
          </Box>

          <Dialog
            fullScreen={fullScreen}
            open={viewProject}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"sm"}
          >
            <DialogTitle>Project Details</DialogTitle>
            <Divider />
            <DialogContent>
              <Paper elevation={2} sx={{ padding: "10px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    Project Title
                  </Typography>
                  <Typography>{title}</Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    Project Location
                  </Typography>
                  <Typography>{location}</Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    Project Rate
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
                    Project Details
                  </Typography>
                  <Typography>{details}</Typography>
                </Box>
              </Paper>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={closeProject}
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
                You will not get more proposals for this project.
              </Typography>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={closeThisProject}>Yes</Button>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Paper>
    </Grow>
  );
};

export default Project;
