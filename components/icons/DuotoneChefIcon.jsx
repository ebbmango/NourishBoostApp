import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DuotoneChefIcon = ({ primary, secondary, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <Path
      fill={secondary}
      d="M96 160h256c0 70.7-57.3 128-128 128S96 230.7 96 160z"
      className="fa-secondary"
    />
    <Path
      fill={primary}
      d="M384 48c0 20.9-13.4 38.7-32 45.3V160H96V93.3C77.4 86.7 64 68.9 64 48c0-26.5 21.5-48 48-48 14.3 0 27.2 6.3 36 16.3C156.8 6.3 169.7 0 184 0c16.7 0 31.4 8.5 40 21.5C232.6 8.5 247.3 0 264 0c14.3 0 27.2 6.3 36 16.3C308.8 6.3 321.7 0 336 0c26.5 0 48 21.5 48 48zM128 410.8l224-89.6V352h48l48 160H128V410.8zM96 400v112H0l48-160h48v-32l106.4 26.6-96.4 38.5-10.1 4L96 400zm128 32a16 16 0 1 0-32 0 16 16 0 1 0 32 0zm80 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"
      className="fa-primary"
    />
  </Svg>
);

export default DuotoneChefIcon;

// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Icon:
// https://fontawesome.com/icons/user-chef?f=sharp-duotone&s=solid

// React Component:
// https://react-svgr.com/playground/?native=true

