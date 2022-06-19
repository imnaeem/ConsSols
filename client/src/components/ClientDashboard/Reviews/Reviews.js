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
import StarIcon from "@mui/icons-material/Star";
import styled from "@emotion/styled";
import LeftSidebar from "../LeftSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsToReview } from "../../../actions/client";
import { Link } from "react-router-dom";
import Review from "./Review";
import LazyLoad from "react-lazyload";
import { useLocation } from "react-router-dom";
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
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>Projects To Review</title>
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
                  Projects To Review
                </Typography>
                <Button
                  component="a"
                  href="/client/view-all-reviews"
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
        </Stack>
      </Box>
    </Box>
  );
};

export default Reviews;
