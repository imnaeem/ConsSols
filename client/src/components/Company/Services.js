import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";

const Services = ({ services }) => {
  return (
    <Paper elevation={2}>
      <Typography
        sx={{
          padding: "20px",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Services
      </Typography>

      <Divider orientation="horizontal" flexItem />
      {services.length > 0 ? (
        <Box
          sx={{
            padding: "20px",
          }}
        >
          {services.map((service, index) => (
            <Box key={index}>
              <Typography
                sx={{
                  color: "#3a7af3",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "5px",
                }}
              >
                {service.title}
              </Typography>
              <Typography>{service.details}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ padding: "20px" }}>
          <Typography>No Services Found</Typography>{" "}
        </Box>
      )}
    </Paper>
  );
};

export default Services;
