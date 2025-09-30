// Skapandet av en Session 

import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { SessionProfile } from '../types/session';
import { loadProfiles, saveProfiles } from '../lib/storage';


export default function CreateProfileModal() {
    const [profiles, setProfiles] = useState<SessionProfile[]>([]);
    const [name, setName] = useState('Plugga 45/5');
    const [focusMin, setFocusMin] = useState('45');
    const [breakMin, setBreakMin] = useState('5');
    const [openSettingsShortcut, setOpenSettingsShortcut] = useState(true);


    useEffect(() => { (async () => setProfiles(await loadProfiles()))(); }, []);


    async function addProfile() {
        const f = Math.max(1, parseInt(focusMin || '1', 10));
        const b = Math.max(0, parseInt(breakMin || '0', 10));
        const p: SessionProfile = { id: String(Date.now()), name: name.trim() || 'Ny profil', focusMin: f, breakMin: b, openSettingsShortcut };
        const next = [...profiles, p];
        setProfiles(next);
        await saveProfiles(next);
        router.back();
    }
}