import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Navigator from "./view/Navigator";


export default function App() {
  return (
      <>
        <StatusBar hidden={true}/>
        <SafeAreaView/>
        <Navigator/>
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
