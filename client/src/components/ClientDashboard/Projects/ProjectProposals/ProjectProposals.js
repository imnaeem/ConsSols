import { React, useEffect, useState, useUpdateEffect } from "react";
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

import LeftSidebar from "../../LeftSidebar";
import { Link, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import LazyLoad from "react-lazyload";

import ProjectProposal from "./ProjectProposal";
import {
  getClientProjects,
  getProjectProposals,
} from "../../../../actions/client";
import { Helmet } from "react-helmet";

const ProjectProposals = (props) => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const location = useLocation();

  const [value, setValue] = useState("1");

  const allProposals = useSelector(
    (state) => state.projectProposals,
    shallowEqual
  );
  const projectProposals = allProposals.proposals;
  //console.log(projectProposals);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) dispatch(getProjectProposals(state.id));
  }, [dispatch]);

  let acceptedProposals;
  let notAcceptedProposals;

  if (projectProposals) {
    acceptedProposals = projectProposals.filter(
      (proposal) => proposal.status === "Accepted"
    );
    notAcceptedProposals = projectProposals.filter(
      (proposal) => proposal.status === "Not Accepted"
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Helmet>
        <title>Project Proposals</title>
      </Helmet>
      <Box
        sx={{
          background: "#f5f5f5",
        }}
      >
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
                          label="All Proposals"
                          value="1"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Accepted"
                          value="2"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Not Accepted"
                          value="3"
                          sx={{ fontWeight: "bold" }}
                        />
                      </TabList>
                    </Box>

                    <TabPanel
                      value="1"
                      sx={{
                        padding: "20px",
                      }}
                    >
                      {projectProposals ? (
                        <Box>
                          {
                            <Box>
                              {projectProposals.length > 0 ? (
                                <Box>
                                  {projectProposals.map((proposal, index) => (
                                    <LazyLoad key={index} height={50}>
                                      <ProjectProposal
                                        proposal={proposal}
                                        projectStatus={state.status}
                                      />
                                    </LazyLoad>
                                  ))}
                                </Box>
                              ) : (
                                <Box>
                                  <Typography>No Proposals Found</Typography>
                                </Box>
                              )}
                            </Box>
                          }
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
                        {projectProposals && acceptedProposals.length > 0 ? (
                          acceptedProposals.map((proposal, index) => (
                            <LazyLoad key={index} height={50}>
                              <ProjectProposal
                                proposal={proposal}
                                projectStatus={state.status}
                              />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box>
                            <Typography>No Proposals Found</Typography>
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
                        {projectProposals && notAcceptedProposals.length > 0 ? (
                          notAcceptedProposals.map((proposal, index) => (
                            <LazyLoad key={index} height={50}>
                              <ProjectProposal
                                proposal={proposal}
                                projectStatus={state.status}
                              />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box>
                            <Typography>No Proposals Found</Typography>
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

export default ProjectProposals;
