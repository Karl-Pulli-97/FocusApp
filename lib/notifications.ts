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


function timeIntervalType(): Notifications.TimeIntervalTriggerInput['type'] {
    return (
        (Notifications as any).SchedulableTriggerInputTypes?.TIME_INTERVAL ??
        (Notifications as any).ScheduledTriggerInputTypes?.TIME_INTERVAL ??
        (Notifications as any).NotificationTriggerInputTypes?.TIME_INTERVAL ??
        'timeInterval'
    );
}

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
    const trigger: Notifications.TimeIntervalTriggerInput = {
        type: timeIntervalType(),
        seconds,
        repeats: false,
    };

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
        content: { title: 'Fokus klart', body: 'Dags för paus! Bra jobbat.' },
        trigger,
    });
}

export async function scheduleBreakEndNotification(seconds: number) {
    const trigger: Notifications.TimeIntervalTriggerInput = {
        type: timeIntervalType(),
        seconds,
        repeats: false,
    };

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
        content: { title: 'Paus klar', body: 'Dags att fokusera igen!' },
        trigger,
    });
}