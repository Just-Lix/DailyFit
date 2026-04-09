import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { auth } from './FirebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './loginstyle';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const buttonAnimation = useRef(new Animated.Value(1)).current;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '188334463182-bfl4mhh1c3t4lhc0v598hg9i99m9el10.apps.googleusercontent.com',
    expoClientId: '188334463182-bfl4mhh1c3t4lhc0v598hg9i99m9el10.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert('Success', 'Logged in with Google');
          navigation.replace('Home');
        })
        .catch((error) => {
          console.error('Google Sign-In Error:', error);
          Alert.alert('Error', 'Failed to sign in with Google');
        });
    }
  }, [response]);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and Password are required');
      return;
    }

    animateButton();

    const authMethod = isSignup
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;

    authMethod(auth, email, password)
      .then(() => {
        Alert.alert('Success', isSignup ? 'Account created' : 'Logged in');
        navigation.replace('Home');
      })
      .catch((error) => {
        console.error('Authentication Error:', error);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Animated.View style={{ transform: [{ scale: buttonAnimation }] }}>
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isSignup ? 'Create Account' : 'Log In'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.switchText}>
          {isSignup ? 'Already have an account? Log In!' : 'New user? Sign Up!'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => promptAsync()}
        disabled={!request}
        style={styles.googleButton}
      >
        <MaterialCommunityIcons name="google" size={24} color="#EA4335" />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
