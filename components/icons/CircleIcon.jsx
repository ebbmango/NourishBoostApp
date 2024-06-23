import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CircleIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill={color} d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512z" />
  </Svg>
);

export default CircleIcon;

// Icon:
// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Source:
// https://fontawesome.com/icons/circle?f=classic&s=solid

// Component:
// https://react-svgr.com/playground/?native=true