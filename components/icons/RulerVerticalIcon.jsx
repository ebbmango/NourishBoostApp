import * as React from "react";
import Svg, { Path } from "react-native-svg";

const RulerVerticalIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" {...props}>
    <Path
      fill={color}
      d="M0 48C0 21.5 21.5 0 48 0h160c26.5 0 48 21.5 48 48v48h-80c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64h-80c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64h-80c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64h-80c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48z"
    />
  </Svg>
);

export default RulerVerticalIcon;

// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Icon:
// https://fontawesome.com/icons/ruler-vertical?f=classic&s=solid

// React Component:
// https://react-svgr.com/playground/?native=true