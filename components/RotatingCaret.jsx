import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AngleDownIcon from "./icons/AngleDownIcon";

const RotatingCaret = ({ rotated, ...props }) => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    width: 24,
    height: 24,
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (rotated) {
    rotation.value = withTiming(180, { duration: 500 });
  } else {
    rotation.value = withTiming(0, { duration: 500 });
  }

  return (
    <Animated.View style={animatedStyles}>
      <AngleDownIcon color="black" />
    </Animated.View>
  );
};

export default RotatingCaret;
