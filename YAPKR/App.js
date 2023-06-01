import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Navigator from "./view/Navigator";
import {ContextProvider} from "./components/Context";


export default function App() {
  return (
      <>
          <StatusBar hidden={true} />
          <SafeAreaView style={{ flex: 1 }}>
              <ContextProvider>
                  <Navigator />
              </ContextProvider>
          </SafeAreaView>
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
