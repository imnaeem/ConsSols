import { React, useEffect } from "react";
import {
  Box,
  Divider,
  Paper,
  Button,
  Grow,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import LeftSidebar from "../../LeftSidebar";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { getClientReviews } from "../../../../actions/client";
import LazyLoad from "react-lazyload";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const ViewAllReviws = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("profile"))) {
      dispatch(
        getClientReviews(JSON.parse(localStorage.getItem("profile")).result._id)
      );
    }
  }, [dispatch, location]);

  const clientReviews = useSelector((state) => state.allReviews);
  const reviews = clientReviews.reviews;

  //console.log(reviews);

  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>View All Reviews</title>
      </Helmet>
      <Box
        sx={{
          margin: "0px 45px",
          padding: "30px 15px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={3}
          alignItems="flex-start"
        >
          <LeftSidebar />
          <Grow in timeout={400} style={{ transformOrigin: "0 0 0" }}>
            <Stack flex={1}>
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
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewAllReviws;
