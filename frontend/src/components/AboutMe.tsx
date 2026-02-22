import { Box } from "@mui/material";
import { CustomTabPanel } from "./CustomTabPanel.tsx";

export const AboutMe = (props: {
  value: number;
  index: number;
  aboutMe: string;
}) => {
  return (
    <CustomTabPanel value={props.value} index={props.index}>
      <Box
        sx={{
          whiteSpace: "pre-line",
          width: "60vw",
          color: "rgb(231 231 231)",
          fontSize: "1.50rem",
          marginTop: "50px",
          textAlign: "left",
        }}
      >
        {props.aboutMe}
      </Box>
    </CustomTabPanel>
  );
};
