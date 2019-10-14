import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner, CardSection} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {loggedIn: null};

  componentDidMount() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyBPoLkNJUVqt9EW1DyLoGgL6LxO9sEfHic',
      authDomain: 'auth-ded43.firebaseapp.com',
      databaseURL: 'https://auth-ded43.firebaseio.com',
      projectId: 'auth-ded43',
      storageBucket: 'auth-ded43.appspot.com',
      messagingSenderId: '938318826372',
      appId: '1:938318826372:web:8d92e5ce4944ee84eaabd1',
      measurementId: 'G-05BY1VYGM5',
    };
    // Initialize Firebase
    console.log(
      `In componentDidMount firebase.app.length: ${firebase.apps.length}`,
    );
    if (!firebase.apps.length) {
      console.log('Before initializing firebase');
      firebase.initializeApp(firebaseConfig);
    }

    // Providing an event handler for both user signing in and signing out
    // user is an object when a user is signed in
    // user is a null when a user is signed out
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
