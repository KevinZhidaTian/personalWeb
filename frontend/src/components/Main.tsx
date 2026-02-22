import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material";
import { CV } from "./CV.tsx";
import { Portfolio } from "./Portfolio.tsx";
import { AboutMe } from "./AboutMe.tsx";
import type { JobExperienceResponse } from "../types/types.ts";
import getConfig from "../utils/getConfig.ts";
import axios from "axios";

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
    slotProps={{
      indicator: { children: <span className="MuiTabs-indicatorSpan" /> },
    }}
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
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export default function Main(props: {
  mainAnchor: React.RefObject<HTMLElement | null>;
  device: string;
}) {
  const { backendDomain } = getConfig();
  const [value, setValue] = React.useState(0);
  const [experience, setExperience] = React.useState<JobExperienceResponse[]>(
    [],
  );
  const [imgData, setImgData] = React.useState([
    { img: "", title: "", preview_img: "" },
  ]);
  const [aboutMe, setAboutMe] = React.useState("");

  React.useEffect(() => {
    const getExpResponse = axios.get(`${backendDomain}/getExp`);
    const getPortfolioResponse = axios.get(`${backendDomain}/getPortfolio`);
    const getAboutMeResponse = axios.get(`${backendDomain}/getAboutMe`);

    getExpResponse.then((response) => {
      if (response.status === 200) {
        setExperience(response.data);
      }
    });

    getPortfolioResponse.then((response) => {
      if (response.status === 200) {
        setImgData(response.data.imgData);
      }
    });

    getAboutMeResponse.then((response) => {
      if (response.status === 200) {
        setAboutMe(response.data);
      }
    });
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      className="main"
      sx={{
        display: "flex",
        position: "relative",
        width: "100%",
        zIndex: 13,
        alignItems: "center",
        justifyContent: "flex-start",
        alignContent: "center",
        flexDirection: "column",
        flexWrap: "no-wrap",
        marginTop: "30px",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
      ref={props.mainAnchor}
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
      <CV
        value={value}
        index={0}
        experience={experience}
        device={props.device}
      />
      <Portfolio value={value} index={1} imgData={imgData} />
      <AboutMe value={value} index={2} aboutMe={aboutMe} />
    </Box>
  );
}
