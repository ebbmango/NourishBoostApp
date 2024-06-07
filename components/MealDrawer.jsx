// External dependencies
import { useState } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  Drawer,
  Colors,
  ExpandableSection,
} from "react-native-ui-lib";

// Components
import DeleteMealDialog from "./DeleteMealDialog";
import EditMealDialog from "./EditMealDialog";
import AngleDownIcon from "./icons/AngleDownIcon";
import AngleUpIcon from "./icons/AngleUpIcon";
import RotatingCaret from "./RotatingCaret";

export default function MealDrawer({ meal }) {
  const screenWidth = Dimensions.get("window").width;
  const [expanded, setExpanded] = useState(false);
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
  const [showEditDialogue, setShowEditDialogue] = useState(false);

  return (
    <>
      <DeleteMealDialog
        visible={showDeleteDialogue}
        setVisible={setShowDeleteDialogue}
        meal={meal}
      />
      <EditMealDialog
        visible={showEditDialogue}
        setVisible={setShowEditDialogue}
        meal={meal}
      />
      <Drawer
        rightItems={[
          {
            text: "Edit",
            background: Colors.yellow10,
            onPress: () => {
              setShowEditDialogue(true);
            },
          },
        ]}
        leftItem={{
          text: "Delete",
          background: Colors.red30,
          onPress: () => {
            setShowDeleteDialogue(true);
          },
        }}
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
            <Text text70 style={{ height: 70 }}></Text>
          </ExpandableSection>
        </View>
      </Drawer>
    </>
  );
}
