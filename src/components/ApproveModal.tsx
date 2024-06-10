import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAtom } from "jotai";
import { openModal } from "../helpers/store";
import { PiWarningCircleThin } from "react-icons/pi";

type ApproveModalProps = {
  approveFunction: () => void;
};

export default function ApproveModal({ approveFunction }: ApproveModalProps) {
  const [open, setOpen] = useAtom(openModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApprove = () => {
    approveFunction();
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PiWarningCircleThin size={64} color="orange" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            İşlemi Onaylayın
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center ">
            Mesajlarınız karşı taraftanda silinecektir. Mesajlarınızı silmek istediğinize emin misiniz?
          </Typography>
          <div className="flex gap-2 mt-8">
            <button onClick={handleApprove} className="bg-blue-700 text-white px-3 text-xs py-1 rounded-sm">
              Evet
            </button>
            <button onClick={handleClose} className="bg-red-700 text-white px-3 text-xs py-1 rounded-sm">
              İptal
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
