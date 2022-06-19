import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Typography } from "@mui/material";

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "30px 0px",
  justifyContent: "center",
}));

const Counter = (props) => {
  return (
    <IconBox flex={1} sx={{}}>
      <MessageOutlinedIcon sx={{ fontSize: "55px", color: "#ffc600" }} />
      <Box
        sx={{
          marginLeft: "20px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "28px",
            lineHeight: "1",
          }}
        >
          {props.count}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
          }}
        >
          {props.des}
        </Typography>
      </Box>
    </IconBox>
  );
};

export default Counter;
