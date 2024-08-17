import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import FormTextField from '../components/FormTextField';
import Toast from 'react-native-toast-message';
import {loadProfile, login, register} from '../services/AuthService';
import AuthContext from '../../contexts/AuthContext';

const RegisterScreen = () => {
  const {setUser} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});

  console.log(process.env.API_URL);
  const handleRegister = async ({navigation}) => {
    console.log('111111111111111111111111');
    setErrors({});
    try {
      console.log('2222222222222222222222');
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const profile = await loadProfile();
      console.log('profile-------', profile);

      setUser(profile);
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
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          errors={errors?.name}
        />
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
        <FormTextField
          label="Password confirmation"
          secureTextEntry={true}
          value={passwordConfirmation}
          onChangeText={text => setPasswordConfirmation(text)}
          errors={errors?.password_confirmation}
        />

        <Button title="Login" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  wrapper: {backgroundColor: '#fff', flex: 1},
  container: {padding: 20, rowGap: 16},
});
