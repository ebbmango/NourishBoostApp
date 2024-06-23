import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DrumstickIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path
      fill={color}
      d="M243.6 19.6c40.1-40 128.3-16.8 196.9 51.9s91.9 156.8 51.8 196.9l-40.5 40.5C403.9 357 338.7 384 270.8 384h-58.2c-7.1 0-13.9 2.8-18.9 7.8-10.3 10.3-9.7 26.9-5 40.7 2.1 6.1 3.2 12.7 3.2 19.5 0 33.1-26.9 60-60 60s-60-26.9-60-60c0-6.3-5.7-12-12-12-33.1 0-60-26.9-60-60s26.9-60 60-60c6.8 0 13.4 1.1 19.5 3.2 13.8 4.7 30.4 5.3 40.7-5 5-5 7.8-11.8 7.8-18.9v-58c0-67.9 27-133 75-181l40.7-40.7zm64 184.8c49.6 49.6 113.3 66.4 142.2 37.4s12.2-92.6-37.4-142.2-113.3-66.4-142.2-37.4-12.2 92.6 37.4 142.2zm36.3-36.3c-15.3-15.3-20.4-34.9-11.5-43.8s28.5-3.7 43.8 11.5 20.4 34.9 11.5 43.8-28.5 3.7-43.8-11.5z"
    />
  </Svg>
);

export default DrumstickIcon;

// Icon:
// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Source:
// https://fontawesome.com/icons/meat?f=classic&s=solid

// Component:
// https://react-svgr.com/playground/?native=true
