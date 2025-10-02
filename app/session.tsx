// Skärm för att visa Session-information.

import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { scheduleEndNotification } from '../lib/notifications';
import { useCountdown } from '../hooks/useCountdown';
import { openSystemFocusSettings } from '../lib/intents';
import { SessionProfile } from '../types/session';


export default function SessionScreen() {
    const params = useLocalSearchParams<{ profile?: string | string[] }>();
    const raw = Array.isArray(params.profile) ? params.profile[0] : params.profile;

    const profile: SessionProfile | null = useMemo(() => {
        try {
            return raw ? (JSON.parse(String(raw)) as SessionProfile) : null;
        } catch {
            return null;
        }
    }, [raw]);


    const [sessionActive, setSessionActive] = useState<boolean>(!!profile);
    const [sessionEndsAt, setSessionEndsAt] = useState<number | null>(
        profile ? Date.now() + profile.focusMin * 60 * 1000 : null
    );
    const { remainingStr } = useCountdown(sessionActive, sessionEndsAt);


    useEffect(() => {
        if (!profile) return;
        (async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if (profile.openSettingsShortcut) openSystemFocusSettings();
            await scheduleEndNotification(profile.focusMin * 60);
        })();
    }, [profile]);


    async function endSession() {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setSessionActive(false);
        setSessionEndsAt(null);
        router.back();
    }


    if (!profile) {
        return (
            <View style={{ flex: 1, backgroundColor: '#0B0E13', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Ingen session hittades</Text>
                <Pressable
                    onPress={() => router.back()}
                    style={({ pressed }) => ({
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderRadius: 12,
                        backgroundColor: pressed ? '#3B82F6' : '#2563EB',
                    })}
                >
                    <Text style={{ color: 'white', fontWeight: '800' }}>Tillbaka</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#0B0E13', paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 24 }}>
                {profile.name}
            </Text>

            <View
                accessibilityRole="text"
                style={{
                    width: 240,
                    height: 240,
                    borderRadius: 120,
                    borderWidth: 4,
                    borderColor: '#2563EB',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <Text style={{ color: '#C9CDD6', fontSize: 56, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
                    {remainingStr}
                </Text>
            </View>

            <Text style={{ color: '#9AA2B2', textAlign: 'center', marginBottom: 24 }}>
                Lås skärmen och lägg undan störmoment. Vi pingar när det är dags för paus.
            </Text>

            <Pressable
                onPress={endSession}
                style={({ pressed }) => ({
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 12,
                    alignItems: 'center',
                    backgroundColor: pressed ? '#F87171' : '#EF4444',
                })}
            >
                <Text style={{ color: 'white', fontWeight: '800' }}>Avbryt</Text>
            </Pressable>
        </View>
    );
}

