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
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Link } from "react-router-dom";
import Welcome from "../../images/welcome.png";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>Client Dashboard</title>
      </Helmet>
      <Box
        sx={{
          margin: "0px 45px",
          padding: "30px 15px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={3}
          alignItems="flex-start"
        >
          <LeftSidebar />

          <Grow in timeout={400} style={{ transformOrigin: "0 0 0" }}>
            <Stack
              direction="column"
              flex={2.3}
              spacing={3}
              sx={{ maxWidth: { xl: "750px", lg: "750px" } }}
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
                    Welcome, Muhammad
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "1.5",
                      color: "#333",
                      marginBottom: "15px",
                    }}
                  >
                    You can now manage your profile here.
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
                  Projects
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
                    to="/client/add-project"
                    variant="contained"
                    size="medium"
                  >
                    Add a Project
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
                  Reviews
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
                    href="/client/view-all-reviews"
                    variant="contained"
                    size="medium"
                  >
                    View All Reviews
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
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
