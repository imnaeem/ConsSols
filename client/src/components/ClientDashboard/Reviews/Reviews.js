import { React, useEffect } from "react";
import {
  Box,
  Divider,
  Paper,
  Button,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsToReview } from "../../../actions/client";
import Review from "./Review";
import LazyLoad from "react-lazyload";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Reviews = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("profile"))) {
      dispatch(
        getProjectsToReview(
          JSON.parse(localStorage.getItem("profile")).result._id
        )
      );
    }
  }, [dispatch, location]);

  const reviewProjects = useSelector((state) => state.reviewProjects);
  const projects = reviewProjects.projects;
  //console.log(projects);
  return (
    <Stack sx={{ width: "100%" }} flex={1}>
      <Helmet>
        <title>Projects To Review</title>
      </Helmet>
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
            Projects To Review
          </Typography>
          <Button
            component="a"
            href="/client/view-all-reviews"
            // component={Link}
            // to="/client/view-all-reviews"
            variant="contained"
          >
            View All Review
          </Button>
        </Box>

        <Divider orientation="horizontal" flexItem />

        {reviewProjects.fetched ? (
          <Box>
            {projects.length > 0 ? (
              <Stack
                direction="column"
                spacing={3}
                sx={{
                  padding: "20px",
                }}
              >
                {projects.map((project, index) => (
                  <LazyLoad key={index} height={400}>
                    <Review project={project} />
                  </LazyLoad>
                ))}
              </Stack>
            ) : (
              <Box sx={{ padding: "20px", textAlign: "center" }}>
                <Typography>No Projects Found to review</Typography>
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
  );
};

export default Reviews;
