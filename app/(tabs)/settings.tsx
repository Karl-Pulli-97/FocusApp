import React, { useEffect, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { loadSettings, saveSettings } from '../../lib/settings';
import { setNotificationSoundEnabled } from '../../lib/notifications';
import { AppSettings } from '../../types/settings';

export default function SettingsScreen() {
    const [s, setS] = useState<AppSettings>({ soundEnabled: true, hapticsEnabled: true });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { (async () => { setS(await loadSettings()); setLoaded(true); })(); }, []);

    async function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
        const next = { ...s, [key]: value };
        setS(next);
        await saveSettings(next);
        if (key === 'soundEnabled') setNotificationSoundEnabled(value as boolean);
    }

    if (!loaded) return <View style={{ flex: 1, padding: 16 }} />;

    return (
        <View style={{ flex: 1, backgroundColor: '#014a6eff', padding: 16, gap: 16 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>Inställningar</Text>

            <View style={{ backgroundColor: '#0f2236', borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '600' }}>Ljud (Notiser)</Text>
                <Switch value={s.soundEnabled} onValueChange={(v) => update('soundEnabled', v)} />
            </View>

            <View style={{ backgroundColor: '#0f2236', borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '600' }}>Vibration (Notiser)</Text>
                <Switch value={s.hapticsEnabled} onValueChange={(v) => update('hapticsEnabled', v)} />
            </View>

            <Text style={{ color: '#9AA2B2' }}>
                Ljudinställningen påverkar om notiser spelar ljud. Vibration används vid start/avslut av session.
            </Text>
        </View>
    );
}