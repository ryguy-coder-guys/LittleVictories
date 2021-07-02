import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { useUserContext } from "../../Contexts/userContext";
import axios from "axios";
import Loading from "../Root/Loading";
import { v4 as getKey } from "uuid";
import { format } from "date-fns";
import FaceIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressBar from "../Root/ProgressBar";

const Home = () => {
  const { user, userStats } = useUserContext();
  const bgImage = require("../../../assets/blue-gradient.png");
  const [sleepHours, setSleepHours] = useState("");
  const [didEatWell, setDidEatWell] = useState("");
  const [didExercise, setDidExercise] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [activeIcon, setActiveIcon] = useState(null);

  const submitStats = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/stats", {
        user_id: user.id,
        sleep_hours: sleepHours,
        eaten_well: didEatWell === "yes",
        exercised: didExercise === "yes",
        notes: notes,
        mood: mood,
        date: format(new Date(), "MM-dd-yyyy"),
      });
    } catch (err) {
      console.warn("had issues posting stats (client)");
    }
  };

  const handleSubmit = () => {
    submitStats();
    setHasSubmitted(true);
  };

  const handleFace = (value) => {
    setMood(value);
    setActiveIcon(value);
  };

  const getIcon = (mood) => {
    const icons = {
      great: "emoticon-excited-outline",
      good: "emoticon-happy-outline",
      ok: "emoticon-neutral-outline",
      bad: "emoticon-sad-outline",
      terrible: "emoticon-angry-outline",
    };
    return <FaceIcon name={icons[mood]} size={35} color="#FAFAFA" />;
  };

  if (!user) {
    return <Loading />;
  }
  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <ProgressBar />
      <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <ScrollView>
          <View style={styles.view}>
            <Text style={styles.heading}>Upcoming Tasks</Text>
            {user.tasks?.slice(0, 5).map((task) => {
              return (
                <View style={styles.task} key={getKey()}>
                  <Text style={styles.desc}>
                    {task.description} - {task.due_date}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.view}>
            <Text style={styles.heading}>Daily Reflection</Text>
            {hasSubmitted || userStats ? (
              <View>
                <Text style={styles.text}>
                  Fill out your Daily Reflection data tomorrow for the most
                  accurate Weekly Stats.
                </Text>
                <Text style={styles.subheader}>Today's Data:</Text>
                <Text style={styles.text}>
                  Hours of sleep: {userStats?.sleep_hours || sleepHours}
                </Text>
                <Text style={styles.text}>
                  Did you eat well?{" "}
                  {userStats?.eaten_well ? "yes" : "no" || didEatWell}
                </Text>
                <Text style={styles.text}>
                  Exercised?{" "}
                  {userStats?.exercised ? "yes" : "no" || didExercise}
                </Text>
                <Text style={styles.text}>
                  Notes: {userStats?.notes || notes}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Mood: </Text>
                  {userStats?.mood ? getIcon(userStats?.mood) : getIcon(mood)}
                </View>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.prompt}>
                  How many hours did you sleep last night?
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setSleepHours}
                  value={sleepHours}
                  placeholder="Enter 0 - 24"
                  autoCapitalize="none"
                />
                <Text style={styles.prompt}>Did you skip any meals?</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setDidEatWell}
                  value={didEatWell}
                  placeholder="yes or no"
                  autoCapitalize="none"
                />
                <Text style={styles.prompt}>Did you get any exercise?</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setDidExercise}
                  value={didExercise}
                  placeholder="yes or no"
                  autoCapitalize="none"
                />
                <Text style={styles.prompt}>Daily Notes</Text>
                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.multi_input}
                    multiline
                    numberOfLines={4}
                    value={notes}
                    maxLength={250}
                    onChangeText={setNotes}
                    editable={true}
                    placeholder="Enter notes here."
                  />
                </View>
                <Text style={styles.prompt}>What's your mood?</Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <FaceIcon
                    name="emoticon-angry-outline"
                    onPress={() => handleFace("terrible")}
                    size={35}
                    style={
                      activeIcon === "terrible"
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <FaceIcon
                    name="emoticon-sad-outline"
                    onPress={() => handleFace("bad")}
                    size={35}
                    style={
                      activeIcon === "bad"
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <FaceIcon
                    name="emoticon-neutral-outline"
                    onPress={() => handleFace("ok")}
                    size={35}
                    style={
                      activeIcon === "ok"
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <FaceIcon
                    name="emoticon-happy-outline"
                    onPress={() => handleFace("good")}
                    size={35}
                    style={
                      activeIcon === "good"
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <FaceIcon
                    name="emoticon-excited-outline"
                    onPress={() => handleFace("great")}
                    size={35}
                    style={
                      activeIcon === "great"
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                </View>
                <AwesomeButton
                  backgroundColor={"#1D426D"}
                  textColor={"#FAFAFA"}
                  height={35}
                  width={100}
                  raiseLevel={0}
                  borderRadius={8}
                  style={styles.button}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </AwesomeButton>
              </View>
            )}
          </View>
          <View style={styles.view}>
            <Text style={styles.heading}>Weekly Stats</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.heading}>Achievements</Text>
            {user.level >= 1 ? (
              <View
                style={{
                  height: 100,
                  width: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/badge.png")}
                  style={{ resizeMode: "contain", width: "50%", height: "50%" }}
                />
                <Text style={{ color: "#1D426D", fontSize: 16 }}>Level 1</Text>
              </View>
            ) : null}
            {user.level >= 5 ? (
              <View
                style={{
                  height: 100,
                  width: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/badge.png")}
                  style={{ resizeMode: "contain", width: "50%", height: "50%" }}
                />
                <Text style={{ color: "#1D426D", fontSize: 16 }}>Level 5</Text>
              </View>
            ) : null}
            {user.level >= 10 ? (
              <View
                style={{
                  height: 100,
                  width: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/badge.png")}
                  style={{ resizeMode: "contain", width: "50%", height: "50%" }}
                />
                <Text style={{ color: "#1D426D", fontSize: 16 }}>Level 10</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  desc: {
    color: "#1D426D",
    fontSize: 18,
  },
  heading: {
    color: "#1D426D",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  activeIcon: {
    color: "#FAFAFA",
  },
  inactiveIcon: {
    color: "#9b9a9a",
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#9ec5cf",
    color: "#1D426D",
    padding: 10,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  multi_input: {
    borderRadius: 10,
    backgroundColor: "#9ec5cf",
    color: "#1D426D",
    padding: 10,
    paddingTop: 10,
    maxWidth: "100%",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  task: {
    paddingTop: 10,
  },
  prompt: {
    alignSelf: "flex-start",
    color: "#1D426D",
    marginTop: 10,
    fontSize: 18,
  },
  subheader: {
    color: "#1D426D",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  text: {
    color: "#1D426D",
    fontSize: 18,
    marginTop: 10,
  },
  view: {
    backgroundColor: "#8ebac6",
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    padding: 20,
  },
});
export default Home;
