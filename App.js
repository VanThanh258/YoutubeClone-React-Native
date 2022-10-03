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
