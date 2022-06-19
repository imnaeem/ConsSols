import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

const WriteReview = () => {
  return (
    <Box
      sx={{
        margin: "50px 60px",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          margin: "20px 0px",
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: "500",
          }}
        >
          Purely Customer-rated Service and Software providers
        </Typography>
        <Typography
          sx={{
            fontSize: "22px",
            padding: "5px 350px",
            textAlign: "center",
          }}
        >
          Peruse 40000+ authentic reviews and ratings from real customers to
          make your best business decisions
        </Typography>
      </Stack>

      <Stack direction="row" spacing={7}>
        <Stack flex={1} direction="column" spacing={3} justifyContent="center">
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "600",
              lineHeight: "60px",
            }}
          >
            ConSols verified reviews and ratings you can rely on.
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              color: "#333",
              lineHeight: "40px",
            }}
          >
            Manually filtered projects according to the business needs and
            market demands to help you make quick, smart decisions about
            projects.
          </Typography>
          <Button
            component={Link}
            to="/find-companies"
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
            Find Companies
          </Button>
        </Stack>

        <Box
          flex={1}
          component="img"
          sx={
            {
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }
          }
          alt="The house from the offer."
          src="https://assets.goodfirms.co/images/write-a-review-home.gif"
        ></Box>
      </Stack>
    </Box>
  );
};

export default WriteReview;
