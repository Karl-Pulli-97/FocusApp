import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Switch } from 'react-native';
import { router } from 'expo-router';
import { SessionProfile } from '../types/session';
import { loadProfiles, saveProfiles } from '../lib/storage';


export default function CreateProfileModal() {
    const [profiles, setProfiles] = useState<SessionProfile[]>([]);
    const [name, setName] = useState("");
    const [focusMin, setFocusMin] = useState("");
    const [breakMin, setBreakMin] = useState("");
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


    return (
        <View style={{ flex: 1, paddingTop: 56, paddingHorizontal: 16 }}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '800', marginBottom: 12 }}>Ny profil</Text>


            <View style={{ backgroundColor: '#111827', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10 }}>
                <TextInput
                    placeholder="Namn"
                    placeholderTextColor="#6B7280"
                    value={name}
                    onChangeText={setName}
                    style={{ color: 'white' }}
                />
            </View>


            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <View style={{ flex: 1, backgroundColor: '#111827', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 }}>
                    <TextInput
                        placeholder="Fokus (min)"
                        placeholderTextColor="#6B7280"
                        keyboardType="number-pad"
                        value={focusMin}
                        onChangeText={setFocusMin}
                        style={{ color: 'white' }}
                    />
                </View>
                <View style={{ flex: 1, backgroundColor: '#111827', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 }}>
                    <TextInput
                        placeholder="Paus (min)"
                        placeholderTextColor="#6B7280"
                        keyboardType="number-pad"
                        value={breakMin}
                        onChangeText={setBreakMin}
                        style={{ color: 'white' }}
                    />
                </View>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={{ color: '#C9CDD6' }}>Öppna DND/Inställningar vid start</Text>
                <Switch value={openSettingsShortcut} onValueChange={setOpenSettingsShortcut} />
            </View>


            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable onPress={addProfile} style={({ pressed }) => ({ flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center', backgroundColor: pressed ? '#10B981' : '#059669' })}>
                    <Text style={{ color: 'white', fontWeight: '800' }}>Spara</Text>
                </Pressable>
                <Pressable onPress={() => router.back()} style={({ pressed }) => ({ flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center', backgroundColor: pressed ? '#bb4b4bff' : '#ad3535ff' })}>
                    <Text style={{ color: 'white', fontWeight: '800' }}>Avbryt</Text>
                </Pressable>
            </View>
        </View>
    );
}