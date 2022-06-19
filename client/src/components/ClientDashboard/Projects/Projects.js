import { React, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Tab,
  Button,
  LinearProgress,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import LeftSidebar from "../LeftSidebar";
import Project from "./Project";
import { Link, useLocation } from "react-router-dom";
import { getClientProjects } from "../../../actions/client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import { Helmet } from "react-helmet";

const Proposals = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // useEffect(() => {
  //   console.log("hello");
  // });
  const [value, setValue] = useState("1");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) dispatch(getClientProjects(user.result._id));
  }, [dispatch, location]);

  const clientProjects = useSelector((state) => state.allClientsProjects);
  const projects = clientProjects.projects;
  //console.log(projects);

  //const projects = clientProjects.projects;

  const closedProjects = projects.filter(
    (project) => project.status === "closed"
  );
  const activeProjects = projects.filter(
    (project) => project.status === "active"
  );
  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box
        sx={{
          background: "#f5f5f5",
        }}
      >
        <Helmet>
          <title>Projects</title>
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
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        padding: "10px 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TabList onChange={handleChange}>
                        <Tab
                          label="All Projects"
                          value="1"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Active"
                          value="2"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Closed"
                          value="3"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Completed"
                          value="4"
                          sx={{ fontWeight: "bold" }}
                        />
                      </TabList>
                      <Button
                        component={Link}
                        to="/client/add-project"
                        variant="contained"
                      >
                        Add Project
                      </Button>
                    </Box>

                    <TabPanel
                      value="1"
                      sx={{
                        padding: "20px",
                      }}
                    >
                      {clientProjects.fetched && projects.length > 0 && (
                        <Paper
                          variant="outlined"
                          sx={{
                            padding: "14px 20px",
                            marginBottom: "20px",
                            border: "2px solid #3a7af3",
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <Box flex={0.7}>
                              <Typography sx={{ fontWeight: 500 }}>
                                Date
                              </Typography>
                            </Box>
                            <Box flex={2.2}>
                              <Typography sx={{ fontWeight: 500 }}>
                                Project Title
                              </Typography>
                            </Box>

                            <Box flex={1}>
                              <Typography sx={{ fontWeight: 500 }}>
                                Status
                              </Typography>
                            </Box>
                            <Box flex={1}>
                              <Typography sx={{ fontWeight: 500 }}>
                                Proposals
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      )}
                      {clientProjects.fetched ? (
                        <Box>
                          {projects.length > 0 ? (
                            <Box>
                              {projects.map((project, index) => (
                                <LazyLoad key={index} height={50}>
                                  <Project project={project} />
                                </LazyLoad>
                              ))}
                            </Box>
                          ) : (
                            <Box sx={{ textAlign: "center" }}>
                              <Typography>No Projects Found</Typography>
                            </Box>
                          )}
                        </Box>
                      ) : (
                        <Box sx={{ padding: "10px 10px" }}>
                          <LinearProgress />
                        </Box>
                      )}
                    </TabPanel>
                    <TabPanel
                      value="2"
                      sx={{
                        padding: "20px",
                      }}
                    >
                      <Box>
                        {activeProjects.length > 0 ? (
                          activeProjects.map((project, index) => (
                            <LazyLoad key={index} height={50}>
                              <Project project={project} />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box sx={{ textAlign: "center" }}>
                            <Typography>No Projects Found</Typography>
                          </Box>
                        )}
                      </Box>
                    </TabPanel>
                    <TabPanel
                      value="3"
                      sx={{
                        padding: "20px",
                      }}
                    >
                      <Box>
                        {closedProjects.length > 0 ? (
                          closedProjects.map((project, index) => (
                            <LazyLoad key={index} height={50}>
                              <Project project={project} />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box sx={{ textAlign: "center" }}>
                            <Typography>No Projects Found</Typography>
                          </Box>
                        )}
                      </Box>
                    </TabPanel>
                    <TabPanel
                      value="4"
                      sx={{
                        padding: "20px",
                      }}
                    >
                      <Box>
                        {completedProjects.length > 0 ? (
                          completedProjects.map((project, index) => (
                            <LazyLoad key={index} height={50}>
                              <Project project={project} />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box sx={{ textAlign: "center" }}>
                            <Typography>No Projects Found</Typography>
                          </Box>
                        )}
                      </Box>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Paper>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Proposals;
