import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import ProjectsImage from "../../images/projects.gif";

const Process = () => {
  return (
    <Box
      sx={{
        margin: {
          xs: "50px 30px",
          lg: "50px 60px",
        },
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          margin: "20px 0px",
          display: {
            xs: "none",
            lg: "flex",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: "500",
          }}
        >
          Purely Customer-rated Services and Companies providers
        </Typography>
        <Typography
          sx={{
            fontSize: "22px",
            padding: {
              xs: "10px 0px",
              lg: "5px 350px",
            },
            textAlign: "center",
          }}
        >
          Peruse 40000+ authentic reviews and ratings from real customers to
          make your best business decisions
        </Typography>
      </Stack>
      <Stack
        direction={{
          xs: "column-reverse",
          lg: "row",
        }}
        spacing={7}
      >
        <Stack flex={1}>
          <Box
            component="img"
            alt="The house from the offer."
            src={ProjectsImage}
          ></Box>
        </Stack>
        <Stack flex={1} direction="column" spacing={3} justifyContent="center">
          <Typography
            sx={{
              fontSize: {
                xs: "30px",
                lg: "40px",
              },
              fontWeight: "600",
              lineHeight: {
                xs: 1.3,
                lg: "60px",
              },
            }}
          >
            ConsSols Ratings & Reviews you can rely on
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              color: "#333",
              lineHeight: "40px",
            }}
          >
            Manually filtered 40000+ unbiased reviews from real customers to
            help you make quick, smart business decisions.
          </Typography>
          <Button
            component={Link}
            to="/find-projects"
            variant="contained"
            size="large"
            color="secondary"
            endIcon={<ArrowRightAltIcon />}
            sx={{
              padding: "10px 40px",
              marginTop: "24px",
              width: "fit-content",

              borderRadius: "25px",
              color: "black",
            }}
          >
            Find Projects
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Process;
