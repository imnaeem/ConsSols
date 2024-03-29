import { React, useEffect, useState } from "react";
import Details from "./Detials";

import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  Paper,
  Pagination,
  Alert,
  Button,
} from "@mui/material";
import Projects from "./Projects";
import Contact from "../homepage/Contact";
import LazyLoad from "react-lazyload";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject, getProjectsForCompany } from "../../actions/projects";
import usePagination from "../Pagination";
import { useLocation } from "react-router-dom";
import { checkCompanyProfile } from "./../../actions/company";
import { Helmet } from "react-helmet";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const FindProjects = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const ProjectsBackground = matches ? Paper : Box;

  const company = useSelector((state) => state.checkCompanyProfile);

  const allProjects = useSelector((state) => state.projects);
  const projects = allProjects.projects;

  let [page, setPage] = useState(1);

  const PER_PAGE = 10;

  const count = Math.ceil(projects.length / PER_PAGE);

  const pagedProjects = usePagination(projects, PER_PAGE);
  const perPageProjects = pagedProjects.currentData();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      if (user.result.type === "company") {
        dispatch(checkCompanyProfile(user.result._id)).then(() => {
          dispatch(getProjectsForCompany(user.result._id));
        });
      } else if (user.result.type === "admin") {
        dispatch(getAllProject());
      }
    } else dispatch(getAllProject());

    if (perPageProjects.length === 0) {
      if (pagedProjects.currentPage > 1) {
        setPage(pagedProjects.currentPage - 1);
        pagedProjects.jump(page);
      }
    }
  }, [dispatch, location, page, perPageProjects.length]);

  //console.log(projects.fetched);
  //console.log(projects);

  const handleChange = (e, p) => {
    setPage(p);
    pagedProjects.jump(p);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box>
      <Helmet>
        <title>Find Projects</title>
      </Helmet>
      <Details />
      <Box
        sx={{
          background: "#f5f5f5",
          padding: {
            xs: "30px 20px",
            lg: "30px 60px",
          },
        }}
      >
        <ProjectsBackground
          sx={{
            padding: { xs: "0px", lg: "20px" },
          }}
        >
          {JSON.parse(localStorage.getItem("profile")) &&
            JSON.parse(localStorage.getItem("profile")).result.type ===
              "admin" && (
              <Box>
                {allProjects.fetched ? (
                  <Box>
                    {projects.length > 0 ? (
                      <Stack direction="column" spacing={3}>
                        {perPageProjects.map((project, index) => (
                          <LazyLoad key={index} height={300}>
                            <Projects project={project} />
                          </LazyLoad>
                        ))}
                        <Stack direction="row" justifyContent="center">
                          <Pagination
                            count={count}
                            size="large"
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                          />
                        </Stack>
                      </Stack>
                    ) : (
                      <Box sx={{ padding: "10px 10px", textAlign: "center" }}>
                        <Typography>No Projects Found</Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box>
                    {!matches ? (
                      <Paper sx={{ padding: "20px" }}>
                        <LinearProgress />
                      </Paper>
                    ) : (
                      <Box sx={{ padding: "10px" }}>
                        <LinearProgress />
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}

          {JSON.parse(localStorage.getItem("profile")) &&
            JSON.parse(localStorage.getItem("profile")).result.type ===
              "company" && (
              <Box>
                {company.fetched ? (
                  <Box>
                    {company.company.username !== "" ? (
                      <Box>
                        {allProjects.fetched ? (
                          <Box>
                            {projects.length > 0 ? (
                              <Stack direction="column" spacing={3}>
                                {perPageProjects.map((project, index) => (
                                  <LazyLoad key={index} height={300}>
                                    <Projects project={project} />
                                  </LazyLoad>
                                ))}
                                <Stack direction="row" justifyContent="center">
                                  <Pagination
                                    count={count}
                                    size="large"
                                    page={page}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handleChange}
                                  />
                                </Stack>
                              </Stack>
                            ) : (
                              <Box
                                sx={{
                                  padding: "10px 10px",
                                  textAlign: "center",
                                }}
                              >
                                <Typography>No Projects Found</Typography>
                              </Box>
                            )}
                          </Box>
                        ) : (
                          <Box>
                            {!matches ? (
                              <Paper sx={{ padding: "20px" }}>
                                <LinearProgress />
                              </Paper>
                            ) : (
                              <Box sx={{ padding: "10px" }}>
                                <LinearProgress />
                              </Box>
                            )}
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Stack
                        direction="column"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Alert
                          elevation={1}
                          severity="warning"
                          sx={{ alignItems: "center" }}
                        >
                          Please Complete Your Company Profile to View Projects
                        </Alert>
                        <Box>
                          <Button
                            componenet="a"
                            href="company/edit-company"
                            size="large"
                            variant="contained"
                          >
                            Complete Profile
                          </Button>
                        </Box>
                      </Stack>
                    )}
                  </Box>
                ) : (
                  <Box>
                    {!matches ? (
                      <Paper sx={{ padding: "20px" }}>
                        <LinearProgress />
                      </Paper>
                    ) : (
                      <Box sx={{ padding: "10px" }}>
                        <LinearProgress />
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}

          {!JSON.parse(localStorage.getItem("profile")) && (
            <Box>
              {allProjects.fetched ? (
                <Box>
                  {projects.length > 0 ? (
                    <Stack direction="column" spacing={3}>
                      {perPageProjects.map((project, index) => (
                        <LazyLoad key={index} height={300}>
                          <Projects project={project} />
                        </LazyLoad>
                      ))}
                      <Stack direction="row" justifyContent="center">
                        <Pagination
                          count={count}
                          size="large"
                          page={page}
                          variant="outlined"
                          shape="rounded"
                          onChange={handleChange}
                        />
                      </Stack>
                    </Stack>
                  ) : (
                    <Box sx={{ padding: "10px 10px", textAlign: "center" }}>
                      <Typography>No Projects Found</Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box>
                  {!matches ? (
                    <Paper sx={{ padding: "20px" }}>
                      <LinearProgress />
                    </Paper>
                  ) : (
                    <Box sx={{ padding: "10px" }}>
                      <LinearProgress />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </ProjectsBackground>
      </Box>

      <Contact />
    </Box>
  );
};

export default FindProjects;
