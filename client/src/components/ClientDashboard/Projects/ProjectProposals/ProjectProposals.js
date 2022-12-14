import { React, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Tab,
  LinearProgress,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { tabsClasses } from "@mui/material/Tabs";

import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import LazyLoad from "react-lazyload";

import ProjectProposal from "./ProjectProposal";
import { getProjectProposals } from "../../../../actions/client";
import { Helmet } from "react-helmet";

const ProjectProposals = (props) => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [value, setValue] = useState("1");

  const allProposals = useSelector((state) => state.projectProposals);
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
    <Stack sx={{ width: "100%" }} flex={1}>
      <Helmet>
        <title>Project Proposals</title>
      </Helmet>
      <Paper>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                padding: { xs: "10px 0px", sm: "10px 20px" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TabList
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  width: "100%",
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                }}
                onChange={handleChange}
              >
                <Tab
                  label="All Proposals"
                  value="1"
                  sx={{ fontWeight: "bold" }}
                />
                <Tab label="Accepted" value="2" sx={{ fontWeight: "bold" }} />
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
              {projectProposals?.length > 0 ? (
                <Box>
                  {projectProposals.map((proposal, index) => (
                    <LazyLoad key={index} height={50}>
                      {console.log(projectProposals)}
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
  );
};

export default ProjectProposals;
