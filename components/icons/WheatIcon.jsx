import * as React from "react";
import Svg, { Path } from "react-native-svg";

const WheatIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path
      fill={color}
      d="M472 0c-48.6 0-88 39.4-88 88v24c0 8.8 7.2 16 16 16h24c48.6 0 88-39.4 88-88V16c0-8.8-7.2-16-16-16h-24zM305.5 27.3c-6.2-6.2-16.4-6.2-22.6 0l-11.4 11.3c-37.5 37.5-37.5 98.3 0 135.8l10.4 10.4-30.5 30.5c-3.4-27.3-15.5-53.8-36.5-74.8l-11.3-11.3c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-37.5 37.5-37.5 98.3 0 135.8l10.4 10.4-30.5 30.5c-3.4-27.3-15.5-53.8-36.5-74.8L101.8 231c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-37.5 37.5-37.5 98.3 0 135.8l10.4 10.4-68.9 68.9c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l68.9-68.9 12.2 12.2c37.5 37.5 98.3 37.5 135.8 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6l-11.3-11.3c-21.8-21.8-49.6-34.1-78.1-36.9l31.9-31.9 12.2 12.2c37.5 37.5 98.3 37.5 135.8 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6L373.4 299c-21.8-21.8-49.6-34.1-78.1-36.9l31.9-31.9 12.2 12.2c37.5 37.5 98.3 37.5 135.8 0l11.3-11.4c6.2-6.2 6.2-16.4 0-22.6L475.2 197c-34.1-34.1-82.6-44.9-125.9-32.5 12.4-43.3 1.5-91.8-32.5-125.9l-11.3-11.3z"
    />
  </Svg>
);

export default WheatIcon;

// Icon:
// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Source:
// https://fontawesome.com/icons/wheat?f=classic&s=solid

// Component:
// https://react-svgr.com/playground/?native=true
