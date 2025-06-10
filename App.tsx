import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfumeList from './components/PerfumeList';
import PerfumeForm from './components/PerfumeForm';

export type RootStackParamList = {
  Inventory: undefined;
  'Add Perfume': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inventory">
        <Stack.Screen name="Inventory" component={PerfumeList} />
        <Stack.Screen name="Add Perfume" component={PerfumeForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}