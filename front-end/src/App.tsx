import React, { useEffect, useRef, useState } from "react";
import "./css/App.css";
import { HeaderContainer } from "./components/Headers";
import { VideoBg } from "./components/VideoBg";
import { Home } from "./components/Home";
import { Main } from "./components/Main";
function App() {
  const [device, setDevice] = useState("desktop");
  const imgancher = useRef(null);
  const mainAncher = useRef<null | HTMLElement>(null);
  const handleScrollButtonClick = () => {
    console.log(mainAncher.current);
    mainAncher.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  console.log(mainAncher);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setDevice("desktop");
      } else {
        setDevice("mobile");
      }
    };
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="App">
      <VideoBg />
      {/* <HeaderContainer device={device} /> */}
      <Home
        imgancher={imgancher}
        device={device}
        handleScrollButtonClick={handleScrollButtonClick}
      />
      <Main mainAncher={mainAncher} />
    </div>
  );
}

export default App;
