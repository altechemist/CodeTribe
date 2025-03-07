import { registerRootComponent } from 'expo';

import { store } from './store/store'
import { Provider } from 'react-redux'

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
