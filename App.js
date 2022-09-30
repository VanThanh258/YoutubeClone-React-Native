import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import store from './src/store';
import {Provider} from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
      <Navigation/>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },
});
