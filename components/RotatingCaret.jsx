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
    position: "absolute",
    width: 24,
    height: 24,
    right: 15,
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (rotated) {
    rotation.value = withTiming(180, { duration: 500 });
  } else {
    rotation.value = withTiming(0, { duration: 500 });
  }

  return (
    <Animated.View style={animatedStyles}>
      <AngleDownIcon color="black" style={{ marginBottom: 20 }} />
    </Animated.View>
  );
};

export default RotatingCaret;
