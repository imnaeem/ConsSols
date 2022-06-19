import React from "react";
import { Helmet } from "react-helmet";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material";

const Faqs = () => {
  return (
    <Box sx={{}}>
      <Helmet>
        <title>Frequently Asked Questions</title>
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
              marginBottom: "10px",
            }}
            variant="h5"
          >
            Frequently Asked Questions
          </Typography>
          <Accordion variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                What is GoodFirms?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                GoodFirms is a maverick research and review platform that helps
                software buyers and service seekers to choose one of the best
                software or firms. Simultaneously, it assists the IT companies
                and software vendors to boost user acquisition, market share,
                and brand visibility. GoodFirms, as the name recommends, is a
                devoted network of "performing" IT companies as well as software
                solutions.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                How does GoodFirms help users/clients/businesses looking out to
                hire IT companies?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                GoodFirms lists the top performing companies and software of
                various IT domains according to their ranks obtained in the
                research process. Seekers can browse GoodFirms’ categories for
                outsourcing various services/software solutions with verified
                reviews. The seekers can even compare the prices of different
                companies for similar services and products. Hence, it becomes a
                huge reduction of tasks for the service/software seekers to find
                an authenticated company/product online for their businesses.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                Why trust GoodFirmss?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                oodFirms is growing with each day in terms of listing categories
                of 6000+ services & software, 9000+ verified reviews, 600+
                validated surveys and research led to the most recent business
                patterns. We have our own research process to calculate the
                merit of a company or software on the basis of quality,
                reliability, and ability. This makes us a treasury of the
                globe’s most prominent, efficient, and well-performing IT
                companies and software solutions. On the other hand, with
                GoodFirms sited as a reliable source for vendors, we have now
                become a solid platform for companies and software products to
                showcase their work & results among the global prospects.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                How can IT companies or software products leverage GoodFirms?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                GoodFirms serves as an all-in-one search platform for online
                service/software solution seekers, thereby cumulating potential
                web traffic for the vendors. Basically, GoodFirms functions as
                the bridge between the clients and the software companies &
                products. Thus, IT companies and products can take the
                opportunity to showcase their work to the right audience by
                getting registered with GoodFirms and leverage this massive
                exposure to convert leads.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                What does the term ‘Get Listed’ indicate?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                The term ‘Get Listed’ is the pathway for vendors to get their
                services/software solutions listed at GoodFirms. In other words,
                this term means ‘getting registered’ with GoodFirms by creating
                an account. You will find this button on the homepage , that
                will redirect you to the registration page.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                Is GoodFirms free?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                GoodFirms is free for users to browse the top companies/software
                in various domains such as mobile app, software, web, eCommerce,
                blockchain etc. and select the one that fits their requirements
                and budget. Similarly, the companies/software can become free
                members at GoodFirms owning their profile. Moreover, they can
                get the rating and reviews listed by their clients for multiple
                projects to increase their rapport and showcase their portfolio
                for users to peruse.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Faqs;
