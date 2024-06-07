// External dependencies
import { useState } from "react";
import { Dimensions } from "react-native";
import { View, Text, Colors, ExpandableSection } from "react-native-ui-lib";

// Components
import Entry from "./Entry";
import RotatingCaret from "./RotatingCaret";

export default function MealDrawer({ meal }) {
  // Extracting the device's dimensions.
  const screenWidth = Dimensions.get("window").width;

  // Setting up a state to handle the expandable section's expansion.
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ExpandableSection
        expanded={expanded}
        sectionHeader={
          // Expandable Section Header
          <View
            centerH
            centerV
            style={{
              width: screenWidth * 0.8,
              height: "auto",
              backgroundColor: Colors.white,
              padding: 15,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: expanded ? 0 : 10,
              borderBottomRightRadius: expanded ? 0 : 10,
            }}
          >
            <Text grey10 text70>
              {meal.name}
            </Text>
            <RotatingCaret rotated={expanded} />
          </View>
        }
        onPress={() => setExpanded(!expanded)}
      >
        {/* Expandable Section Body */}
        <View
          centerH
          style={{
            gap: 8,
            backgroundColor: Colors.grey80,
            paddingVertical: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Entry name={"food"} kcals={106} />
          <Entry name={"food 2"} kcals={80} />
          <Entry name={"food 3"} kcals={42} />
        </View>
      </ExpandableSection>
    </>
  );
}
