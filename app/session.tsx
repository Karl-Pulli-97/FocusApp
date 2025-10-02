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
}