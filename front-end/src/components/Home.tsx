import portrait from "../img/portrait.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { requestHandler } from "../utils/requestHandler";
import axios from "axios";
import getConfig from "../utils/getConfig";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const getContacts = requestHandler((params) =>
  axios.get(`${params}/getContacts`)
);

export const Home = (props: any) => {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    linkedIn: "",
    instagram: "",
  });

  useEffect(() => {
    (async function () {
      const { backendDomain } = await getConfig();
      const response = await getContacts(backendDomain);
      if (response.code === "error") {
        setContact({ email: "", phone: "", linkedIn: "", instagram: "" });
      } else {
        setContact(response.data);
      }
    })();
  }, []);
  console.log(contact);

  return (
    <Box className="homeWrapper" >
      {props.device && props.device === "mobile" ? (
        <Box className="portrait mobile" ref={props.imgancher}>
          <img src={portrait} alt=" " />
        </Box>
      ) : (
        <Box className="portrait desktop" ref={props.imgancher}>
          <img src={portrait} alt=" " />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          height: "100vh",
        }}
      >
        <Box className="contacts">
          {Object.keys(contact).length !== 0 ? (
            <>
              <Typography
                sx={{
                  fontSize: 10,
                  position: "relative",
                  left: "50px",
                  marginBottom: "10px",
                }}
              >
                E: {contact.email}
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  position: "relative",
                  left: "50px",
                  marginBottom: "10px",
                }}
                gutterBottom
              >
                T: {contact.phone}
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "nowrap",
            justifyContent: "center",
            position: "relative",
            zIndex: 14,
            width: "60vw",
          }}
        >
          <Typography
            sx={{
              fontSize: props.device === "desktop" ? "4vh" : "3vw",
              fontWeight: 1,
              color: "#e7e7e7",
              visibility: props.scrolled > 0 && props.mainOffset > 200 ? "visible" : "hidden",
              opacity: props.scrolled > 0 && props.mainOffset > 200 ? "1" : "0",
              transition: "opacity .15s cubic-bezier(.25, .46, .45, .94), transform .35s cubic-bezier(.25, .46, .45, .94)",
              transitionProperty: "visibility, opacity",
              position: "fixed",
              top: "70px",
            }}
          >
            KEVIN TIAN
          </Typography>
          <Typography
            sx={{
              fontSize: props.device === "desktop" ? "30vh" : "20vw",
              fontWeight: 1,
              color: "#e7e7e7",
              visibility: props.scrolled > 0 ? "hidden" : "visible",
              opacity: props.scrolled > 0 ? "0" : "1",
              transition:
                "opacity .7s cubic-bezier(.25, .46, .45, .94), transform .35s cubic-bezier(.25, .46, .45, .94)",
              transitionProperty: "visibility, opacity",
            }}
          >
            KEVIN TIAN
          </Typography>
          <KeyboardArrowDownIcon
            sx={{
              position: "absolute",
              bottom: "0px",
              zIndex: 14,
              fontSize: "3rem",
              color: "#e7e7e7",
              margin: "4vh 0",
              "&:hover": {
                cursor: "pointer",
                color: "white",
                transition: "0.3s",
              },
            }}
            onClick={props.handleScrollButtonClick}
          />
        </Box>

        <Box className="socialLink">
          <Typography
            className="followMe"
            sx={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: 10,
            }}
          >
            Follow me
          </Typography>
          <Link
            className="icon"
            href={contact.linkedIn}
            target="_blank"
            color="#bbb"
          >
            <LinkedInIcon
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: "white",
                  transition: "0.3s",
                },
              }}
            />
          </Link>
          <Link
            className="icon"
            href={contact.instagram}
            target="_blank"
            color="#bbb"
          >
            <InstagramIcon
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: "white",
                  transition: "0.3s",
                },
              }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
