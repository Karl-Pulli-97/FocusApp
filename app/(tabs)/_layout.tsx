import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#fff', tabBarStyle: { backgroundColor: '#0B0E13' }, headerStyle: { backgroundColor: '#0B0E13' }, headerTintColor: 'white' }}>
      <Tabs.Screen name="index" options={{ title: 'Hem' }} />
      <Tabs.Screen name="history" options={{ title: 'Historik' }} />
      <Tabs.Screen name="settings" options={{ title: 'Inställningar' }} />
    </Tabs>
  );
}
