import { React, useState } from "react";
import { Box, Divider, Paper, Stack, Typography, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import loadingImage from "../../images/loading-image.png";
import Review from "../CompanyDashboard/Reviews/Review";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LazyLoad from "react-lazyload";
import useMediaQuery from "@mui/material/useMediaQuery";

const Reviews = ({ reviews }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Paper elevation={2}>
        <Typography
          sx={{
            padding: "15px 20px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Reviews
        </Typography>

        <Divider orientation="horizontal" flexItem />
        {reviews.length > 0 ? (
          <Box
            sx={{
              padding: "20px",
            }}
          >
            <Review review={reviews[0]} />
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ margin: "20px 0px" }}
            />
            <Button onClick={handleClickOpen} variant="outlined">
              View All Reviews
            </Button>
          </Box>
        ) : (
          <Box sx={{ padding: "20px" }}>
            <Typography>No Reviews Found</Typography>{" "}
          </Box>
        )}

        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Reviews</DialogTitle>
          <Divider />
          <DialogContent>
            <Stack direction="column" spacing={3}>
              {reviews.map((reviewCurrent, index) => (
                <LazyLoad key={index}>
                  <Review review={reviewCurrent} />
                </LazyLoad>
              ))}
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Reviews;
