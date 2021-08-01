import React, { ReactElement, useState } from 'react';
import { Text, View, TextInput, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { useUserContext } from '../../Contexts/userContext';
import { useSocketContext } from '../../Contexts/socketContext';
import axios from 'axios';
import {
  btnStyles,
  containerStyles,
  inputStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import bgImage from '../../../assets/images/blue-gradient.png';
import logo from '../../../assets/logo.png';

const Login = ({ navigation }): ReactElement => {
  const { setUser, setUserStat, setIsLoggedIn } = useUserContext();
  const { socket } = useSocketContext();
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
        'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/auth/login',
        {
          username,
          password: passwordAttempt
        }
      );
      if (userObj) {
        // if successful navigate to home
        setTimeout(() => {
          setUser(userObj);
          setIsLoggedIn(true);
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
        'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/auth/register',
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
          'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/auth/login',
          {
            username,
            password: passwordAttempt
          }
        );
        if (userObj) {
          setTimeout(() => {
            setUser(userObj);
            setIsLoggedIn(true);
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
    <ImageBackground style={containerStyles.bgImg} source={bgImage}>
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
                buttonStyle={btnStyles.btn_login}
                titleStyle={{ color: '#FAFAFA', fontSize: 20 }}
                onPress={() => {
                  handleClick('login');
                }}
              />
              <Button
                title='Register'
                buttonStyle={[
                  btnStyles.btn_login,
                  { backgroundColor: '#1D426D' }
                ]}
                titleStyle={{ color: '#FAFAFA', fontSize: 20 }}
                onPress={() => {
                  handleClick('register');
                }}
              />
            </View>
            <Text style={textStyles.txt_big}>Username</Text>
            <TextInput
              style={inputStyles.input_login}
              onChangeText={setUsername}
              value={username}
              autoCapitalize='none'
            />
            <Text style={textStyles.txt_big}>Password</Text>
            <TextInput
              style={inputStyles.input_login}
              onChangeText={setPasswordAttempt}
              value={passwordAttempt}
              secureTextEntry={true}
              autoCapitalize='none'
            />
            <Button
              title='Submit'
              buttonStyle={[
                btnStyles.btn_login,
                { backgroundColor: '#1D426D' }
              ]}
              titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
              onPress={() => {
                void handleLogin();
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
                buttonStyle={[
                  btnStyles.btn_login,
                  { backgroundColor: '#1D426D' }
                ]}
                titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
                onPress={() => {
                  handleClick('login');
                }}
              />
              <Button
                title='Register'
                buttonStyle={[
                  btnStyles.btn_login,
                  { backgroundColor: '#5c83b1' }
                ]}
                titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
                onPress={() => {
                  handleClick('register');
                }}
              />
            </View>
            <Text style={textStyles.txt_big}>Username</Text>
            <TextInput
              style={inputStyles.input_login}
              onChangeText={setUsername}
              value={username}
              autoCapitalize='none'
            />
            <Text style={textStyles.txt_big}>Password</Text>
            <TextInput
              style={inputStyles.input_login}
              onChangeText={setPasswordAttempt}
              value={passwordAttempt}
              secureTextEntry={true}
              autoCapitalize='none'
            />
            <Text style={textStyles.txt_big}>Confirm Password</Text>
            <TextInput
              style={inputStyles.input_login}
              onChangeText={setPasswordAttempt2}
              value={passwordAttempt2}
              secureTextEntry={true}
              autoCapitalize='none'
            />
            <Button
              title='Submit'
              buttonStyle={[
                btnStyles.btn_login,
                { backgroundColor: '#1D426D' }
              ]}
              titleStyle={{ color: '#FAFAFA', fontSize: 18 }}
              onPress={() => {
                void handleLogin();
              }}
            />
          </>
        </View>
      )}
    </ImageBackground>
  );
};

export default Login;
