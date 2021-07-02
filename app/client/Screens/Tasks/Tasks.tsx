import ProgressBar from "../Root/ProgressBar";
import TaskSummary from "./TaskSummary";
import HabitSummary from "./HabitSummary";
import React, { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";

const Tasks = () => {
  const bgImage = require("../../../assets/blue-gradient.png");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttons = ["Tasks", "Habits"];

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <ProgressBar />
      <SafeAreaView>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{
            height: 40,
            borderRadius: 10,
            borderColor: "#5c83b1",
            marginLeft: 40,
            marginRight: 40,
            marginTop: 20,
          }}
          selectedButtonStyle={{
            backgroundColor: "#5c83b1",
            borderColor: "#5c83b1",
          }}
          buttonStyle={{ backgroundColor: "#1D426D", borderColor: "#5c83b1" }}
          textStyle={{ fontSize: 16, color: "#ada6a6" }}
          innerBorderStyle={{ color: "#1D426D" }}
        />
        {selectedIndex === 0 ? <TaskSummary /> : <HabitSummary />}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  taskbarText: {
    fontSize: 18,
    color: "#1D426D",
  },
  taskbarView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
  },
});

export default Tasks;
