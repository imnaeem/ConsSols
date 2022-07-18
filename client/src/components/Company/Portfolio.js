import { React, useState } from "react";
import { Box, Stack, Divider, Paper, Typography, Button } from "@mui/material";
import loadingImage from "../../images/loading-image.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LazyLoad from "react-lazyload";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import Portfolio from "./../CompanyDashboard/Portfolio/Portfolio";

const Portfolios = ({ portfolios }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
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

        {portfolios.length > 0 ? (
          <Box
            sx={{
              padding: "20px",
            }}
          >
            <Paper elevation={2} sx={{ padding: "20px" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                }}
              >
                {portfolios[0].title}
              </Typography>
              <Box
                component="img"
                sx={{
                  maxWidth: "100%",
                  padding: "10px 0px",
                }}
                alt="The house from the offer."
                src={
                  portfolios[0].portfolioImage === ""
                    ? loadingImage
                    : portfolios[0].portfolioImage
                }
              />
              <Typography sx={{ marginBottom: "20px" }}>
                {portfolios[0].summary}
              </Typography>
              <Divider orientation="horizontal" flexItem />
              <Stack
                direction={{
                  lg: "row",
                  xs: "column",
                }}
                spacing={3}
                justifyContent="space-around"
                sx={{
                  margin: "10px 0px",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      marginBottom: "5px",
                      color: "#757982",
                    }}
                  >
                    ProjectCost
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {portfolios[0].projectCost}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      marginBottom: "5px",
                      color: "#757982",
                    }}
                  >
                    Timeline
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {portfolios[0].timeline}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      marginBottom: "5px",
                      color: "#757982",
                    }}
                  >
                    Industry
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {portfolios[0].industry}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ margin: "20px 0px" }}
            />
            <Button onClick={handleClickOpen} variant="outlined">
              View All Portfolios
            </Button>
          </Box>
        ) : (
          <Box sx={{ padding: "20px" }}>
            <Typography>No Portfolios Found</Typography>
          </Box>
        )}
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Reviews</DialogTitle>
          <Divider />
          <DialogContent>
            <Stack direction="column" spacing={3}>
              {portfolios.map((portfolio, index) => (
                <LazyLoad key={index}>
                  <Portfolio companyProfile={true} portfolio={portfolio} />
                </LazyLoad>
              ))}
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Portfolios;
