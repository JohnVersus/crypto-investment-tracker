const theme = {
  colors: {
    primary: "#FFCC66", // Cream yello
    secondary: "#00916e", // Dark green
    background: "#1c1c1c",
    text: "#ffffff",
    gray: "#757575",
    white: "#ffffff",
  },
  shadows: {
    small: "0 2px 4px rgba(0, 145, 110, 0.2), 0 1px 2px rgba(0, 145, 110, 0.2)",
    medium:
      "0 2px 4px rgba(0, 145, 110, 0.4), 0 2px 4px rgba(0, 145, 110, 0.4)",
    large: "0 2px 4px rgba(0, 145, 110, 0.6), 0 6px 6px rgba(0, 145, 110, 0.6)",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  breakpoints: ["640px", "768px", "1024px", "1280px", "1536px"],
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    heading: "0.1em",
    caps: "0.2em",
  },
};

export default theme;
export type Theme = typeof theme;
