/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import Home from './views/Home.js';
import Usuario from './views/Usuario';
import CadastroNome from './views/Cadastro/CadastroNome';
import CadastroCpf from './views/Cadastro/CadastroCpf';
import CadastroRg from './views/Cadastro/CadastroRg';
import CadastroDataNasc from './views/Cadastro/CadastroDataNasc';
import CadastroMae from './views/Cadastro/CadastroMae';
import CadastroPai from './views/Cadastro/CadastroPai';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Usuario" component={Usuario} />
          <Stack.Screen name="Nome" component={CadastroNome} />
          <Stack.Screen name="CPF" component={CadastroCpf} />
          <Stack.Screen name="RG" component={CadastroRg} />
          <Stack.Screen name="DataNasc" component={CadastroDataNasc} />
          <Stack.Screen name="Mae" component={CadastroMae} />
          <Stack.Screen name="Pai" component={CadastroPai} />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}
