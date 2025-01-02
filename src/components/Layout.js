import React, { useContext } from "react";
import { ThemeContext } from "../App";

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const styles = {
    backgroundContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundImage:
        theme === "light" ? "url('/light.jpg')" : "url('/dark.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    contentContainer: {
      position: "relative", // Ensures the content layers correctly over the background
      minHeight: "100vh",
    },
  };

  return (
    <div style={styles.contentContainer}>
      <div style={styles.backgroundContainer} />
      {children}
    </div>
  );
};

export default Layout;
