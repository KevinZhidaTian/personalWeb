import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import "./css/App.css";
// import { HeaderContainer } from "./components/headers";
const Home = lazy(() => import("./components/Home"));
const VideoBg = lazy(() => import("./components/VideoBg"));
const Main = lazy(() => import("./components/Main"));
function App() {
  const [device, setDevice] = useState("");
  const [scrolled, setScrolled] = useState(0);
  const [mainOffset, setMainOffSet] = useState<undefined | number>(0);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setDevice("desktop");
      } else {
        setDevice("mobile");
      }
    };
    const handleScroll = () => {
      setScrolled(window.scrollY);
      setMainOffSet(mainAncher.current?.getBoundingClientRect().y);
      console.log(mainAncher.current?.getBoundingClientRect().y);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div className="App">
      <VideoBg />
      {/* <HeaderContainer device={device} /> */}
      <Home
        imgancher={imgancher}
        device={device}
        handleScrollButtonClick={handleScrollButtonClick}
        scrolled={scrolled}
        mainOffset={mainOffset}
      />
      <Suspense fallback={<div></div>}>
        <Main mainAncher={mainAncher} />
      </Suspense>
    </div>
  );
}

export default App;
