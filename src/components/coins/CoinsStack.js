import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinsDetailScreen from '../coinDetail/CoinsDetailScreen';
import Colors from '../../utils/colors';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
        shadowColor: Colors.blackPearl,
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="Detail" component={CoinsDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
