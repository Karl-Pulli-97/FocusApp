// Skärm för att visa Session-information.

import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { scheduleEndNotification } from '../lib/notifications';
import { useCountdown } from '../hooks/useCountdown';
import { openSystemFocusSettings } from '../lib/intents';
import { SessionProfile } from '../types/session';


export default function SessionScreen() {
    const { profile: profileParam } = useLocalSearchParams<{ profile: string }>();
    const profile: SessionProfile = JSON.parse(String(profileParam));


    const [sessionActive, setSessionActive] = useState(true);
    const [sessionEndsAt, setSessionEndsAt] = useState<number | null>(Date.now() + profile.focusMin * 60 * 1000);
    const { remainingStr } = useCountdown(sessionActive, sessionEndsAt);


    useEffect(() => {
        (async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if (profile.openSettingsShortcut) openSystemFocusSettings();
            await scheduleEndNotification(Math.ceil((profile.focusMin * 60 * 1000) / 1000));
        })();
    }, []);


    async function endSession() {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setSessionActive(false);
        setSessionEndsAt(null);
        router.back();
    }
}