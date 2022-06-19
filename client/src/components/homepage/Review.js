import React from "react";
import { Paper, Box, Stack, Avatar, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
//import { theme } from "./../../theme";

const ReviewStar = styled(StarIcon)(({ theme }) => ({
  color: "#ffc600",
}));

const Review = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        margin: "20px 60px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          [theme.breakpoints.down("sm")]: {
            width: "auto",
          },
          width: "400px",

          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60px",
              height: "60px",
              border: "1px solid #dce2ee",
              borderRadius: "5px",
              verticalAlign: "middle",
            }}
          >
            <Box
              component="img"
              src="https://goodfirms-prod.s3.amazonaws.com/software/general/kenz.png"
              sx={{
                maxHeight: "58px",
                maxWidth: "58px",
                verticalAlign: "middle",
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "700",
                lineHeight: "normal",
                padding: "3px 0 5px",
              }}
            >
              Redwerk
            </Typography>
            <Box
              sx={{
                marginLeft: "-2px",
              }}
            >
              <ReviewStar />
              <ReviewStar />
              <ReviewStar />
              <ReviewStar />
              <ReviewStar />
            </Box>
          </Box>
        </Stack>
        <Typography
          sx={{
            color: "#333",
            lineHeight: "24px",
            fontWeight: "600",
            padding: "15px 0",
          }}
        >
          It is a hardworking development company that went out of their way to
          meet our needs.
        </Typography>
        <Typography
          sx={{
            opacity: ".6",
            fontSize: "14px",
            paddingBottom: "10px",
          }}
        >
          Review posted by
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src="https://assets.goodfirms.co/reviewers/8125-robert-lee-barner.jpg"
            sx={{
              width: "26px",
              height: "26px",
            }}
          />
          <Typography
            sx={{
              fontSize: "14px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Erica Ravich White
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#8d8d8d",
              fontWeight: "600",
            }}
          >
            CEO and Founder at VR KIX
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Review;
