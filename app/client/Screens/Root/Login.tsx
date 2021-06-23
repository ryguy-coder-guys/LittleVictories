import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { useUserContext } from '../../Contexts/userContext';

const Login = ({ navigation }) => {
  const { user, setUser } = useUserContext();

  const bgImage = require('../../../assets/blue-gradient.png');
  const logo = require('../../../assets/logo.png');

  const [username, setUsername] = useState('');
  const [passwordAttempt, setPasswordAttempt] = useState('');
  const [loginSelected, toggleLogin] = useState(true);

  const handleClick = (view) => {
    if (view === 'login') {
      toggleLogin(true);
    } else {
      toggleLogin(false);
    }
  };

  const handleLogin = () => {
    console.log('username: ', username);
    console.log('password attempt: ', passwordAttempt);
  };

  // default view or if login btn is clicked
  if (loginSelected) {
    return (
      <ImageBackground style={styles.backgroundImage} source={bgImage}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <>
            <Image source={logo} />
            {/* <Button color='#FAFAFA' onPress={() => { navigation.navigate('index'); }} title="Enter" /> */}
            <View style={{ flexDirection: 'row' }}>
              <AwesomeButton
                backgroundColor={'#1D426D'}
                textColor={'#FAFAFA'}
                height={35}
                width={100}
                raiseLevel={0}
                borderRadius={8}
                style={styles.button}
                onPress={(next) => {
                  handleClick('login');
                  next();
                }}
              >
                Login
              </AwesomeButton>
              <AwesomeButton
                backgroundColor={'#1D426D'}
                textColor={'#FAFAFA'}
                height={35}
                width={100}
                raiseLevel={0}
                borderRadius={8}
                style={styles.button}
                onPress={(next) => {
                  handleClick('register');
                  next();
                }}
              >
                Register
              </AwesomeButton>
            </View>
            <Text style={styles.text}>Username:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              autoCapitalize="none"
            />
            <Text style={styles.text}>Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPasswordAttempt}
              value={passwordAttempt}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <AwesomeButton
              backgroundColor={'#1D426D'}
              textColor={'#FAFAFA'}
              height={35}
              width={100}
              raiseLevel={0}
              borderRadius={8}
              style={styles.button}
              value="register"
              onPress={(next) => {
                handleLogin();
                next();
              }}
            >
              Submit
            </AwesomeButton>
          </>
        </View>
      </ImageBackground>
    );
    // default view or if login btn is clicked
  } else {
    return (
      <ImageBackground style={styles.backgroundImage} source={bgImage}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <>
            <Image source={logo} />
            {/* <Button color='#FAFAFA' onPress={() => { navigation.navigate('index'); }} title="Enter" /> */}
            <View style={{ flexDirection: 'row' }}>
              <AwesomeButton
                backgroundColor={'#1D426D'}
                textColor={'#FAFAFA'}
                height={35}
                width={100}
                raiseLevel={0}
                borderRadius={8}
                style={styles.button}
                onPress={(next) => {
                  handleClick('login');
                  next();
                }}
              >
                Login
              </AwesomeButton>
              <AwesomeButton
                backgroundColor={'#1D426D'}
                textColor={'#FAFAFA'}
                height={35}
                width={100}
                raiseLevel={0}
                borderRadius={8}
                style={styles.button}
                onPress={(next) => {
                  handleClick('register');
                  next();
                }}
              >
                Register
              </AwesomeButton>
            </View>
            <Text style={styles.text}>Username:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              autoCapitalize="none"
            />
            <Text style={styles.text}>Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPasswordAttempt}
              value={passwordAttempt}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <AwesomeButton
              backgroundColor={'#1D426D'}
              textColor={'#FAFAFA'}
              height={35}
              width={100}
              raiseLevel={0}
              borderRadius={8}
              style={styles.button}
              value="register"
              onPress={(next) => {
                handleLogin();
                next();
              }}
            >
              Register
            </AwesomeButton>
          </>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '50%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    opacity: 0.3,
    marginBottom: 20,
  },
  text: {
    color: '#FAFAFA',
    marginBottom: 5,
  },
});

export default Login;
