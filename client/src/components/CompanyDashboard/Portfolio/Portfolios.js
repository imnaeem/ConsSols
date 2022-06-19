import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  Button,
  LinearProgress,
  Pagination,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import LeftSidebar from "../LeftSidebar";
import { Link, useLocation } from "react-router-dom";
import Portfolio from "./Portfolio";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCompanyPortfolios } from "../../../actions/company";
import LazyLoad from "react-lazyload";

import usePagination from "../../Pagination";
import { Helmet } from "react-helmet";

const Portfolios = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const allPortfolios = useSelector((state) => state.companyPortfolio);
  const portfolios = allPortfolios.portfolios;
  //console.log(portfolios);

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(portfolios.length / PER_PAGE);
  const pagedPortfolio = usePagination(portfolios, PER_PAGE);
  const perPagePortfolios = pagedPortfolio.currentData();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) dispatch(getCompanyPortfolios(user.result._id));

    if (perPagePortfolios.length === 0) {
      if (pagedPortfolio.currentPage > 1) {
        setPage(pagedPortfolio.currentPage - 1);
        pagedPortfolio.jump(page);
      }
    }
  }, [dispatch, location, page, perPagePortfolios.length]);

  const handleChange = (e, p) => {
    setPage(p);
    pagedPortfolio.jump(p);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>All Portfolios</title>
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
                  Portfolio
                </Typography>
                <Button
                  component={Link}
                  to="/company/add-portfolio"
                  variant="contained"
                >
                  Add Portfolio
                </Button>
              </Box>

              <Divider orientation="horizontal" flexItem />
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                {allPortfolios.fetched ? (
                  <Stack direction="column" spacing={3}>
                    {portfolios.length > 0 ? (
                      <>
                        {pagedPortfolio
                          .currentData()
                          .map((portfolio, index) => (
                            <LazyLoad key={index} height={400}>
                              <Portfolio portfolio={portfolio} />
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
                      </>
                    ) : (
                      <Box>
                        <Typography>No Portfolio found</Typography>
                      </Box>
                    )}
                  </Stack>
                ) : (
                  <Box>
                    <LinearProgress />
                  </Box>
                )}
              </Box>
            </Paper>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Portfolios;
