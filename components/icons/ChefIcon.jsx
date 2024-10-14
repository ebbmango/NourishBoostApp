import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ChefIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <Path
      fill={color}
      d="M384 48c0 20.9-13.4 38.7-32 45.3V176c0 70.7-57.3 128-128 128S96 246.7 96 176V93.3C77.4 86.7 64 68.9 64 48c0-26.5 21.5-48 48-48 14.3 0 27.2 6.3 36 16.3C156.8 6.3 169.7 0 184 0c16.7 0 31.4 8.5 40 21.5C232.6 8.5 247.3 0 264 0c14.3 0 27.2 6.3 36 16.3C308.8 6.3 321.7 0 336 0c26.5 0 48 21.5 48 48zm-80 128v-16H144v16c0 44.2 35.8 80 80 80s80-35.8 80-80zM178.4 340.6c7.5 1.9 8.2 12.3 1 15.2l-43.2 17.3c-24.3 9.7-40.2 33.2-40.2 59.4V512H25.6C11.5 512 0 500.5 0 486.4c0-58.8 37.7-108.8 90.3-127 3.3-1.2 5.7-4.3 5.7-7.8v-21.4c0-5.2 4.9-9 9.9-7.8l72.5 18.1zM352 512H128v-79.5c0-13.1 8-24.9 20.1-29.7L341 325.6c5.3-2.1 11 1.8 11 7.4v18.6c0 3.5 2.3 6.6 5.7 7.8 52.6 18.2 90.3 68.2 90.3 127 0 14.1-11.5 25.6-25.6 25.6H352zm-128-80a16 16 0 1 0-32 0 16 16 0 1 0 32 0zm80 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"
    />
  </Svg>
);

export default ChefIcon;

// Icon:
// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Source:
// https://fontawesome.com/icons/user-chef?f=classic&s=solid

// Component:
// https://react-svgr.com/playground/?native=true
