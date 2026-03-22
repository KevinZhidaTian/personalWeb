import { Box, Grow, ImageList } from "@mui/material";
import type { GrowProps } from "@mui/material";
import * as React from "react";
import { CustomTabPanel } from "./CustomTabPanel.tsx";
import { ImgDialog } from "./ImgDialog.tsx";
import styled from "@emotion/styled";
import LazyImage from "./LazyImage.tsx";
import type { ImgData } from "../types/types.ts";

interface MasonryImageListProps {
  imgData: ImgData[];
  handleImgClick: React.MouseEventHandler<HTMLLIElement>;
}

const CustomedGrow = styled(Grow)<GrowProps>(() => ({
  transformOrigin: "0 0 0",
  ".MuiImageListItem-img:hover": {
    msTransform: "scale(1.02)",
    WebkitTransform: "scale(1.02)",
    MozTransform: "scale(1.02)",
    OTransform: "scale(1.02)",
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
            style={{
              transformOrigin: "0 0 0",
            }}
            {...{ timeout: index * 500 > 2500 ? 2500 : index * 500 }}
            key={index}
          >
            <LazyImage
              img={item}
              handleImgClick={props.handleImgClick}
              itemKey={index}
            />
          </CustomedGrow>
        ))}
      </ImageList>
    </Box>
  );
};

interface PortfolioProps {
  value: number;
  index: number;
  imgData: ImgData[];
}

export const Portfolio = (props: PortfolioProps) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogImg, setDialogImg] = React.useState("");

  const handleImgClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    const src =
      target instanceof HTMLImageElement ? target.getAttribute("src") : null;
    if (src) {
      setOpenDialog(true);
      setDialogImg(src.replace("preview", "full"));
      // setDialogImg(src);
    }
  };

  const handleClose = (_value: string) => {
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
