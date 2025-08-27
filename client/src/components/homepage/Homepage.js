import React, { lazy, Suspense } from "react";
import Banner from "./Banner";
import WriteReview from "./WriteReview";
import Process from "./Process";
import Contact from "./Contact";
import { Box, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";

// Lazy load heavy image components
const ProjectsGif = lazy(() => 
  Promise.resolve({
    default: () => (
      <img 
        src="/src/images/projects.gif" 
        alt="Projects"
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    )
  })
);

const Homepage = () => {
  return (
    <Box>
      <Helmet>
        <title>Construction Services Marketplace</title>
      </Helmet>
      <Banner />
      <WriteReview />
      <Process />
      <Contact />
      
      {/* Lazy load large images */}
      <LazyLoad height={200} offset={100} placeholder={<CircularProgress />}>
        <Suspense fallback={<CircularProgress />}>
          <ProjectsGif />
        </Suspense>
      </LazyLoad>
    </Box>
  );
};

export default Homepage;
