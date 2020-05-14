import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class NotificationManager {
    configure = (onRegister, onNotification, onOpenNotification, senderID) => {
        PushNotification.configure({
            onRegister: function (token) {
                onRegister(token.token)
                console.log("[NotificationManager] TOKEN:", token.token);
            },

            onNotification: function (notification) {
                console.log("[NotificationManager] onNotification:", notification);

                if (Platform.OS === 'ios') {
                    if (notification.data.openedInForeground) {
                        notification.userInteraction = true
                    }
                } else {
                    notification.userInteraction = true
                } 

                if (notification.userInteraction) {
                    onOpenNotification(notification)
                } else {
                    onNotification(notification)
                }

                if (Platform.OS === 'ios') {
                    if (!notification.data.openedInForeground) {
                        notification.finish('backgroundFetchResultNoData')
                    }
                } else {
                    notification.finish('backgroundFetchResultNoData')
                }
            },

            senderID: "77876047149"
        })
    }

    _buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_laucher",
            smallIcon: options.smallIcon || "ic_laucher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            prioriry: options.prioriry || "high",
            importance: options.importance || "high",
            data: data
        }
    }

    _buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || "view",
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    showNotification = (id, title, message, data = {}, options = {}) => {   
        PushNotification.localNotification({
            ...this._buildAndroidNotification(id, message, title, data, options),
            ...this._buildIOSNotification(id, title, message, data, options),
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || "default",
            userInteraction: false
        })
    }

    unregister = () => {
        PushNotification.unregister()
    }
}

export const notificationManager = new NotificationManager()