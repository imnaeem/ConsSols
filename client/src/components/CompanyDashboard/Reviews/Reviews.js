import { React, useEffect } from "react";
import {
  Box,
  Divider,
  Paper,
  Grow,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyReviews } from "../../../actions/company";
import LazyLoad from "react-lazyload";
import { Helmet } from "react-helmet";

const ViewAllReviws = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("profile"))) {
      dispatch(
        getCompanyReviews(
          JSON.parse(localStorage.getItem("profile")).result._id
        )
      );
    }
  }, [dispatch]);

  const clientReviews = useSelector((state) => state.allReviews);
  const reviews = clientReviews.reviews;

  return (
    <>
      <Helmet>
        <title>All Reviews</title>
      </Helmet>
      <Grow in timeout={400} style={{ transformOrigin: "0 0 0" }}>
        <Stack sx={{ width: "100%" }} flex={1}>
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
                Reviews
              </Typography>
            </Box>
            <Divider orientation="horizontal" flexItem />
            {clientReviews.fetched ? (
              <Box padding="20px">
                {reviews.length > 0 ? (
                  <Stack direction="column" spacing={3}>
                    {reviews.map((review, index) => (
                      <LazyLoad key={index} height={400}>
                        <Review review={review} />
                      </LazyLoad>
                    ))}
                  </Stack>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography>No Reviews Found</Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ padding: "20px" }}>
                <LinearProgress />
              </Box>
            )}
          </Paper>
        </Stack>
      </Grow>
    </>
  );
};

export default ViewAllReviws;
