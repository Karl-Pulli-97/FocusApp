import { Stack } from 'expo-router';
import React from 'react';

const appBackgroundColor = '#014a6eff'

export default function RootLayout() {
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
