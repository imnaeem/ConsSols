import React from "react";
import { Box, Typography, Divider } from "@mui/material";
function Detials() {
  return (
    <Box>
      <Box
        sx={{
          margin: "0px 60px",
          padding: "40px 0px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            padding: "0 0 12px",
            fontSize: "32px",
            lineHeight: "1.3",
            color: "#333",
          }}
        >
          Find Construction Projects
        </Typography>
        <Typography>
          Are you looking for construction projects? Here is the list of
          projects that are required to be completed. ConsSols is a platform
          where you can find construction projects according to your needs and
          location. There are large number of clients all over the world who are
          posting projects here. To help clients to find construction services,
          ConsSols have this feature to post projects here and hire a company.
          Projects are here to be fulfilled and clients are ready to hire a
          company. Find projects here and send a proposal to the client for
          project development in the list below:
        </Typography>
      </Box>
      <Divider orientation="horizontal" flexItem />
    </Box>
  );
}

export default Detials;
