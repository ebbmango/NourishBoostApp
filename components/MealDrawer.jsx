// External dependencies
import { useState } from "react";
import { Dimensions } from "react-native";
import { View, Text, Colors, ExpandableSection } from "react-native-ui-lib";

// Components
import Entry from "./Entry";
import RotatingCaret from "./RotatingCaret";

export default function MealDrawer({ meal }) {
  const screenWidth = Dimensions.get("window").width;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <View
        style={{ marginBottom: 10, width: screenWidth * 0.8, borderRadius: 10 }}
      >
        <View centerV centerH padding-s4 bg-white style={{ minHeight: 60 }}>
          <ExpandableSection
            expanded={expanded}
            sectionHeader={
              <View
                centerH
                style={{
                  width: screenWidth * 0.8,
                  height: "auto",
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
            <View centerH style={{ gap: 10 }}>
              <Entry name={"food"} kcals={106} />
              <Entry name={"food 2"} kcals={80} />
              <Entry name={"food 3"} kcals={42} />
            </View>
          </ExpandableSection>
        </View>
      </View>
    </>
  );
}
