import React from "react";
import { Typography, Paper, Box, Stack, Divider, Grow } from "@mui/material";
import Rating from "@mui/material/Rating";
import loadingImage from "../../../../images/loading-image.png";

const Review = ({ review }) => {
  const { title, reviewedAt, details, score, company, project, reviewImage } =
    review;

  return (
    <Grow in timeout={600}>
      <Paper elevation={2}>
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              margin: "10px 0px",
            }}
          >
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
                src={reviewImage === "" ? loadingImage : reviewImage}
                sx={{
                  maxHeight: "85px",
                  maxWidth: "85px",
                  verticalAlign: "middle",
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  padding: "0px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {company.companyName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                {new Date(reviewedAt).toISOString().split("T")[0]}
              </Typography>
              <Box
                sx={{
                  marginLeft: "-2px",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Rating
                  name="read-only"
                  value={score}
                  readOnly
                  precision={0.5}
                />
                <Typography
                  sx={{
                    ml: "8px",
                  }}
                >
                  {score}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Typography
            sx={{ fontSize: "20px", marginBottom: "10px", fontWeight: 500 }}
          >
            Review
          </Typography>
          <Typography sx={{ marginBottom: "20px" }}>{details}</Typography>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ marginBottom: "20px" }}
          />
          <Typography
            sx={{
              fontSize: "20px",
              marginBottom: "10px",
              fontWeight: 500,
            }}
          >
            Project Details
          </Typography>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                marginBottom: "5px",
                color: "#757982",
              }}
            >
              Project Name
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {project.title}
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="flex-start"
            sx={{
              margin: "10px 0px",
            }}
          >
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#757982",
                }}
              >
                Project Rate
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                {project.rate}
              </Typography>
            </Box>

            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#757982",
                }}
              >
                Project Loation
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                {project.location}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Grow>
  );
};

export default Review;
