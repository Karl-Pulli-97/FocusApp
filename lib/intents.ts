import { Platform, Linking } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';


export function openSystemFocusSettings() {
    if (Platform.OS === 'android') {
        try {
            IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.NOTIFICATION_POLICY_ACCESS_SETTINGS);
        } catch {
            IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APP_NOTIFICATION_SETTINGS);
        }
    } else {
        Linking.openSettings();
    }
}