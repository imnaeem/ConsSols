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
import loadingImage from "../../../images/loading-image.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { deleteCompanyPortfolio } from "../../../actions/company";

const Portfolio = ({ portfolio, companyProfile }) => {
  const {
    _id,
    title,
    timeline,
    industry,
    location,
    projectCost,
    createdAt,
    summary,
    portfolioImage,
  } = portfolio;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePortfolio = () => {
    setOpen(false);
    setDeleting(true);

    dispatch(
      deleteCompanyPortfolio({
        portfolioId: _id,
        userId: JSON.parse(localStorage.getItem("profile")).result._id,
      })
    ).then(() => {
      setDeleting(false);
    });
    //setOpneCompleteProject(false);
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
              src={portfolioImage === "" ? loadingImage : portfolioImage}
              sx={{
                maxHeight: "80px",
                maxWidth: "80px",
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
              Timeline
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {timeline}
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
              Cost
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {projectCost}
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
              Industry
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {industry}
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
              Location
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
            {summary}
          </Typography>
        </Box>
        {!companyProfile && (
          <Box>
            <Divider sx={{ margin: "10px 0px" }} />
            <Stack direction="row" justifyContent="flex-end">
              <Button
                disabled={deleting}
                onClick={handleClickOpen}
                variant="contained"
              >
                {deleting ? "Deleting" : "Delete Portfolio"}
              </Button>
            </Stack>
          </Box>
        )}

        <Dialog
          fullScreen={fullScreen}
          open={open}
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
              This portfolio will be deleted?
            </Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={deletePortfolio}>Delete</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grow>
  );
};

export default Portfolio;
