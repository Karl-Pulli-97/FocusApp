import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Switch } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SessionProfile } from '../../types/session';
import { ensureNotifPermissions } from '../../lib/notifications';
import { loadProfiles, saveProfiles } from '../../lib/storage';


export default function HomeScreen() {
    const [profiles, setProfiles] = useState<SessionProfile[]>([]);
    const [loading, setLoading] = useState(true);


    const refresh = useCallback(async () => {
        const p = await loadProfiles();
        if (p.length === 0) {
            const seed: SessionProfile = { id: String(Date.now()), name: 'Standard', focusMin: 50, breakMin: 10, openSettingsShortcut: true };
            await saveProfiles([seed]);
            setProfiles([seed]);
        } else setProfiles(p);
    }, []);


    useEffect(() => {
        (async () => {
            await ensureNotifPermissions();
            await refresh();
            setLoading(false);
        })();
    }, []);


    useFocusEffect(useCallback(() => {
        refresh();
    }, [refresh]));


    async function deleteProfile(id: string) {
        const next = profiles.filter(p => p.id !== id);
        setProfiles(next);
        await saveProfiles(next);
    }


    function start(profile: SessionProfile) {
        router.push({ pathname: '/session', params: { profile: JSON.stringify(profile) } });
    }


    const renderItem = ({ item }: { item: SessionProfile }) => (
        <View style={{ padding: 12, borderRadius: 12, backgroundColor: '#015d8bff', marginVertical: 6, gap: 8 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
            <Text style={{ color: '#C9CDD6' }}>{item.focusMin} min Fokus • {item.breakMin} min Paus</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ color: '#C9CDD6' }}>Tysta appar</Text>
                    <Switch value={item.openSettingsShortcut} onValueChange={async (v) => {
                        const next = profiles.map(p => p.id === item.id ? { ...p, openSettingsShortcut: v } : p);
                        setProfiles(next);
                        await saveProfiles(next);
                    }} />
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Pressable onPress={() => start(item)} style={({ pressed }) => ({ paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, backgroundColor: pressed ? '#3B82F6' : '#2563EB' })}>
                        <Text style={{ color: 'white', fontWeight: '700' }}>Starta</Text>
                    </Pressable>
                    <Pressable onLongPress={() => deleteProfile(item.id)} style={({ pressed }) => ({ paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, backgroundColor: pressed ? '#272B33' : '#1F232A' })}>
                        <Text style={{ color: '#E87979', fontWeight: '700' }}>Ta bort</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );


    return (
        <View style={{ flex: 1, backgroundColor: '#014a6eff', paddingTop: 56, paddingHorizontal: 16 }}>
            <Text style={{ color: '#2b9dd6ff', textShadowColor: '#68c3eeff', textShadowOffset: { width: 2, height: 0 }, textShadowRadius: 1, fontSize: 45, fontWeight: '800', marginBottom: 12, }}>Mindful Minnow</Text>
            <Text style={{ color: '#aeb4beff', marginBottom: 8 }}>Välj en profil och starta en fokussession. Håll ner “Ta bort” för att radera.</Text>


            <Pressable onPress={() => router.push('/modal')} style={({ pressed }) => ({ alignSelf: 'flex-start', marginBottom: 10, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, backgroundColor: pressed ? '#10B981' : '#059669' })}>
                <Text style={{ color: 'white', fontWeight: '700' }}>+ Ny profil</Text>
            </Pressable>


            {
                loading ? (
                    <Text style={{ color: '#C9CDD6' }}>Laddar…</Text>
                ) : (
                    <FlatList
                        data={profiles}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    />
                )
            }
        </View >
    );
}