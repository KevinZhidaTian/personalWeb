import { Card, CardMedia, Dialog, DialogContent } from "@mui/material";

interface ImgDialog {
  dialogImg: string;
  handleClose: (value: string) => void;
  openDialog: boolean;
}
export const ImgDialog = (props: ImgDialog) => {
  return (
    <Dialog
      onClose={props.handleClose}
      open={props.openDialog}
      sx={{
        ".MuiPaper-root": {
          backgroundColor: "unset",
          maxWidth: "80vw",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <img
          src={props.dialogImg}
          style={{
            height: "100%",
            maxWidth: "90vw",
            maxHeight: "90vh",
            objectFit: "scale-down",
            objectPosition: "center",
          }}
        ></img>
        {/* <CardMedia
          sx={{
            height: "100%",
            backgroundSize: "contain",
            backgroundColor: "transparent",
          }}
          image={props.dialogImg}
        /> */}
      </DialogContent>
    </Dialog>
  );
};
