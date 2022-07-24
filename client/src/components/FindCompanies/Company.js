import React from "react";
import {
  Paper,
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  Grow,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Rating from "@mui/material/Rating";
import CampaignIcon from "@mui/icons-material/Campaign";

const useStyles = {
  detailsBox: {
    display: "flex",
    alignItems: "center",
  },
  detailsIcon: {
    fill: "#96999f",
    width: "34px",
    height: "34px",
    fontSize: "123px",
  },
  iconDes: {
    color: "#757982",
    marginLeft: "10px",
  },
};

const loadingImage =
  "https://res.cloudinary.com/dxe6wambc/image/upload/v1658663558/fdz6ekdccu6dpwedvqzq.png";

const Company = ({ company }) => {
  const {
    companyName,
    tagline,
    employees,
    founded,
    address,
    rate,
    summary,
    reviews,
    services,
    username,
    companyImage,
    isPromoted,
  } = company;

  const theme = useTheme();
  const classes = useStyles;

  let ratingsAvg = 0;

  reviews.map((review) => (ratingsAvg = ratingsAvg + review.score));

  ratingsAvg = ratingsAvg / reviews.length;

  return (
    <Grow in timeout={600}>
      <Box>
        <Paper
          elevation={2}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "auto",
            },

            padding: isPromoted ? "0px 30px 20px 30px" : "30px 30px 20px 30px",
            borderRadius: "10px",
          }}
        >
          {isPromoted && (
            <Box
              sx={{
                height: "20px",
                width: "fit-content",
                marginBottom: "10px",
                background: "#3a7af3",
                color: "white",
                padding: "7px 10px",
                display: "flex",
                alignItems: "center",
                borderRadius: "0px 0px 4px 4px",
              }}
            >
              <CampaignIcon sx={{ transform: "rotate(-20deg)" }} />
              <Typography sx={{ color: "white", marginLeft: "7px" }}>
                Featured
              </Typography>
            </Box>
          )}

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
          >
            <Stack direction="column" flex={5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "85px",
                    height: "85px",
                    border: "1px solid #dce2ee",
                    borderRadius: "5px",
                    verticalAlign: "middle",
                  }}
                >
                  <Box
                    component="img"
                    src={companyImage === "" ? loadingImage : companyImage}
                    sx={{
                      maxHeight: "85px",
                      maxWidth: "85px",
                      verticalAlign: "middle",
                      background: `transparent url(${loadingImage})`,
                    }}
                  />
                </Box>
                <Box>
                  <Button
                    variant="text"
                    component="a"
                    href={`/company-profile/${username}`}
                    // onClick={viewCompany}
                    sx={{
                      padding: "0px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                      textTransform: "none",
                    }}
                  >
                    {companyName}
                  </Button>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      wordBreak: "break-all",
                    }}
                  >
                    {tagline}
                  </Typography>
                  <Box
                    sx={{
                      marginLeft: "-2px",

                      display: {
                        xs: "block",
                        lg: "flex",
                      },
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={ratingsAvg}
                      readOnly
                      precision={0.5}
                    />
                    <Typography sx={{ marginLeft: "5px" }}>
                      {"(" + reviews.length}
                      {reviews.length === 1 ? " Review)" : " Reviews)"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Typography
                sx={{
                  padding: {
                    xs: "0px 0px 15px 0px",
                    lg: "15px 30px 15px 0px",
                  },
                  lineHeight: "1.7",
                  wordWrap: "break-word",
                }}
              >
                {summary}
              </Typography>
              <Divider orientation="horizontal" flexItem />
              <Box
                sx={{
                  paddingTop: "10px",
                }}
              >
                {services.length > 0 ? (
                  <Box>
                    <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
                      Services
                    </Typography>
                    <Typography sx={{ fontSize: "20px" }}>
                      {services[0].title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#757982",
                      }}
                    >
                      {services[0].details}
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      color: "#33333",
                      fontSize: "18px",
                      paddingBottom: "5px",
                      fontWeight: "600",
                    }}
                  >
                    No Services Found
                  </Typography>
                )}
              </Box>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              direction="column"
              flex={1}
              alignItems="flex-start"
              spacing={2.3}
              sx={{
                marginLeft: {
                  xs: "0px",
                  lg: "30px",
                },
                marginTop: {
                  xs: "15px",
                },
              }}
            >
              <Button
                component="a"
                href={`/company-profile/${username}`}
                // onClick={viewCompany}
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  padding: "10px 40px",
                  borderRadius: "25px",
                }}
              >
                Contact
              </Button>
              <Box style={classes.detailsBox}>
                <MonetizationOnIcon style={classes.detailsIcon} />
                <Typography style={classes.iconDes}>{rate}</Typography>
              </Box>
              <Box style={classes.detailsBox}>
                <PeopleAltIcon style={classes.detailsIcon} />
                <Typography style={classes.iconDes}>{employees}</Typography>
              </Box>
              <Box style={classes.detailsBox}>
                <CalendarMonthIcon style={classes.detailsIcon} />
                <Typography style={classes.iconDes}>{founded}</Typography>
              </Box>
              <Box style={classes.detailsBox}>
                <LocationOnIcon style={classes.detailsIcon} />
                <Typography style={classes.iconDes}>
                  {address.city + ", " + address.country}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Grow>
  );
};

export default Company;
