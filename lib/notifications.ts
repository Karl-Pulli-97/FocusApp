// Hantering av notifikationer.

import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});


export async function ensureNotifPermissions() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        const res = await Notifications.requestPermissionsAsync();
        if (res.status !== 'granted') {
            Alert.alert('Behörighet saknas', 'Tillåt notiser för påminnelser om fokus/paus.');
        }
    }
}


export async function scheduleEndNotification(seconds: number) {
    const TimeIntervalType =
        (Notifications as any).SchedulableTriggerInputTypes?.TIME_INTERVAL ??
        (Notifications as any).ScheduledTriggerInputTypes?.TIME_INTERVAL ??
        (Notifications as any).NotificationTriggerInputTypes?.TIME_INTERVAL;

    const trigger: Notifications.TimeIntervalTriggerInput = {
        type: TimeIntervalType,
        seconds,
        repeats: false,
    } as Notifications.TimeIntervalTriggerInput;


    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
        content: { title: 'Fokus klart', body: 'Dags för paus! Bra jobbat.' },
        trigger,
    });
}