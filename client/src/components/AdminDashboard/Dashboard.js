import React from "react";
import {
  Box,
  Stack,
  Paper,
  Typography,
  Divider,
  Button,
  Grow,
} from "@mui/material";
import RightSidebar from "./RightSidebar";
import { Link } from "react-router-dom";
import Welcome from "../../images/welcome.png";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Grow in timeout={400} style={{ transformOrigin: "0 0 0" }}>
        <Stack
          direction="column"
          flex={2.3}
          spacing={3}
          sx={{ maxWidth: { xl: "750px", lg: "750px" }, width: "100%" }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Paper
              elevation={2}
              sx={{
                padding: "15px",
              }}
            >
              <Box
                component="img"
                src={Welcome}
                alt="welcome"
                sx={{
                  marginTop: "25px",
                }}
              />
              <Typography
                sx={{
                  margin: "20px 0 10px",
                  fontSize: "24px",
                  lineHeight: "1.08",
                  color: "#181818",
                }}
              >
                Welcome to Your Profile!
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  lineHeight: "1.5",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                You can now manage your account here.
              </Typography>
            </Paper>
          </Box>

          <Paper elevation={2}>
            <Typography
              sx={{
                padding: "15px 20px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Promotions
            </Typography>

            <Divider orientation="horizontal" flexItem />

            <Box
              sx={{
                padding: "20px",
              }}
            >
              <Typography
                sx={{
                  marginBottom: "20px",
                }}
              >
                Edit your company details and make changes to add updated
                information including portfolio, past work, description etc.
              </Typography>

              <Button
                component={Link}
                to="/admin/promotions"
                variant="contained"
                size="medium"
              >
                View Promotions
              </Button>
            </Box>
          </Paper>
          <Paper elevation={2}>
            <Typography
              sx={{
                padding: "15px 20px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Messages
            </Typography>

            <Divider orientation="horizontal" flexItem />

            <Box
              sx={{
                padding: "20px",
              }}
            >
              <Typography
                sx={{
                  marginBottom: "20px",
                }}
              >
                Edit your company details and make changes to add updated
                information including portfolio, past work, description etc.
              </Typography>

              <Button
                component="a"
                href="/admin/messages"
                variant="contained"
                size="medium"
              >
                View Messages
              </Button>
            </Box>
          </Paper>
        </Stack>
      </Grow>
      <RightSidebar
        sx={{
          minWidth: "315px",
        }}
      />
    </>
  );
};

export default Dashboard;
