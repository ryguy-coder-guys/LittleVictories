import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Progress from "react-native-progress";
import { useUserContext } from "../../Contexts/userContext";

const ProgressBar = () => {
  const { user } = useUserContext();
  if (!user) {
    return <View></View>;
  }
  const { points, level, username } = user;
  return (
    <View style={styles.topNav}>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.toptext}>{username} </Text>
        <Text style={styles.text}>Level {level} </Text>
      </View>
      <Progress.Bar
        animated={true}
        indeterminateAnimationDuration={500}
        progress={points / 250}
        width={210}
        height={13}
        borderRadius={5}
        style={styles.progressBar}
      />
      <Text style={[styles.points]}> {user.points}/250</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  points: {
    color: "#FAFAFA",
    marginTop: 47,
  },
  progressBar: {
    marginBottom: 20,
    marginTop: 50,
    marginRight: 10,
    marginLeft: 10,
  },
  text: {
    color: "#FAFAFA",
  },
  topNav: {
    flexDirection: "row",
    backgroundColor: "#3E6592",
    width: "100%",
    height: "10%",
    justifyContent: "center",
  },
  toptext: {
    color: "#FAFAFA",
    marginTop: 40,
  },
});

export default ProgressBar;
