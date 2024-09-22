/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef, useState } from "react";
import { imgData } from "../types/types";
import { ImageListItem } from "@mui/material";

interface LazyImageProps {
  img: imgData;
  handleImgClick: React.MouseEventHandler<HTMLLIElement>;
  key: number;
}
export default function LazyImage(props: LazyImageProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
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
      component={"li"}
      key={props.key}
      sx={{
        padding: "10px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <img
        srcSet={`${props.img.previewImg}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${props.img.previewImg}?w=248&fit=crop&auto=format`}
        alt={props.img.title}
        loading="lazy"
      />
    </ImageListItem>
  ) : (
    <ImageListItem
      ref={ref}
      onClick={props.handleImgClick}
      component={"li"}
      key={props.key}
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
