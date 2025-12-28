import { Box } from "@mui/material";
import { CustomTabPanel } from "./CustomTabPanel.tsx";

export const AboutMe = (props: { value: number; index: number }) => {
  return (
    <CustomTabPanel value={props.value} index={props.index}>
      <Box
        sx={{
          backgroundColor: "white",
          width: "60vw",
        }}
      >
        About Me
      </Box>
    </CustomTabPanel>
  );
};
