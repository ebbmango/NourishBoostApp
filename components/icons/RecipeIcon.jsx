import * as React from "react";
import Svg, { Path } from "react-native-svg";

const RecipeIcon = ({ primaryColor, secondaryColor, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path
      fill={secondaryColor}
      d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-72-384h104c44.2 0 80 35.8 80 80 0 36.6-24.6 67.5-58.2 77l45.4 60.6c8 10.6 5.8 25.6-4.8 33.6s-25.6 5.8-33.6-4.8L252 288h-44v72c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm80 112h24c17.7 0 32-14.3 32-32s-14.3-32-32-32h-80v64h56z"
      className="fa-secondary"
    />
    <Path
      fill={primaryColor}
      d="M160 152c0-13.3 10.7-24 24-24h104c44.2 0 80 35.8 80 80 0 36.6-24.6 67.5-58.2 77l45.4 60.6c8 10.6 5.8 25.6-4.8 33.6s-25.6 5.8-33.6-4.8L252 288h-44v72c0 13.3-10.7 24-24 24s-24-10.7-24-24V152zm48 88h80c17.7 0 32-14.3 32-32s-14.3-32-32-32h-80v64z"
      className="fa-primary"
    />
  </Svg>
);

export default RecipeIcon;

// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Icon:
// https://fontawesome.com/icons/circle-r?f=classic&s=solid

// React Component:
// https://react-svgr.com/playground/?native=true