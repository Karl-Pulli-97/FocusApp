import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#fff', tabBarStyle: { backgroundColor: '#0B0E13' }, headerStyle: { backgroundColor: '#0B0E13' }, headerTintColor: 'white' }}>
      <Tabs.Screen name="index" options={{ title: 'Hem' }} />
      <Tabs.Screen name="history" options={{ title: 'Historik' }} />
      <Tabs.Screen name="settings" options={{ title: 'Inställningar' }} />
    </Tabs>
  );
}
