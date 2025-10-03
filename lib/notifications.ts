import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { loadSettings } from './settings';

let soundEnabledCache = true;

export function setNotificationSoundEnabled(v: boolean) {
    soundEnabledCache = v;
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: soundEnabledCache,
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
    const s = await loadSettings();
    soundEnabledCache = s.soundEnabled;
}

async function schedule(content: Notifications.NotificationContentInput, seconds: number) {
    const trigger: Notifications.TimeIntervalTriggerInput = {
        type: timeIntervalType(),
        seconds,
        repeats: false,
    };
    await Notifications.scheduleNotificationAsync({ content, trigger });
}

export async function scheduleEndNotification(seconds: number) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await schedule({ title: 'Fokus klart', body: 'Dags för paus! Bra jobbat.' }, seconds);
}

export async function scheduleBreakEndNotification(seconds: number) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await schedule({ title: 'Paus klar', body: 'Dags att fokusera igen!' }, seconds);
}