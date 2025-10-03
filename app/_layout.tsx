import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { loadActiveSession } from '../lib/storage';

const appBackgroundColor = '#014a6eff'


export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(async () => {
      const active = await loadActiveSession();
      if (active && active.endsAt > Date.now()) {
        router.push({
          pathname: '/session',
          params: {
            profile: JSON.stringify(active.profile),
            phase: active.phase,
            endsAt: String(active.endsAt),
          },
        });
      }
    });
    return () => sub.remove();
  }, [router]);
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#04415fff' },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: appBackgroundColor },
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="session" options={{ title: 'Session' }} />
      <Stack.Screen name="modal" options={{ title: 'Ny profil', presentation: 'modal' }} />
    </Stack>
  );
}
