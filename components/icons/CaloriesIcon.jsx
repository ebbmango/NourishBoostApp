import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CaloriesIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
    <Path
      fill={color}
      d="M320 160a80 80 0 1 0 0-160 80 80 0 1 0 0 160zM208 328a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm-16 104a80 80 0 1 0-160 0 80 80 0 1 0 160 0zm128 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm288-80a80 80 0 1 0-160 0 80 80 0 1 0 160 0zM432 328a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
    />
  </Svg>
);

export default CaloriesIcon;

// Icon:
// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Source:
// https://fontawesome.com/icons/ball-pile?f=classic&s=solid

// Component:
// https://react-svgr.com/playground/?native=true
