import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { useUserContext } from '../../Contexts/userContext';
import { useSocketContext } from '../../Contexts/socketContext';
import axios from 'axios';
import { containerStyles } from '../../Stylesheets/Stylesheet';

const Login = ({ navigation }) => {
  const { setUser, setUserStat } = useUserContext();
  const { socket } = useSocketContext();
  const bgImage = require('../../../assets/images/blue-gradient.png');
  const logo = require('../../../assets/logo.png');
  const [username, setUsername] = useState('');
  const [passwordAttempt, setPasswordAttempt] = useState('');
  const [passwordAttempt2, setPasswordAttempt2] = useState('');
  const [loginSelected, toggleLogin] = useState(true);

  const handleClick = (view) => {
    if (view === 'login') {
      toggleLogin(true);
      setUsername('');
      setPasswordAttempt('');
    } else {
      toggleLogin(false);
      setUsername('');
      setPasswordAttempt('');
      setPasswordAttempt2('');
    }
  };

  const handleLogin = async () => {
    if (!username.length || !passwordAttempt.length) {
      return;
    }
    if (loginSelected) {
      // attempt a login for the user
      const { data: userObj } = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          username,
          password: passwordAttempt
        }
      );
      if (userObj) {
        // if successful navigate to home
        console.log(userObj);
        setTimeout(() => {
          setUser(userObj);
          setUserStat(userObj.userStat);
          navigation.navigate('index');
        }, 5000);
        setUsername('');
        setPasswordAttempt('');
        socket.emit('loggedIn', userObj.id);
        navigation.navigate('loading');
      } else {
        showMessage({
          message: 'Form Error',
          titleStyle: { fontSize: 18, color: '#FAFAFA' },
          description: 'Username/Password did not match an existing user.',
          textStyle: { fontSize: 20, color: '#FAFAFA' },
          icon: { icon: 'warning', position: 'left' },
          type: 'default',
          backgroundColor: '#fc9c94'
        });
      }
      // if on register page
    } else if (!loginSelected) {
      if (
        !username.length ||
        !passwordAttempt.length ||
        !passwordAttempt2.length ||
        passwordAttempt !== passwordAttempt2
      ) {
        if (passwordAttempt !== passwordAttempt2) {
          showMessage({
            message: 'Form Error',
            titleStyle: { fontSize: 18, color: '#FAFAFA' },
            description: 'Passwords did not match, please try again.',
            textStyle: { fontSize: 20, color: '#FAFAFA' },
            icon: { icon: 'warning', position: 'left' },
            type: 'default',
            backgroundColor: '#fc9c94'
          });
        }
        return;
      }
      const { data: user } = await axios.post(
        'http://localhost:3000/api/auth/register',
        {
          username,
          password: passwordAttempt
        }
      );
      // if you've successfully registered
      // compare the two passwords
      if (user) {
        // once a new user is created, send to login route
        const { data: userObj } = await axios.post(
          'http://localhost:3000/api/auth/login',
          {
            username,
            password: passwordAttempt
          }
        );
        if (userObj) {
          console.log(userObj);

          // if successful navigate to home
          setTimeout(() => {
            setUser(userObj);
            console.log(userObj.userStat);
            setUserStat(userObj.userStat);
            navigation.navigate('index');
          }, 5000);
          setUsername('');
          setPasswordAttempt('');
          setPasswordAttempt2('');
          socket.emit('loggedIn', userObj.id);
          navigation.navigate('loading');
          toggleLogin(true);
        }
      } else {
        showMessage({
          message: 'Form Error',
          titleStyle: { fontSize: 18, color: '#FAFAFA' },
          description: 'Username is already taken, please try again.',
          textStyle: { fontSize: 20, color: '#FAFAFA' },
          icon: { icon: 'warning', position: 'left' },
          type: 'default',
          backgroundColor: '#fc9c94'
        });
        setPasswordAttempt('');
        setPasswordAttempt2('');
        setUsername('');
      }
    }
  };

  // default view or if login btn is clicked
  return (
    <ImageBackground style={containerStyles.backgroundImage} source={bgImage}>
      {loginSelected ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <>
            <Image
              source={logo}
              style={{ resizeMode: 'contain', width: '50%', height: '25%' }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                title='Login'
                buttonStyle={styles.button}
                titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
                onPress={() => {
                  handleClick('login');
                }}
              />
              <Button
                title='Register'
                buttonStyle={[styles.button, { backgroundColor: '#1D426D' }]}
                titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
                onPress={() => {
                  handleClick('register');
                }}
              />
            </View>
            <Text style={styles.text}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              autoCapitalize='none'
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPasswordAttempt}
              value={passwordAttempt}
              secureTextEntry={true}
              autoCapitalize='none'
            />
            <Button
              title='Submit'
              buttonStyle={[styles.button, { backgroundColor: '#1D426D' }]}
              titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
              onPress={() => {
                handleLogin();
              }}
            />
          </>
        </View>
      ) : (
        // View if register button is clicked
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <>
            <Image
              source={logo}
              style={{ resizeMode: 'contain', width: '50%', height: '25%' }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                title='Login'
                buttonStyle={[styles.button, { backgroundColor: '#1D426D' }]}
                titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
                onPress={() => {
                  handleClick('login');
                }}
              />
              <Button
                title='Register'
                buttonStyle={[styles.button, { backgroundColor: '#5c83b1' }]}
                titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
                onPress={() => {
                  handleClick('register');
                }}
              />
            </View>
            <Text style={styles.text}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              autoCapitalize='none'
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPasswordAttempt}
              value={passwordAttempt}
              secureTextEntry={true}
              autoCapitalize='none'
            />
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPasswordAttempt2}
              value={passwordAttempt2}
              secureTextEntry={true}
              autoCapitalize='none'
            />
            <Button
              title='Submit'
              buttonStyle={[styles.button, { backgroundColor: '#1D426D' }]}
              titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
              onPress={() => {
                handleLogin();
              }}
            />
          </>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    backgroundColor: '#5c83b1',
    borderRadius: 8,
    height: 40,
    width: 100
  },
  input: {
    height: 40,
    width: '50%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    opacity: 0.3,
    marginBottom: 20
  },
  text: {
    color: '#FAFAFA',
    marginBottom: 5,
    fontSize: 18
  }
});

export default Login;
