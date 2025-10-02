import * as SecureStore from 'expo-secure-store';
import { SessionProfile } from '../types/session';


const KEY = 'studiero_profiles_v1';


export async function loadProfiles(): Promise<SessionProfile[]> {
    const raw = await SecureStore.getItemAsync(KEY);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
}


export async function saveProfiles(p: SessionProfile[]) {
    await SecureStore.setItemAsync(KEY, JSON.stringify(p));
}