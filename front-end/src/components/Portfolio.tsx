import { Box, Grow, GrowProps, ImageList, ImageListItem } from "@mui/material";
import * as React from "react";
import { CustomTabPanel } from "./CustomTabPanel";
import { ImgDialog } from "./ImgDialog";
import styled from "@emotion/styled";

interface MasonryImageListProps {
  imgData: [
    {
      img: string;
      title?: string;
    }
  ];
  handleImgClick: React.MouseEventHandler<HTMLLIElement>;
}

const CustomedGrow = styled(Grow)<GrowProps>(({ theme }) => ({
  transformOrigin: "0 0 0",
  ".MuiImageListItem-img:hover": {
    "-ms-transform": "scale(1.02)",
    "-webkit-transform": "scale(1.02)",
    "-moz-transform": "scale(1.02)",
    "-o-transform": "scale(1.02)",
    transform: "scale(1.02)",
    transformOrigin: "center",
    transition: "0.2s ease-in-out",
    border: "solid 1px white",
  },
}));

const MasonryImageList = (props: MasonryImageListProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ImageList
        variant="masonry"
        // cols={3}
        gap={15}
        sx={{
          padding: "10px",
          columnCount: "auto !important",
          columnWidth: "400px",
        }}
      >
        {props.imgData.map((item, index) => (
          <CustomedGrow
            in={true}
            style={{
              transformOrigin: "0 0 0",
            }}
            {...{ timeout: index * 500 > 2500 ? 2500 : index * 500 }}
            key={index}
          >
            <ImageListItem
              onClick={props.handleImgClick}
              component={"li"}
              key={item.img}
              sx={{
                padding: "10px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          </CustomedGrow>
        ))}
      </ImageList>
    </Box>
  );
};

export const Portfolio = (props: any) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogImg, setDialogImg] = React.useState("");

  const handleImgClick = (e: any) => {
    if (e.target.getAttribute("src")) {
      setOpenDialog(true);
      setDialogImg(e.target.getAttribute("src"));
    }
  };

  const handleClose = (value: string) => {
    setOpenDialog(false);
  };

  return (
    <CustomTabPanel value={props.value} index={props.index}>
      <Box
        sx={{
          width: "75vw",
        }}
      >
        <MasonryImageList
          imgData={props.imgData}
          handleImgClick={handleImgClick}
        />
        <ImgDialog
          dialogImg={dialogImg}
          openDialog={openDialog}
          handleClose={handleClose}
        />
      </Box>
    </CustomTabPanel>
  );
};
