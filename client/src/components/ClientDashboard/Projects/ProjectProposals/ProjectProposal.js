import { React, useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Button,
  Divider,
  Paper,
  Grow,
  LinearProgress,
  Box,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import loadingImage from "../../../../images/loading-image.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  acceptCompanyProposal,
  getProposalCompany,
} from "../../../../actions/client";

const ProjectProposal = ({ proposal, projectStatus }) => {
  const { message, rate, createdAt, status, _id } = proposal;
  const theme = useTheme();
  const navigate = useNavigate();

  const [proposalCompany, setProposalCompany] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProposalCompany(_id)).then((company) => {
      setProposalCompany(company);
    });
  }, [dispatch]);

  const handleAcceptProposal = () => {
    dispatch(acceptCompanyProposal({ proposalId: _id }));

    setAcceptDialog(false);

    navigate(0);
  };

  const [acceptDialog, setAcceptDialog] = useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //console.log(projectProposals);

  const handleOpen = () => {
    setAcceptDialog(true);
  };

  const handleClose = () => {
    setAcceptDialog(false);
  };

  return (
    <Box>
      {proposalCompany ? (
        <Grow in timeout={600}>
          <Paper
            variant="outlined"
            sx={{ padding: "20px 20px", marginBottom: "20px" }}
          >
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
                  src={
                    proposalCompany.companyImage === ""
                      ? loadingImage
                      : proposalCompany.companyImage
                  }
                  sx={{
                    maxHeight: "85px",
                    maxWidth: "85px",
                    verticalAlign: "middle",
                  }}
                />
              </Box>
              <Box>
                <Button
                  variant="text"
                  component="a"
                  href={`/company-profile/${proposalCompany.username}`}
                  sx={{
                    padding: "0px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#333",

                    textTransform: "none",
                  }}
                >
                  {proposalCompany.companyName}
                </Button>
                <Typography
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  {new Date(createdAt).toISOString().split("T")[0]}
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="flex-start"
              sx={{
                margin: "10px 0px",
              }}
            >
              <Box flex={1}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginBottom: "5px",
                    color: "#757982",
                  }}
                >
                  rate
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  {rate}
                </Typography>
              </Box>
              <Box flex={1}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginBottom: "5px",
                    color: "#757982",
                  }}
                >
                  Status
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  {status}
                </Typography>
              </Box>
            </Stack>
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#757982",
                }}
              >
                Message
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                {message}
              </Typography>
            </Box>
            {status === "Not Accepted" && projectStatus !== "completed" && (
              <Box>
                <Divider flexItem sx={{ margin: "15px 0px" }} />
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    id="viewProposals"
                    variant="contained"
                    onClick={handleOpen}
                  >
                    Accept
                  </Button>
                </Stack>
              </Box>
            )}

            <Dialog
              fullScreen={fullScreen}
              open={acceptDialog}
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
                  This proposal will be accepted and company will be notified.
                </Typography>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={handleAcceptProposal}>Yes</Button>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grow>
      ) : (
        <Box sx={{ padding: "10px 10px" }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProjectProposal;
