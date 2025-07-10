import {SafeAreaView, StyleSheet} from 'react-native';
import Router from './routes/Router';
import './global.css';
import {FirestoreProvider} from './firestore/FirestoreContext';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import '../src/i18n/i18n';
import Toast from './components/Toast';
const App = () => {
  return (
    <Provider store={store}>
      <Toast />

      <FirestoreProvider>
        <SafeAreaView style={styles1.container}>
          <Router />
        </SafeAreaView>
      </FirestoreProvider>
    </Provider>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
