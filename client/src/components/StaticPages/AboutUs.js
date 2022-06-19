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
          margin: "30px 60px",
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
            GoodFirms is a full-fledged research and review platform that helps
            software buyers and service seekers to opt for the best software or
            firm. At the same time, it helps IT companies and software vendors
            to boost user acquisition stats, market share and brand awareness.
            GoodFirms, just as the name suggests, is a dedicated community of
            “performing” IT companies as well as software solutions.
          </Typography>
          <Typography>
            We are well aware of the scenarios at both ends, wherein service
            seekers are struggling to find the best companies to meet a specific
            need and how leading software firms are making efforts to stand out
            from a clusters of inferior competitors.
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
            About Us
          </Typography>
          <Typography>
            We are well aware of the scenarios at both ends, wherein service
            seekers are struggling to find the best companies to meet a specific
            need and how leading software firms are making efforts to stand out
            from a clusters of inferior competitors.
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

          <Stack direction="row" spacing={2}>
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
