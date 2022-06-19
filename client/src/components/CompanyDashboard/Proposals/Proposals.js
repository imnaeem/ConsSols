import { React, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Tab,
  LinearProgress,
  Pagination,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import LeftSidebar from "../LeftSidebar";
import Proposal from "./Proposal";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProposals } from "../../../actions/company";
import usePagination from "./../../Pagination";
import LazyLoad from "react-lazyload";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const Proposals = () => {
  const dispatch = useDispatch();
  const getProposals = useSelector((state) => state.companyProposals);
  const proposals = getProposals.proposals;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) dispatch(getCompanyProposals(user.result._id));
  }, [dispatch]);

  let acceptedProposals = null;
  let notAcceptedProposals = null;
  if (getProposals.fetched) {
    acceptedProposals = proposals.filter(
      (proposal) => proposal.status === "Accepted"
    );

    notAcceptedProposals = proposals.filter(
      (proposal) => proposal.status === "Not Accepted"
    );
  }

  const PER_PAGE = 10;

  const count = Math.ceil(proposals.length / PER_PAGE);

  const pagedProposlas = usePagination(proposals, PER_PAGE);
  const perPageProposals = pagedProposlas.currentData();

  let [page, setPage] = useState(1);

  const handlePageChange = (e, p) => {
    setPage(p);
    pagedProposlas.jump(p);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const [value, setValue] = useState("1");

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
          <title>All Proposals</title>
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
                      {getProposals.fetched && proposals.length > 0 && (
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
                            <Box flex={1}>
                              <Typography sx={{ fontWeight: 500 }}>
                                Date
                              </Typography>
                            </Box>
                            <Box flex={2.3}>
                              <Typography sx={{ fontWeight: 500 }}>
                                Project Title
                              </Typography>
                            </Box>

                            <Box flex={2}>
                              <Typography sx={{ fontWeight: 500 }}>
                                Status
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      )}

                      {getProposals.fetched ? (
                        <Box>
                          {proposals.length > 0 ? (
                            <Box>
                              {perPageProposals.map((proposal, index) => (
                                <LazyLoad key={index} height={50}>
                                  <Paper
                                    variant="outlined"
                                    sx={{
                                      padding: "10px 20px",
                                      marginBottom: "20px",
                                    }}
                                  >
                                    <Proposal proposal={proposal} />
                                  </Paper>
                                </LazyLoad>
                              ))}

                              <Stack direction="row" justifyContent="center">
                                <Pagination
                                  count={count}
                                  size="large"
                                  page={page}
                                  variant="outlined"
                                  shape="rounded"
                                  onChange={handlePageChange}
                                />
                              </Stack>
                            </Box>
                          ) : (
                            <Box>
                              <Typography>No Proposals Found</Typography>
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
                        {acceptedProposals && acceptedProposals.length > 0 ? (
                          acceptedProposals.map((proposal, index) => (
                            <LazyLoad key={index} height={50}>
                              <Paper
                                variant="outlined"
                                sx={{
                                  padding: "10px 20px",
                                  marginBottom: "20px",
                                }}
                              >
                                <Proposal proposal={proposal} />
                              </Paper>
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
                        {notAcceptedProposals &&
                        notAcceptedProposals.length > 0 ? (
                          notAcceptedProposals.map((proposal, index) => (
                            <LazyLoad key={index} height={50}>
                              <Paper
                                variant="outlined"
                                sx={{
                                  padding: "10px 20px",
                                  marginBottom: "20px",
                                }}
                              >
                                <Proposal proposal={proposal} />
                              </Paper>
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

export default Proposals;
