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