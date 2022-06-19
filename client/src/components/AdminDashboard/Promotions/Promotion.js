import { React, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Grow,
  Divider,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import {
  adminApprovePromotion,
  adminClosePromotion,
  adminDisapprovePromotion,
} from "../../../actions/admin";

const Promotion = ({ promotion }) => {
  const { title, duration, cost, status, createdAt, _id } = promotion;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openApprove, setOpenApprove] = useState(false);
  const [openDisapprove, setOpenDisapprove] = useState(false);
  const [openClose, setOpenClose] = useState(false);

  const [approveButton, setApproveButton] = useState(false);
  const [disapproveButton, setDisapproveButton] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  const dispatch = useDispatch();

  const handleClickApprove = () => {
    setOpenApprove(true);
  };
  const handleClickDisapprove = () => {
    setOpenDisapprove(true);
  };
  const handleClickClose = () => {
    setOpenClose(true);
  };

  const handleClose = () => {
    setOpenApprove(false);
    setOpenDisapprove(false);
    setOpenClose(false);
  };

  const approvePromotion = () => {
    setOpenApprove(false);
    setApproveButton(true);

    dispatch(
      adminApprovePromotion({ promotionId: _id, status: "Approved" })
    ).then(() => {
      setApproveButton(false);
    });
  };
  const disapprovePromotion = () => {
    setOpenDisapprove(false);
    setDisapproveButton(true);

    dispatch(
      adminDisapprovePromotion({ promotionId: _id, status: "Not Approved" })
    ).then(() => {
      setDisapproveButton(false);
    });
  };
  const closePromotion = () => {
    setOpenClose(false);
    setCloseButton(true);

    dispatch(adminClosePromotion({ promotionId: _id, status: "Closed" })).then(
      () => {
        setCloseButton(false);
      }
    );
  };

  return (
    <Grow in timeout={600}>
      <Paper elevation={2} sx={{ padding: "20px" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Typography
              sx={{
                fontSize: "22px",
                color: "#333",
                fontWeight: "700",
                lineHeight: "normal",

                textDecoration: "none",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: "#757982",
              }}
            >
              {new Date(createdAt).toISOString().split("T")[0]}
            </Typography>
          </Box>
        </Stack>
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
              Duration
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {duration}
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
              Cost
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {cost}
            </Typography>
          </Box>
        </Stack>

        <Box flex={1}>
          <Typography
            sx={{
              fontSize: "14px",
              marginBottom: "5px",
              color: "#757982",
            }}
          >
            Status
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            {status}
          </Typography>
        </Box>
        {status === "Pending" && (
          <Box>
            <Divider sx={{ margin: "20px 0px" }} />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                disabled={disapproveButton}
                variant="outlined"
                onClick={handleClickDisapprove}
              >
                {disapproveButton ? "Disapproving" : "Disapprove"}
              </Button>
              <Button
                disabled={approveButton}
                variant="contained"
                onClick={handleClickApprove}
              >
                {approveButton ? "Approving" : "Approve"}
              </Button>
            </Stack>
          </Box>
        )}

        {status === "Approved" && (
          <Box>
            <Divider sx={{ margin: "20px 0px" }} />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                disabled={closeButton}
                variant="contained"
                onClick={handleClickClose}
              >
                {closeButton ? "Closing" : "Close"}
              </Button>
            </Stack>
          </Box>
        )}

        <Dialog
          fullScreen={fullScreen}
          open={openApprove}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography
              sx={{
                fontSize: "18px",
              }}
            >
              This promotion will will be approved.
            </Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={approvePromotion}>Yes</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={openDisapprove}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography
              sx={{
                fontSize: "18px",
              }}
            >
              This promotion will will be Disapproved.
            </Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={disapprovePromotion}>Yes</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={openClose}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography
              sx={{
                fontSize: "18px",
              }}
            >
              This promotion will will be Closed.
            </Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={closePromotion}>Yes</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grow>
  );
};

export default Promotion;
