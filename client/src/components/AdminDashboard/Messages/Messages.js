import { React, useState, useEffect } from "react";
import {
  Box,
  Stack,
  Paper,
  Typography,
  LinearProgress,
  Divider,
  Pagination,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllMessages } from "../../../actions/admin";
import LazyLoad from "react-lazyload";
import Message from "./Message";
import usePagination from "./../../Pagination";
import { Helmet } from "react-helmet";

const Messages = () => {
  const dispatch = useDispatch();
  const allMessages = useSelector((state) => state.contactUsMessages);
  const messages = allMessages.messages;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) dispatch(getAllMessages());
  }, [dispatch]);

  const PER_PAGE = 10;

  const count = Math.ceil(messages.length / PER_PAGE);

  const pagedMessages = usePagination(messages, PER_PAGE);
  const perPageMessages = pagedMessages.currentData();

  let [page, setPage] = useState(1);

  const handlePageChange = (e, p) => {
    setPage(p);
    pagedMessages.jump(p);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Stack sx={{ width: "100%" }} flex={1}>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      <Paper>
        <Box
          sx={{
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Messages
          </Typography>
        </Box>

        <Divider orientation="horizontal" flexItem />
        <Box
          sx={{
            padding: "20px",
          }}
        >
          {allMessages.fetched ? (
            <Box>
              {messages.length > 0 ? (
                <Stack direction="column" spacing={3}>
                  {perPageMessages.map((message, index) => (
                    <LazyLoad key={index} height={50}>
                      <Message singleMessage={message} />
                    </LazyLoad>
                  ))}
                  <Stack direction="row" justifyContent="center">
                    <Pagination
                      count={count}
                      size="large"
                      page={page}
                      variant="outlined"
                      shape="rounded"
                      onChange={handlePageChange}
                    />
                  </Stack>
                </Stack>
              ) : (
                <Box>
                  <Typography>No Messages Found</Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ padding: "10px 10px" }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
      </Paper>
    </Stack>
  );
};

export default Messages;
