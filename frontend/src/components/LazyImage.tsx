import { useEffect, useRef, useState } from "react";
import type { ImgData } from "../types/types.ts";
import { ImageListItem } from "@mui/material";

interface LazyImageProps {
  img: ImgData;
  handleImgClick: React.MouseEventHandler<HTMLLIElement>;
  itemKey: number;
}
export default function LazyImage(props: LazyImageProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, _observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      });
    });
    if (ref?.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return inView ? (
    <ImageListItem
      onClick={props.handleImgClick}
      component="li"
      key={props.itemKey}
      sx={{
        padding: "10px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <img
        srcSet={`${props.img.preview_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${props.img.preview_img}?w=248&fit=crop&auto=format`}
        alt={props.img.title}
        loading="lazy"
      />
    </ImageListItem>
  ) : (
    <ImageListItem
      ref={ref}
      onClick={props.handleImgClick}
      component="li"
      key={props.itemKey}
      sx={{
        padding: "10px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <img
        style={{
          width: "20vw",
          height: "20vh",
          backgroundColor: "#202020",
        }}
      />
    </ImageListItem>
  );
}
