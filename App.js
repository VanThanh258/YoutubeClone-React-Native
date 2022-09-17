import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import store from './src/store';
import {Provider} from 'react-redux'
export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
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
