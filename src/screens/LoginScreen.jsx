import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import FormTextField from '../components/FormTextField';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import axiosInstance from '../utils/axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  //   console.log(process.env.API_URL);
  const handleLogin = async () => {
    console.log('111111111111111111111111');
    setErrors({});
    try {
      console.log('2222222222222222222222');
      const {data} = await axiosInstance.post('login', {
        email,
        password,
      });
      console.log('res.data-------', data);

      const {data: profile} = await axiosInstance.get('/profile', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      console.log('profile-------', profile);
    } catch (e) {
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
      console.log('e.response.data', e.response.data);
      Toast.show({type: 'error', text1: e.response.data.message});
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <FormTextField
          label="Email address"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          errors={errors?.email}
        />
        <FormTextField
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          errors={errors?.password}
        />

        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {backgroundColor: '#fff', flex: 1},
  container: {padding: 20, rowGap: 16},
});
