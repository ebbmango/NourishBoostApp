import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FoodIcon = ({ primaryColor, secondaryColor, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path
      fill={secondaryColor}
      d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-72-384h144c13.3 0 24 10.7 24 24s-10.7 24-24 24H208v64h88c13.3 0 24 10.7 24 24s-10.7 24-24 24h-88v72c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24z"
      className="fa-secondary"
    />
    <Path
      fill={primaryColor}
      d="M160 152c0-13.3 10.7-24 24-24h144c13.3 0 24 10.7 24 24s-10.7 24-24 24H208v64h88c13.3 0 24 10.7 24 24s-10.7 24-24 24h-88v72c0 13.3-10.7 24-24 24s-24-10.7-24-24V152z"
      className="fa-primary"
    />
  </Svg>
);

export default FoodIcon;

// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Icon:
// https://fontawesome.com/icons/circle-f?f=classic&s=solid

// React Component:
// https://react-svgr.com/playground/?native=true
