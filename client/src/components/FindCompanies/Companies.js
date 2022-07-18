import { React, useEffect, useState } from "react";
import Details from "./../FindCompanies/Details";

import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import Contact from "./../homepage/Contact";
import LazyLoad from "react-lazyload";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../../actions/companies";
import usePagination from "../Pagination";
import Company from "./Company";
import SearchCompanies from "./SearchCompanies";
import { Helmet } from "react-helmet";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Companies = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const CompaniesBackground = matches ? Paper : Box;

  const dispatch = useDispatch();

  const allCompanies = useSelector((state) => state.companies);

  const companies = allCompanies.companies;

  let [page, setPage] = useState(1);

  const PER_PAGE = 10;

  const count = Math.ceil(companies.length / PER_PAGE);

  const pagedCompanies = usePagination(companies, PER_PAGE);
  const perPageCompanies = pagedCompanies.currentData();

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  // console.log(allCompanies.fetched);
  // console.log(companies);

  const handleChange = (e, p) => {
    setPage(p);
    pagedCompanies.jump(p);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box>
      <Helmet>
        <title>Find Companies</title>
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
        {allCompanies.fetched && (
          <Paper
            variant="outlined"
            sx={{ marginBottom: "30px", padding: "20px" }}
          >
            <SearchCompanies />
          </Paper>
        )}

        <CompaniesBackground
          sx={{
            padding: { xs: "0px", lg: "20px" },
          }}
        >
          {allCompanies.fetched ? (
            <Box>
              {companies.length > 0 ? (
                <Stack direction="column" spacing={3}>
                  {perPageCompanies.map((company, index) => (
                    <LazyLoad key={index} height={300}>
                      <Company company={company} />
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
                  <Typography>No Companies Found</Typography>
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
        </CompaniesBackground>
      </Box>

      <Contact />
    </Box>
  );
};

export default Companies;
