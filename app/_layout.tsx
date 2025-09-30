import { Stack } from 'expo-router';
import React from 'react';


export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#0B0E13' },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: '#0B0E13' },
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="session" options={{ title: 'Session' }} />
      <Stack.Screen name="modal" options={{ title: 'Ny profil', presentation: 'modal' }} />
    </Stack>
  );
}
