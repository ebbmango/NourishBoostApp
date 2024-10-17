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
            // transform: [{ rotate: "-20deg" }],
          }}
            color={Colors.green50}
          />
        )}
        {title === "Carbohydrates" && (
          <WheatIcon
            width={50}
            height={50}
            style={{
              position: "absolute",
              left: -6,
              bottom: 2,
              transform: [{ rotate: "-45deg" }],
            }}
            color={Colors.green50}
          />
          
        )}

        <Text text70>{title}</Text>
        <Text text70BL>
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
