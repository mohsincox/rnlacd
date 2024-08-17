import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import AuthContext from '../../contexts/AuthContext';
import {logout} from '../services/AuthService';

const HomeScreen = () => {
  const {user, setUser} = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };
  return (
    <SafeAreaView>
      <Text>Welcome home, {user?.user?.name}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
