import { React, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Grow,
  Divider,
  Button,
} from "@mui/material";

const Promotion = ({ promotion }) => {
  const { title, duration, cost, status, createdAt } = promotion;

  return (
    <Grow in timeout={600}>
      <Paper elevation={2} sx={{ padding: "20px" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Typography
              sx={{
                fontSize: "22px",
                color: "#333",
                fontWeight: "700",
                lineHeight: "normal",

                textDecoration: "none",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: "#757982",
              }}
            >
              {new Date(createdAt).toISOString().split("T")[0]}
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="flex-start"
          sx={{
            margin: "10px 0px",
          }}
        >
          <Box flex={1}>
            <Typography
              sx={{
                fontSize: "14px",
                marginBottom: "5px",
                color: "#757982",
              }}
            >
              Duration
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {duration}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography
              sx={{
                fontSize: "14px",
                marginBottom: "5px",
                color: "#757982",
              }}
            >
              Cost
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {cost}
            </Typography>
          </Box>
        </Stack>

        <Box flex={1}>
          <Typography
            sx={{
              fontSize: "14px",
              marginBottom: "5px",
              color: "#757982",
            }}
          >
            Status
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {status}
          </Typography>
        </Box>
      </Paper>
    </Grow>
  );
};

export default Promotion;
