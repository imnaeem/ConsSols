import { Box, ThemeProvider } from "@mui/material";
import { React } from "react";

import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import { theme } from "./theme";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import PageRoutes from "./routes/PageRoutes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <BrowserRouter>
          <Header />
          <ScrollToTop />
          <PageRoutes />
          <Footer />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
