import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FileWriteIcon = ({ color, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
    <Path
      fill={color}
      d="M0 64C0 28.7 28.7 0 64 0h160v128c0 17.7 14.3 32 32 32h128v139.6l-94.7 94.7c-8.2 8.2-14 18.5-16.8 29.7l-15 60.1c-2.3 9.4-1.8 19 1.4 27.8H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0l128 128zm165.8 107.7 14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417l129.2-129.2 71 71-129.2 129.1c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"
    />
  </Svg>
);

export default FileWriteIcon;

// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc

// Icon:
// https://fontawesome.com/icons/file-pen?f=classic&s=solid

// React Component:
// https://react-svgr.com/playground/?native=true
