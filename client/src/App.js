import { Box, Fab, ThemeProvider } from "@mui/material";
import { React } from "react";

import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import { theme } from "./theme";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import PageRoutes from "./routes/PageRoutes";
import ScrollTop from "./components/ScrollArrow";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
        <ScrollTop>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </ThemeProvider>
  );
};

export default App;
