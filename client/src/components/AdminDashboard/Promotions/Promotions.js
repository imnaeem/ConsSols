import { React, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Tab,
  LinearProgress,
  Pagination,
  Button,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import LeftSidebar from "../LeftSidebar";
import Promotion from "./Promotion";
import { useDispatch, useSelector } from "react-redux";
import usePagination from "./../../Pagination";
import LazyLoad from "react-lazyload";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllPromotions } from "./../../../actions/admin";
import { Helmet } from "react-helmet";

const Proposals = () => {
  const dispatch = useDispatch();
  const getPromotions = useSelector((state) => state.adminPromotions);
  const promotions = getPromotions.promotions;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) dispatch(getAllPromotions());
  }, [dispatch]);

  let pendingPromotions = null;
  let approvedPromotions = null;
  let notApprovedPromotions = null;
  let closedPromotions = null;
  if (getPromotions.fetched) {
    pendingPromotions = promotions.filter(
      (proposal) => proposal.status === "Pending"
    );

    approvedPromotions = promotions.filter(
      (proposal) => proposal.status === "Approved"
    );

    notApprovedPromotions = promotions.filter(
      (proposal) => proposal.status === "Not Approved"
    );

    closedPromotions = promotions.filter(
      (proposal) => proposal.status === "Closed"
    );
  }

  const PER_PAGE = 10;

  const count = Math.ceil(promotions.length / PER_PAGE);

  const pagedPromotions = usePagination(promotions, PER_PAGE);
  const perPagePromotions = pagedPromotions.currentData();

  let [page, setPage] = useState(1);

  const handlePageChange = (e, p) => {
    setPage(p);
    pagedPromotions.jump(p);
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
          <title>Promotions</title>
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
                          label="All Promotions"
                          value="1"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Pending"
                          value="2"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Approved and Active"
                          value="3"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Not Approved"
                          value="4"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                          label="Closed"
                          value="5"
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
                      {getPromotions.fetched ? (
                        <Box>
                          {promotions.length > 0 ? (
                            <Stack direction="column" spacing={3}>
                              {perPagePromotions.map((promotion, index) => (
                                <LazyLoad key={index} height={50}>
                                  <Promotion promotion={promotion} />
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
                            </Stack>
                          ) : (
                            <Box>
                              <Typography>No Promotions Found</Typography>
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
                      <Stack direction="column" spacing={3}>
                        {pendingPromotions && pendingPromotions.length > 0 ? (
                          pendingPromotions.map((promotion, index) => (
                            <LazyLoad key={index} height={50}>
                              <Promotion promotion={promotion} />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box>
                            <Typography>No Promotions Found</Typography>
                          </Box>
                        )}
                      </Stack>
                    </TabPanel>
                    <TabPanel
                      value="3"
                      sx={{
                        padding: "20px",
                      }}
                    >
                      <Stack direction="column" spacing={3}>
                        {approvedPromotions && approvedPromotions.length > 0 ? (
                          approvedPromotions.map((promotion, index) => (
                            <LazyLoad key={index} height={50}>
                              <Promotion promotion={promotion} />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box>
                            <Typography>No Promotions Found</Typography>
                          </Box>
                        )}
                      </Stack>
                    </TabPanel>
                    <TabPanel
                      value="4"
                      sx={{
                        padding: "20px",
                      }}
                    >
                      <Stack direction="column" spacing={3}>
                        {notApprovedPromotions &&
                        notApprovedPromotions.length > 0 ? (
                          notApprovedPromotions.map((promotion, index) => (
                            <LazyLoad key={index} height={50}>
                              <Promotion promotion={promotion} />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box>
                            <Typography>No Promotions Found</Typography>
                          </Box>
                        )}
                      </Stack>
                    </TabPanel>
                    <TabPanel
                      value="5"
                      sx={{
                        padding: "20px",
                      }}
                    >
                      <Stack direction="column" spacing={3}>
                        {closedPromotions && closedPromotions.length > 0 ? (
                          closedPromotions.map((promotion, index) => (
                            <LazyLoad key={index} height={50}>
                              <Promotion promotion={promotion} />
                            </LazyLoad>
                          ))
                        ) : (
                          <Box>
                            <Typography>No Promotions Found</Typography>
                          </Box>
                        )}
                      </Stack>
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
