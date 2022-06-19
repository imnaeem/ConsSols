import React from "react";
import { Box, Divider, Paper, Stack, Typography, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styled from "@emotion/styled";

const Details = ({ company }) => {
  const {
    companyName,
    tagline,
    employees,
    founded,
    address,
    rate,
    summary,
    reviews,
    services,
    username,
  } = company;

  let ratingsAvg = 0;

  reviews.map((review) => (ratingsAvg = ratingsAvg + review.score));

  ratingsAvg = ratingsAvg / reviews.length;

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "20px",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "85px",
            height: "85px",
            border: "1px solid #dce2ee",
            borderRadius: "5px",
            verticalAlign: "middle",
          }}
        >
          <Box
            component="img"
            src="https://goodfirms-prod.s3.amazonaws.com/software/general/kenz.png"
            sx={{
              maxHeight: "85px",
              maxWidth: "85px",
              verticalAlign: "middle",
            }}
          />
        </Box>
        <Box>
          <Typography
            component="a"
            href="/#company"
            sx={{
              fontSize: "22px",
              color: "#333",
              fontWeight: "700",
              lineHeight: "normal",
              padding: "2px 0 10px",
              textDecoration: "none",
            }}
          >
            {companyName}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {tagline}
          </Typography>
          <Box
            sx={{
              marginLeft: "-2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="read-only"
              value={ratingsAvg}
              readOnly
              precision={0.5}
            />
            <Typography sx={{ marginLeft: "5px" }}>
              {"(" + reviews.length + " Reviews)"}
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Typography
        sx={{
          padding: "10px 0px",
          lineHeight: "1.6",
        }}
      >
        {summary}
      </Typography>
      <Divider orientation="horizontal" flexItem />
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-around"
        sx={{
          marginTop: "10px",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              marginBottom: "5px",
              color: "#757982",
            }}
          >
            Rate
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {rate}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              marginBottom: "5px",
              color: "#757982",
            }}
          >
            Employees
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {employees}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              marginBottom: "5px",
              color: "#757982",
            }}
          >
            Founded
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {founded}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Details;
