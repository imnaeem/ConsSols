import { React } from "react";
import { Box, Paper, Stack, Typography, Grow } from "@mui/material";

const Message = ({ singleMessage }) => {
  const { fullName, subject, email, message, createdAt } = singleMessage;

  return (
    <Grow in timeout={600}>
      <Paper elevation={2} sx={{ padding: "20px" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Typography
              sx={{
                color: "#757982",
              }}
            >
              Name
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              {fullName}
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
              Email
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {email}
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
              Date
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {new Date(createdAt).toISOString().split("T")[0]}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ margin: "10px 0px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              marginBottom: "5px",
              color: "#757982",
            }}
          >
            Subject
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {subject}
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
            Message
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {message}
          </Typography>
        </Box>
      </Paper>
    </Grow>
  );
};

export default Message;
