import { Colors, GridView, Text, View } from "react-native-ui-lib";
import styles from "../../styles/styles";
import tweakStyles from "../../functions/tweakStyles";
import BaconIcon from "../icons/BaconIcon";
import DrumstickIcon from "../icons/DrumstickIcon";
import WheatIcon from "../icons/WheatIcon";
import CaloriesIcon from "../icons/CaloriesIcon";

const iconSize = 70;

export default function NutrientsGrid({ items }) {
  const renderCustomItem = ({ title, value, trailing, color }) => {
    return (
      <View key={title} style={styles.foodDetailsScreen.nutrientsBoxStyle}>
        {title === "Calories" && (
          <CaloriesIcon
            width={iconSize}
            height={iconSize}
            style={{
              position: "absolute",
              left: -8,
              bottom: -12,
              // transform: [{ rotate: "90deg" }],
            }}
            color={Colors.green50}
          />
        )}
        {title === "Fats" && (
          <BaconIcon
            width={iconSize}
            height={iconSize}
            style={{
              position: "absolute",
              left: -8,
              bottom: -12,
              // transform: [{ rotate: "90deg" }],
            }}
            color={Colors.green50}
          />
        )}
        {title === "Protein" && (
          <DrumstickIcon
          width={iconSize}
          height={iconSize}
          style={{
            position: "absolute",
            left: -8,
            bottom: -8,
          }}
            color={Colors.green50}
          />
        )}
        {title === "Carbohydrates" && (
          <WheatIcon
          width={64}
          height={64}
          style={{
            position: "absolute",
            left: -4,
            bottom: -4,
          }}
            color={Colors.green50}
          />
          
        )}

        <Text text70BL>{title}</Text>
        <Text text70BL whites >
          {value}
          {title !== "Calories" && "g"}
        </Text>
      </View>
    );
  };

  return (
    <GridView
      numColumns={2}
      items={items}
      renderCustomItem={renderCustomItem}
    />
  );
}
