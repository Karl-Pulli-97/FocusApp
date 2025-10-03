import * as SecureStore from 'expo-secure-store';
import { SessionProfile } from '../types/session';


const KEY = 'studiero_profiles_v1';


export async function loadProfiles(): Promise<SessionProfile[]> {
    const profile = await SecureStore.getItemAsync(KEY);
    if (!profile) return [];
    try { return JSON.parse(profile); } catch { return []; }
}


export async function saveProfiles(p: SessionProfile[]) {
    await SecureStore.setItemAsync(KEY, JSON.stringify(p));
}

const ACTIVE_KEY = 'studiero_active_session_v1';

export type ActiveSession = {
    profile: SessionProfile;
    phase: 'focus' | 'break';
    endsAt: number;
};

export async function saveActiveSession(s: ActiveSession) {
    await SecureStore.setItemAsync(ACTIVE_KEY, JSON.stringify(s));
}

export async function loadActiveSession(): Promise<ActiveSession | null> {
    const raw = await SecureStore.getItemAsync(ACTIVE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as ActiveSession; } catch { return null; }
}

export async function clearActiveSession() {
    await SecureStore.deleteItemAsync(ACTIVE_KEY);
}