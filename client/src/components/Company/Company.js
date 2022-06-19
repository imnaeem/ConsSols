import { Box, LinearProgress, Paper, Stack, Button } from "@mui/material";
import { React, useState, useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Details from "./Details";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Reviews from "./Reviews";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCompany } from "../../actions/companies";
import { currentCompanyReviews } from "./../../actions/companies";

const Company = () => {
  let { id } = useParams();
  //console.log(id);

  //console.log(company);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCurrentCompany(id));

    dispatch(currentCompanyReviews(id));
  }, [dispatch, location, id]);

  const checkCompany = useSelector((state) => state.checkCompanyProfile);
  const company = checkCompany.company;

  const clientReviews = useSelector((state) => state.allReviews);
  const companyReviews = clientReviews.reviews;

  return (
    <Box
      sx={{
        background: "#f5f5f5",

        padding: "30px 60px",
      }}
    >
      {checkCompany.fetched && clientReviews.fetched ? (
        <Box sx={{}}>
          <Stack
            direction="row"
            justifyContent="space-around"
            spacing={3}
            alignItems="flex-start"
          >
            <LeftSidebar />

            <Stack
              direction="column"
              flex={2.3}
              spacing={3}
              sx={{ maxWidth: { xl: "750px", lg: "750px" } }}
            >
              <div id="details">
                <Details company={company[0]} />
              </div>
              <div id="services">
                <Services services={company[0].services} />
              </div>

              <div id="portfolio">
                <Portfolio portfolios={company[0].portfolios} />
              </div>

              <div id="reviews">
                <Reviews reviews={companyReviews} />
              </div>
            </Stack>

            <RightSidebar
              phone={company[0].phone}
              address={company[0].address}
            />
          </Stack>
        </Box>
      ) : (
        <Paper elevation={2} sx={{ padding: "20px" }}>
          <LinearProgress />
        </Paper>
      )}
    </Box>
  );
};

export default Company;
