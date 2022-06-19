import { React, useEffect } from "react";
import {
  Box,
  Grow,
  Stack,
  Paper,
  Typography,
  Divider,
  Button,
  LinearProgress,
  Alert,
} from "@mui/material";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkCompanyProfile } from "../../actions/company";
import Welcome from "../../images/welcome.png";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.checkCompanyProfile);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("profile"))) {
      dispatch(
        checkCompanyProfile(
          JSON.parse(localStorage.getItem("profile")).result._id
        )
      );
    }
  }, [dispatch]);
  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>Company Dashboard</title>
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
                  You can now manage your business profile here.
                </Typography>
                {company.fetched ? (
                  <Box>
                    {company.company.username === "" && (
                      <Grow in timeout={500}>
                        <Alert
                          elevation={1}
                          severity="warning"
                          sx={{ alignItems: "center" }}
                        >
                          Please Complete Your Company Profile!
                        </Alert>
                      </Grow>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ margin: "10px 0px" }}>
                    <LinearProgress />
                  </Box>
                )}
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
                Comapny
              </Typography>

              <Divider orientation="horizontal" flexItem />

              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="img"
                    src="https://goodfirms-prod.s3.amazonaws.com/services/service.png"
                    alt="company"
                  />

                  <Typography>
                    Edit your company details and make changes to add updated
                    information including portfolio, past work, description etc.{" "}
                  </Typography>
                </Box>
                <Button
                  component={Link}
                  to="/company/edit-company"
                  variant="contained"
                  size="medium"
                >
                  Edit Company
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
                Portfolio
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
                  to="/company/add-portfolio"
                  variant="contained"
                  size="medium"
                >
                  Add Portfolio
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
                Promote Company
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
                  to="/company/new-promotion"
                  variant="contained"
                  size="medium"
                >
                  Promote Company
                </Button>
              </Box>
            </Paper>
          </Stack>

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
