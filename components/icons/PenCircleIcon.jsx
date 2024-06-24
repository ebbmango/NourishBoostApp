import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PenCircleIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path
      fill={color}
      d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm101.8-372.3 14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-21.4 21.4-71-71 21.4-21.4c15.6-15.6 40.9-15.6 56.6 0zM151.9 289l105.2-105.2 71 71-105.2 105.1c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"
    />
  </Svg>
);

export default PenCircleIcon;

// Icon:
// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Source:
// https://fontawesome.com/icons/pen-circle?f=classic&s=solid

// Component:
// https://react-svgr.com/playground/?native=true
