import * as SecureStore from 'expo-secure-store';
import { AppSettings } from '../types/settings';

const KEY = 'settings_v1';

const DEFAULTS: AppSettings = {
    soundEnabled: true,
    hapticsEnabled: true,
};

export async function loadSettings(): Promise<AppSettings> {
    const settings = await SecureStore.getItemAsync(KEY);
    if (!settings) return DEFAULTS;
    try { return { ...DEFAULTS, ...(JSON.parse(settings) as AppSettings) }; }
    catch { return DEFAULTS; }
}

export async function saveSettings(s: AppSettings) {
    await SecureStore.setItemAsync(KEY, JSON.stringify(s));
}