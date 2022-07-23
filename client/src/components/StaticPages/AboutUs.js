import React from "react";
import { Paper, Stack, Box } from "@mui/material";
import { Typography } from "@mui/material";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import Contact from "../homepage/Contact";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <Box sx={{}}>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <Paper
        elevation={2}
        sx={{
          padding: "30px",
          margin: {
            xs: "30px",
            lg: "30px 60px",
          },
        }}
      >
        <Stack spacing={3}>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
            variant="h5"
          >
            About Us
          </Typography>
          <Typography>
            Conssols is the best platfrom that helps customers to find the best
            construction company related to their projects . Simultaneously, it
            facilitate construction companies to find projects rapidly.This
            website can help both construction companies to meet on a single
            platfrom for their projcts.
          </Typography>
          <Typography>
            conssols is growing with each day in terms of listing categories of
            6000+ construction companies, 4000+ verified reviews, 600+ validated
            surveys and research led to the most recent business patterns. We
            have our own research process to calculate the merit of a company or
            software on the basis of quality, reliability, and ability. This
            makes us a treasury of the globe’s most prominent, efficient, and
            well-performing construction service platform. On the other hand,
            with conssols sited as a reliable source for customers, we have now
            become a solid platform for companies and customers to showcase
            their work & results among the global prospects.
          </Typography>
          <Typography>
            We are well aware of the scenarios at both ends, wherein service
            seekers are struggling to find the best companies to meet a specific
            need and how leading software firms are making efforts to stand out
            from a clusters of inferior competitors.
          </Typography>

          <Typography
            sx={{
              fontWeight: "bold",
            }}
            variant="h5"
          >
            WHAT MAKES US BRILLIANT
          </Typography>

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            spacing={2}
          >
            <Paper
              variant="outlined"
              sx={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <LocalPoliceIcon
                sx={{
                  fontSize: "50px",
                }}
              />
              <Typography
                sx={{
                  fontWeight: "bold",
                  margin: "10px 0px",
                }}
              >
                We are sited as a reliable source
              </Typography>
              <Typography>
                Reputed companies & software vendors trust our critical and
                authentic research.
              </Typography>
            </Paper>
            <Paper
              variant="outlined"
              sx={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <PeopleAltIcon
                sx={{
                  fontSize: "50px",
                }}
              />
              <Typography
                sx={{
                  fontWeight: "bold",
                  margin: "10px 0px",
                }}
              >
                We are sited as a reliable source
              </Typography>
              <Typography>
                Reputed companies & software vendors trust our critical and
                authentic research.
              </Typography>
            </Paper>
            <Paper
              variant="outlined"
              sx={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <VpnLockIcon
                sx={{
                  fontSize: "50px",
                }}
              />
              <Typography
                sx={{
                  fontWeight: "bold",
                  margin: "10px 0px",
                }}
              >
                We are sited as a reliable source
              </Typography>
              <Typography>
                Reputed companies & software vendors trust our critical and
                authentic research.
              </Typography>
            </Paper>
          </Stack>
        </Stack>
      </Paper>
      <Contact />
    </Box>
  );
};

export default AboutUs;
