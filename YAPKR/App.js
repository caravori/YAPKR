import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Navigator from "./view/Navigator";
import {ContextProvider} from "./components/Context";
import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  return (
      <>
          <StatusBar hidden={true} />
          <PaperProvider>
              <ContextProvider>
                  <Navigator />
              </ContextProvider>
          </PaperProvider>
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
