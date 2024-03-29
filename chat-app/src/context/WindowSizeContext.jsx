import { createContext, useState, useLayoutEffect } from "react";

export const WindowSizeContext = createContext();

export const WindowSizeContextProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // updates the width variable value in real time
  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={{ windowWidth, setWindowWidth }}>
      {children}
    </WindowSizeContext.Provider>
  );
};
