import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DuotoneBowlChopsticksIcon = ({ primary, secondary, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path
      fill={secondary}
      d="M0 109.3c0 9.8 8.8 17.3 18.5 15.8L64 118V84l-50.9 9.6C5.5 95 0 101.6 0 109.3zm0 50.5c0 9 7.3 16.2 16.2 16.2H64v-34l-48.3 1.5C7 143.8 0 151 0 159.7zM224 54v39l268.3-41.9c11.3-1.8 19.7-11.5 19.7-23 0-13.1-10.7-23.3-23.2-23.3-1.4 0-2.9.1-4.3.4L224 54zm0 83v39h264.4c13 0 23.6-10.6 23.6-23.6 0-13.3-11-24-24.4-23.6L224 137z"
      className="fa-secondary"
    />
    <Path
      fill={primary}
      d="M192 40c0-13.3-10.7-24-24-24s-24 10.7-24 24v184h-32V56c0-13.3-10.7-24-24-24S64 42.7 64 56v168H33.6C15.4 224 .9 239.3 2 257.5c5.4 91.7 59.7 169.7 136.4 209.7l1.2 9.7c2.5 20 19.5 35 39.7 35h153.4c20.2 0 37.2-15 39.7-35l1.2-9.7c76.8-40 131-118 136.4-209.7 1.1-18.2-13.4-33.5-31.6-33.5H192V40z"
      className="fa-primary"
    />
  </Svg>
);

export default DuotoneBowlChopsticksIcon;

// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Icon:
// https://fontawesome.com/icons/bowl-chopsticks-noodles?f=duotone&s=solid

// React Component:
// https://react-svgr.com/playground/?native=true
