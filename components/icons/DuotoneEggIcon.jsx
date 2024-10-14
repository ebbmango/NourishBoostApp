import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DuotoneEggIcon = ({ primary, secondary, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
    <Path
      fill={secondary}
      d="M0 351.8c0 55.3 28.7 109.1 80 138.7 76.5 44.2 174.4 18 218.6-58.6 18.8-32.5 66.1-60 103.3-65.2 20.5-2.9 40.6-10.8 58.4-24 33.9-25.1 51.8-63.8 51.8-102.9 0-26.5-8.2-53.2-25.2-76.1-18.2-24.6-43.5-40.7-71-47.8-42.4-10.9-101.2-45.1-131.5-76.7-49-51-130-52.6-181-3.6C80.1 58 67.1 87 64.5 116.8 60.2 166.1 46.2 229.1 21.4 272 6.9 297.2 0 324.7 0 351.8zM336 240a112 112 0 1 1-224 0 112 112 0 1 1 224 0z"
      className="fa-secondary"
    />
    <Path
      fill={primary}
      d="M224 352a112 112 0 1 0 0-224 112 112 0 1 0 0 224zm-48-120c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-39.8 32.2-72 72-72 8.8 0 16 7.2 16 16s-7.2 16-16 16c-22.1 0-40 17.9-40 40z"
      className="fa-primary"
    />
  </Svg>
);

export default DuotoneEggIcon;
