import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { notificationManager } from './src/NotificationManager'

export default class App extends Component {
  constructor(props) {
    super(props);
      this.localNotify = null
      this.senderID = "77876047149"
  }

  componentDidMount() {
    this.localNotify = notificationManager
    this.localNotify.configure(this.onRegister, this.onNotification, this.onOpenNotification, this.senderID)
  }

  onRegister(token) {
    console.log("[Notification] Registered: ", token);
  }

  onNotification(notify) {
    console.log("[Notification] onNotification: ", notify);
  }

  onOpenNotification(notify) {
    console.log("[Notification] onOpenNotification: ", notify);
    alert("Open Notification " + notify.title)
  }

  onPressSendNotification = () => {
    this.localNotify.showNotification(
      1,
      "App Notification",
      "Local Notification",
      {},
      {}
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Push Notification App </Text>
        <TouchableOpacity style={styles.button} onPress= {this.onPressSendNotification}>
          <Text>Kirim lokal Notif</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    marginTop: 10
  }
})