import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { backdropClasses, styled } from "@mui/material";
import { CV } from "./CV";
import { Portfolio } from "./Portfolio";
import { AboutMe } from "./AboutMe";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
interface StyledTabProps {
  label: string;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroudColor: "rgba(100, 95, 228, 0.32)",
  },
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Main = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      className="main"
      sx={{
        display: "flex",
        position: 'relative',
        width: "100%",
        height: "100vh",
        zIndex: 13,
        alignItems: "center",
        justifyContent: "flex-start",
        alignContent: "center",
        flexDirection: "column",
        flexWrap: "no-wrap",
        marginTop: "30px",
      }}
      ref={props.mainAncher}
    >
      <StyledTabs value={value} onChange={handleChange} sx={{ zIndex: 13 }}>
        <StyledTab
          label="CV"
          sx={{
            color: "rgb(124 124 124)",
          }}
          {...a11yProps(0)}
        />
        <StyledTab
          label="Portfolio"
          sx={{
            color: "rgb(124 124 124)",
          }}
          {...a11yProps(1)}
        />
        <StyledTab
          label="About Me"
          sx={{
            color: "rgb(124 124 124)",
          }}
          {...a11yProps(2)}
        />
      </StyledTabs>
      <CV value={value} index={0} />
      <Portfolio value={value} index={1} />
      <AboutMe value={value} index={2} />
    </Box>
  );
};
