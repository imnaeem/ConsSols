import { React, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Grow,
  Divider,
  Button,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import LeaveReview from "./LeaveReview/LeaveReview";
import { useNavigate } from "react-router-dom";
import loadingImage from "../../../images/loading-image.png";

const Review = ({ project }) => {
  const navigate = useNavigate();
  const {
    title,
    location,
    rate,
    createdAt,
    details,
    status,
    reviewed,
    _id,
    projectImage,
  } = project;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/client/reviews", { replace: true });
  };

  return (
    <Grow in timeout={600}>
      <Paper elevation={2} sx={{ padding: "20px" }}>
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
              src={projectImage === "" ? loadingImage : projectImage}
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
              Rate/sq ft
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
              Locaton
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {location}
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
          <Box flex={1}>
            <Typography
              sx={{
                fontSize: "14px",
                marginBottom: "5px",
                color: "#757982",
              }}
            >
              Reviewed
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {reviewed ? "Yes" : "No"}
            </Typography>
          </Box>
        </Stack>

        <Box flex={1}>
          <Typography
            sx={{
              fontSize: "14px",
              marginBottom: "5px",
              color: "#757982",
            }}
          >
            Details
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {details}
          </Typography>
        </Box>

        {!reviewed && (
          <Box>
            <Divider
              sx={{
                margin: "20px 0px",
              }}
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button variant="contained" onClick={handleClickOpen}>
                Leave Review
              </Button>
            </Stack>
          </Box>
        )}

        {/* Dialog */}

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle>Leave Review</DialogTitle>
          <Divider />
          <DialogContent>
            <LeaveReview projectId={_id} />
          </DialogContent>
          <Divider />
          <DialogActions
            sx={{
              padding: "15px 24px",
            }}
          >
            <Button onClick={handleClose}>close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grow>
  );
};

export default Review;
