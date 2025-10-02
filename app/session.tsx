import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { scheduleEndNotification, scheduleBreakEndNotification } from '../lib/notifications';
import { useCountdown } from '../hooks/useCountdown';
import { openSystemFocusSettings } from '../lib/intents';
import { SessionProfile } from '../types/session';

type Phase = 'focus' | 'break';

export default function SessionScreen() {
    const params = useLocalSearchParams<{ profile?: string | string[] }>();
    const raw = Array.isArray(params.profile) ? params.profile[0] : params.profile;

    const profile: SessionProfile | null = useMemo(() => {
        try { return raw ? (JSON.parse(String(raw)) as SessionProfile) : null; } catch { return null; }
    }, [raw]);


    const [phase, setPhase] = useState<Phase>('focus');
    const [sessionActive, setSessionActive] = useState<boolean>(!!profile);
    const [sessionEndsAt, setSessionEndsAt] = useState<number | null>(
        profile ? Date.now() + profile.focusMin * 60 * 1000 : null
    );
    const { remainingMs, remainingStr } = useCountdown(sessionActive, sessionEndsAt);


    useEffect(() => {
        if (!profile) return;
        (async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if (profile.openSettingsShortcut) openSystemFocusSettings();
            await scheduleEndNotification(profile.focusMin * 60);
        })();
    }, [profile]);

    useEffect(() => {
        if (!profile || !sessionActive) return;
        if (remainingMs > 0) return;

        (async () => {
            if (phase === 'focus' && profile.breakMin > 0) {
                setPhase('break');
                const breakEnds = Date.now() + profile.breakMin * 60 * 1000;
                setSessionEndsAt(breakEnds);
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                await scheduleBreakEndNotification(profile.breakMin * 60);
            } else {
                await endSession();
            }
        })();
    }, [remainingMs]);


    async function endSession() {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setSessionActive(false);
        setSessionEndsAt(null);
        router.back();
    }

    async function skipBreak() {
        await endSession();
    }

    if (!profile) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
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

    const circleColor = phase === 'focus' ? '#4c90dfff' : '#10B981';
    const phaseLabel = phase === 'focus' ? 'Fokus' : 'Paus';

    return (
        <View style={{ flex: 1, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ color: 'white', fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 24 }}>
                {profile.name}
            </Text>

            <View
                style={{
                    width: 240,
                    height: 240,
                    borderRadius: 120,
                    borderWidth: 4,
                    borderColor: circleColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <Text style={{ color: '#C9CDD6', fontSize: 56, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
                    {remainingStr}
                </Text>
                <Text style={{ color: '#9AA2B2', marginTop: 6 }}>{phaseLabel}</Text>
            </View>

            {phase === 'focus' ? (
                <Text style={{ color: '#9AA2B2', textAlign: 'center', marginBottom: 24 }}>
                    Lås skärmen och lägg undan störmoment. Vi pingar när det är dags för paus.
                </Text>) : <Text style={{ color: '#9AA2B2', textAlign: 'center', marginBottom: 24 }}>
                Bra jobbat! Pausa och starta en ny session när du är redo.
            </Text>}

            <View style={{ flexDirection: 'row', gap: 12 }}>
                {phase === 'break' ? (
                    <Pressable
                        onPress={skipBreak}
                        style={({ pressed }) => ({
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            alignItems: 'center',
                            backgroundColor: pressed ? '#0EA5E9' : '#0284C7',
                        })}
                    >
                        <Text style={{ color: 'white', fontWeight: '800' }}>Hoppa över paus</Text>
                    </Pressable>
                ) : null}

                <Pressable
                    onPress={endSession}
                    style={({ pressed }) => ({
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                        backgroundColor: pressed ? '#F87171' : '#EF4444',
                    })}
                >
                    <Text style={{ color: 'white', fontWeight: '800' }}>Avbryt</Text>
                </Pressable>
            </View>
        </View>
    );
}