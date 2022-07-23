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
import Contact from "../homepage/Contact";

const Faqs = () => {
  return (
    <Box>
      <Helmet>
        <title>Frequently Asked Questions</title>
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
                What is Conssols?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                Conssols is the best platfrom that helps customers to find the
                best construction company related to their projects .
                Simultaneously, it facilitate construction companies to find
                projects rapidly.This website can help both construction
                companies to meet on a single platfrom for their projcts.
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
                Why trust Conssols?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                conssols is growing with each day in terms of listing categories
                of 6000+ construction companies, 4000+ verified reviews, 600+
                validated surveys and research led to the most recent business
                patterns. We have our own research process to calculate the
                merit of a company or software on the basis of quality,
                reliability, and ability. This makes us a treasury of the
                globe’s most prominent, efficient, and well-performing
                construction service platform. On the other hand, with conssols
                sited as a reliable source for customers, we have now become a
                solid platform for companies and customers to showcase their
                work & results among the global prospects.
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
                What does the term "Get Listed" refers?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                The term ‘Get Listed’ is the pathway for companies to get their
                company listed at conssole. In other words, this term means
                ‘getting registered’ with conssole by creating an account. You
                will find this button on the homepage , that will redirect you
                to the sign up page.
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
                Is Conssols free to use?
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                consnsole is free for users to find the top companies for their
                constructions projects and select the one that fits their
                requirements and budget. Similarly, the companies can become
                free members at GoodFirms owning their profile. Moreover, they
                can get the rating and reviews listed by their clients for
                multiple projects to increase their rapport and showcase their
                portfolio for users to peruse.
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
        </Stack>
      </Paper>
      <Contact />
    </Box>
  );
};

export default Faqs;
