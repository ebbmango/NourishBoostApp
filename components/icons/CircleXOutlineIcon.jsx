import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CircleXOutlineIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path
      fill={color}
      d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-81-337c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
    />
  </Svg>
);

export default CircleXOutlineIcon;

// Icon:
// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Source:
// https://fontawesome.com/icons/circle-xmark?f=classic&s=regular

// Component:
// https://react-svgr.com/playground/?native=true