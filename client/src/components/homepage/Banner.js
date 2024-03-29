import React from "react";
import { Box, Divider, Button, Stack } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../theme";
import CounterData from "./CounterData";
import Counter from "./Counter";
import { Link } from "react-router-dom";
import HomepageGirl from "../../images/homepage-girl.png";

const Banner = () => {
  return (
    <Box sx={{}}>
      <Box
        sx={{
          background:
            "#1044e1 url(https://assets.goodfirms.co/images/hero-building-home.svg) 50% 100% repeat-x",
          backgroundAttachment: "fixed",
        }}
      >
        <Stack
          direction="row"
          spacing={5}
          sx={{
            padding: {
              xs: "25px 30px 20px 30px",
              lg: "70px 60px 0px 60px",
            },
          }}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            //spacing={3}
            flex={1}
            sx={{
              paddingTop: "70px",
              [theme.breakpoints.down("lg")]: {
                paddingTop: "0px",
                spacing: "none",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "57px",
                color: "white",
                lineHeight: "1.3",
                marginTop: {
                  xs: "10px",
                },
                marginBottom: "20px",
                [theme.breakpoints.down("lg")]: {
                  fontSize: "26px",
                },
              }}
            >
              Purely customer-rated construction service providers
            </Typography>
            <Button
              component={Link}
              to="/find-companies"
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              sx={{
                "&:hover": {
                  background: "#efebeb",
                  color: "#3a7af3",
                },
                background: "white",
                color: "#3a7af3",
                padding: "10px 40px",
                marginTop: "24px",
                width: {
                  xs: "fit-content",
                  lg: "50%",
                },

                borderRadius: "25px",
                [theme.breakpoints.down("lg")]: {
                  marginBottom: "120px",
                },
              }}
            >
              Find Companies
            </Button>
          </Stack>

          <Box
            flex={1}
            sx={{
              justifyContent: "center",
              display: "flex",
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f6b90c",
                height: "600px",
                width: "600px",
                borderRadius: "50%",
                top: "80px",
              }}
            >
              <Box
                component="img"
                sx={{
                  zIndex: "1",
                  marginTop: "-35px",
                  marginLeft: "30px",
                  // maxHeight: { xs: 233, md: 167 },
                  // maxWidth: { xs: 350, md: 250 },
                }}
                alt="Home Page"
                src={HomepageGirl}
              />
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          position: "relative",
          margin: {
            xs: "-80px 30px 20px 30px",
            lg: "-80px 60px 20px 60px",
          },
        }}
      >
        <Card
          sx={{
            padding: "40px",
            top: "-80px",
          }}
        >
          <Typography
            sx={{
              //fontWeight: "600",
              fontSize: "40px",
              color: "#333",
              lineHeight: "1.5",
              textAlign: "center",
              marginBottom: {
                xs: "20px",
                lg: "50px",
              },

              [theme.breakpoints.down("lg")]: {
                fontSize: "20px",
              },
            }}
            color="text.secondary"
          >
            ConsSols is helping millions of clients to find best company for
            their projects and constructions.
          </Typography>
          <Box
            sx={
              {
                //padding: "20px 50px",
              }
            }
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2 }}
              sx={{
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                  justifyContent: "flex-start",

                  alignItems: "start",
                },
              }}
            >
              {CounterData.map((counter, index) => (
                <Stack key={index} direction="row" flex={1}>
                  <Counter
                    count={counter.count}
                    des={counter.des}
                    index={index}
                  />
                  {index < CounterData.length - 1 && (
                    <Box>
                      <Divider
                        orientation="vertical"
                        sx={{
                          display: {
                            xs: "none",
                            lg: "block",
                          },
                        }}
                      />
                    </Box>
                  )}
                </Stack>
              ))}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Banner;
