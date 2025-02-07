import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/views/HomeScreen';
import AddProductScreen from './src/views/AddProductScreen';
import ProductDetailsScreen from './src/views/ProductDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddProduct' component={AddProductScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Detalhes do Produto" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;