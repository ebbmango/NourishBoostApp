import { useState } from "react";
import { Dimensions } from "react-native";
import {
  View,
  TextField,
  Text,
  Button,
  Drawer,
  Colors,
  ExpandableSection,
} from "react-native-ui-lib";

// Get the screen width
const screenWidth = Dimensions.get("window").width;

const onLeftPress = () => {
  // Handle left drawer item press
  console.log("Left drawer item pressed");
};

const onRightPress = () => {
  // Handle right drawer item press
  console.log("Right drawer item pressed");
};

export default function MealDrawer({ meal }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Drawer
      rightItems={[
        {
          text: "Edit",
          background: Colors.yellow10,
          onPress: () => console.log("read pressed"),
        },
      ]}
      leftItem={{
        text: "Delete",
        background: Colors.red30,
        onPress: () => console.log("delete pressed"),
      }}
      style={{ marginBottom: 10, width: screenWidth * 0.8, borderRadius: 10 }}
    >
      <View centerV centerH padding-s4 bg-white style={{ minHeight: 60 }}>
        <ExpandableSection
          expanded={expanded}
          sectionHeader={
            <Text grey10 text70>
              {meal.name}
            </Text>
          }
          onPress={() => setExpanded(!expanded)}
        >
          <Text text70 style={{ height: 70 }}></Text>
        </ExpandableSection>
      </View>
    </Drawer>
  );
}
