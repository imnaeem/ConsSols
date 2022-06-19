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
import LeftSidebar from "../LeftSidebar";
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
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>Messages</title>
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

          <Stack flex={1}>
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
        </Stack>
      </Box>
    </Box>
  );
};

export default Messages;
